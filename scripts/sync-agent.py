#!/usr/bin/env python3
"""
Ops Hub Sync Agent
Reads CONTEXT.md from all subsidiary repos, then calls the Gemini API to
update data/projects.js and data/csa-links.js in this repo.

Runs inside GitHub Actions — no external dependencies beyond Python stdlib.
Requires GEMINI_API_KEY environment variable.
"""

import json
import os
import sys
import urllib.request
import urllib.error

# ── Read source files ──────────────────────────────────────────────────────────

def read_file(path):
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as f:
            return f.read()
    return f'(file not found: {path})'

REPOS = ['csa-dashboard', 'csa-content-standards', 'data-t1headlines', 'data-cmstracker', 'gary-tools']

contexts = {repo: read_file(f'{repo}/CONTEXT.md') for repo in REPOS}
csa_links_source = read_file('csa-dashboard/data/links.js')
current_projects  = read_file('data/projects.js')
current_csa_links = read_file('data/csa-links.js')

# ── Build prompt ───────────────────────────────────────────────────────────────

context_sections = '\n\n'.join(
    f'### {repo}/CONTEXT.md\n{content}'
    for repo, content in contexts.items()
)

prompt = f"""You are the ops-hub sync agent. Your job is to update two files in the ops-hub project registry based on the current state of all subsidiary repos.

## Current data/projects.js
```
{current_projects}
```

## Current data/csa-links.js
```
{current_csa_links}
```

## Source for csa-links.js regeneration (csa-dashboard/data/links.js)
```
{csa_links_source}
```

## Subsidiary repo CONTEXT.md files (source of truth for project status)

{context_sections}

## Instructions

1. **Update data/projects.js** — for each project, update `status`, `blockers`, and `nextActions` fields if the corresponding CONTEXT.md explicitly mentions a change. Be conservative: only update what is clearly stated. Do not infer, extrapolate, or change project structure, IDs, tier assignments, names, descriptions, or systems. Do not add or remove projects. Do not reformat the file.

2. **Update data/csa-links.js** — re-derive it from `csa-dashboard/data/links.js` if it has changed. If `csa-dashboard/data/links.js` is not found or empty, return `current_csa_links` unchanged.

## Response format

Return ONLY the two file contents between these exact markers — nothing else before, between, or after:

===BEGIN data/projects.js===
[complete file content]
===END data/projects.js===

===BEGIN data/csa-links.js===
[complete file content]
===END data/csa-links.js===
"""

# ── Call Gemini API ────────────────────────────────────────────────────────────

api_key = os.environ.get('GEMINI_API_KEY')
if not api_key:
    print('ERROR: GEMINI_API_KEY not set', file=sys.stderr)
    sys.exit(1)

payload = {
    'contents': [{'parts': [{'text': prompt}]}],
    'generationConfig': {'maxOutputTokens': 16000},
}

url = f'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={api_key}'

req = urllib.request.Request(
    url,
    data=json.dumps(payload).encode('utf-8'),
    headers={'content-type': 'application/json'},
)

try:
    with urllib.request.urlopen(req, timeout=120) as response:
        result = json.loads(response.read().decode('utf-8'))
except urllib.error.HTTPError as e:
    body = e.read().decode('utf-8')
    print(f'ERROR: Gemini API returned {e.code}: {body}', file=sys.stderr)
    sys.exit(1)
except Exception as e:
    print(f'ERROR: {e}', file=sys.stderr)
    sys.exit(1)

content = result['candidates'][0]['content']['parts'][0]['text']

# ── Parse response ─────────────────────────────────────────────────────────────

def extract_between(text, begin_marker, end_marker):
    start = text.find(begin_marker)
    end   = text.find(end_marker)
    if start == -1 or end == -1:
        return None
    return text[start + len(begin_marker):end].strip()

new_projects  = extract_between(content, '===BEGIN data/projects.js===',  '===END data/projects.js===')
new_csa_links = extract_between(content, '===BEGIN data/csa-links.js===', '===END data/csa-links.js===')

if new_projects is None:
    print('ERROR: Could not parse data/projects.js from response', file=sys.stderr)
    print('Response was:', content[:500], file=sys.stderr)
    sys.exit(1)

if new_csa_links is None:
    print('WARNING: Could not parse data/csa-links.js — leaving unchanged', file=sys.stderr)
    new_csa_links = current_csa_links

# ── Write output files ─────────────────────────────────────────────────────────

with open('data/projects.js', 'w', encoding='utf-8') as f:
    f.write(new_projects + '\n')

with open('data/csa-links.js', 'w', encoding='utf-8') as f:
    f.write(new_csa_links + '\n')

print('Sync complete.')
