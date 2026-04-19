"""
snapshot_tracker.py — Append this week's TRACKER_ENRICHED into TRACKER_WEEKLY.

Run after model_tracker.py completes each week.

Idempotent: if a snapshot for the current Monday already exists in TRACKER_WEEKLY,
this script exits cleanly with no duplicate rows written.

SNAPSHOT_DATE is always set to the most recent Monday (ISO week start), so
re-running on Tuesday–Sunday of the same week produces the same snapshot date
as a Monday run. This means the weekly snapshot represents the state of the
tracker as of that week, regardless of which day the pipeline runs.

WEEKS_SINCE_PUBLISH is computed as the number of complete weeks between
PUBLICATION_DATE and SNAPSHOT_DATE — useful for cohort curves and aging analysis.

Usage:
    python3 scripts/snapshot_tracker.py

Env vars (optional):
    SNOWFLAKE_PRIVATE_KEY_PATH   path to RSA private key (.p8 file)
"""

import os
from datetime import date, timedelta
from pathlib import Path

from cryptography.hazmat.primitives.serialization import (
    load_pem_private_key, Encoding, PrivateFormat, NoEncryption,
)
import snowflake.connector


SF_ACCOUNT  = "wvb49304-mcclatchy_eval"
SF_USER     = "GROWTH_AND_STRATEGY_SERVICE_USER"
SF_KEY_PATH = os.getenv("SNOWFLAKE_PRIVATE_KEY_PATH",
                        str(Path.home() / ".credentials" / "growth_strategy_service_rsa_key.p8"))

SRC = "MCC_PRESENTATION.CONTENT_SCALING_AGENT.TRACKER_ENRICHED"
DST = "MCC_PRESENTATION.CONTENT_SCALING_AGENT.TRACKER_WEEKLY"


def this_monday() -> date:
    today = date.today()
    return today - timedelta(days=today.weekday())  # weekday(): Mon=0, Sun=6


def sf_connect():
    with open(SF_KEY_PATH, "rb") as f:
        key = load_pem_private_key(f.read(), password=None)
    pkb = key.private_bytes(Encoding.DER, PrivateFormat.PKCS8, NoEncryption())
    return snowflake.connector.connect(
        account=SF_ACCOUNT,
        user=SF_USER,
        private_key=pkb,
        database="MCC_PRESENTATION",
        schema="CONTENT_SCALING_AGENT",
    )


def main():
    snap_date = this_monday()
    print(f"Snapshot date: {snap_date} (this Monday)")

    print("Connecting to Snowflake...")
    conn = sf_connect()
    cur = conn.cursor()

    # Check for existing snapshot and delete it — always write fresh so re-running
    # after a model change gets the corrected data. DELETE is safe here because
    # TRACKER_ENRICHED is the source of truth; a failed INSERT can be re-run.
    cur.execute(f"""
        SELECT COUNT(*) FROM {DST}
        WHERE SNAPSHOT_DATE = '{snap_date}'::DATE
    """)
    existing = cur.fetchone()[0]
    if existing > 0:
        print(f"  Existing snapshot for {snap_date} has {existing:,} rows — deleting to refresh.")
        cur.execute(f"DELETE FROM {DST} WHERE SNAPSHOT_DATE = '{snap_date}'::DATE")

    # Count source rows first
    cur.execute(f"SELECT COUNT(*) FROM {SRC}")
    src_count = cur.fetchone()[0]
    print(f"  Source rows in TRACKER_ENRICHED: {src_count:,}")

    print(f"  Writing snapshot for {snap_date}...")
    cur.execute(f"""
        INSERT INTO {DST} (
            SNAPSHOT_DATE,
            WEEKS_SINCE_PUBLISH,
            ASSET_ID, BRAND_TYPE, CONTENT_TYPE, PARENT_ID, CLUSTER_ID,
            DRAFT_URL, PUBLISHED_URL, AUTHOR, SYNDICATION_PLATFORM, HEADLINE,
            WEEK_NUM, WEEK_OF, CREATION_DATE_MONTH, PUB_DATE_MONTH,
            CREATED_DATE, PUBLICATION_DATE, VERTICAL, WORD_COUNT,
            PRIMARY_KEYWORDS, META_DESCRIPTION, TARGET_AUDIENCE,
            DRAFT_DOC, PEER_REVIEWER, UPDATE_FLAG, TEST_CATEGORY,
            REUTERS_PHOTO, REUTERS_LINK, _ROW_NUM, _LOADED_AT,
            STORY_ID, TOTAL_PVS, SEARCH_PVS, SOCIAL_PVS, DIRECT_PVS,
            APPLENEWS_PVS, SMARTNEWS_PVS, NEWSBREAK_PVS, SUBSCRIBER_PVS,
            AMP_PVS, NEWSLETTER_PVS, YAHOO_PVS, PUB_MEDIAN_PVS,
            CLUSTER_ARTICLE_COUNT, CLUSTER_HITS, CLUSTER_TOTAL_PVS, CLUSTER_SUM_OF_MEDIANS,
            CLUSTER_AVG_SIM_DESC, CLUSTER_MIN_SIM_DESC, CLUSTER_MAX_SIM_DESC,
            CLUSTER_AVG_SIM_FIRST400W, CLUSTER_MIN_SIM_FIRST400W, CLUSTER_MAX_SIM_FIRST400W,
            CLUSTER_PAIR_COUNT,
            PRIMARY_IAB_TOPIC, ARTICLE_ACCESS_TYPE,
            ARTICLE_VS_CO_MEDIAN, IS_HIT, CLUSTER_VS_CO_MEDIAN, CLUSTER_HIT_RATE,
            AUTHOR_ARTICLE_COUNT, AUTHOR_CLUSTER_DIVERSITY, AUTHOR_HIT_COUNT, AUTHOR_HIT_RATE,
            AUTHOR_AVG_PVS, AUTHOR_PV_STDDEV, AUTHOR_AVG_WEEKLY_OUTPUT,
            AUTHOR_AVG_SIM_DESC, AUTHOR_AVG_SIM_FIRST400W,
            _MODELED_AT
        )
        SELECT
            '{snap_date}'::DATE                                        AS SNAPSHOT_DATE,
            DATEDIFF('week', PUBLICATION_DATE, '{snap_date}'::DATE)    AS WEEKS_SINCE_PUBLISH,
            ASSET_ID, BRAND_TYPE, CONTENT_TYPE, PARENT_ID, CLUSTER_ID,
            DRAFT_URL, PUBLISHED_URL, AUTHOR, SYNDICATION_PLATFORM, HEADLINE,
            WEEK_NUM, WEEK_OF, CREATION_DATE_MONTH, PUB_DATE_MONTH,
            CREATED_DATE, PUBLICATION_DATE, VERTICAL, WORD_COUNT,
            PRIMARY_KEYWORDS, META_DESCRIPTION, TARGET_AUDIENCE,
            DRAFT_DOC, PEER_REVIEWER, UPDATE_FLAG, TEST_CATEGORY,
            REUTERS_PHOTO, REUTERS_LINK, _ROW_NUM, _LOADED_AT,
            STORY_ID, TOTAL_PVS, SEARCH_PVS, SOCIAL_PVS, DIRECT_PVS,
            APPLENEWS_PVS, SMARTNEWS_PVS, NEWSBREAK_PVS, SUBSCRIBER_PVS,
            AMP_PVS, NEWSLETTER_PVS, YAHOO_PVS, PUB_MEDIAN_PVS,
            CLUSTER_ARTICLE_COUNT, CLUSTER_HITS, CLUSTER_TOTAL_PVS, CLUSTER_SUM_OF_MEDIANS,
            CLUSTER_AVG_SIM_DESC, CLUSTER_MIN_SIM_DESC, CLUSTER_MAX_SIM_DESC,
            CLUSTER_AVG_SIM_FIRST400W, CLUSTER_MIN_SIM_FIRST400W, CLUSTER_MAX_SIM_FIRST400W,
            CLUSTER_PAIR_COUNT,
            PRIMARY_IAB_TOPIC, ARTICLE_ACCESS_TYPE,
            ARTICLE_VS_CO_MEDIAN, IS_HIT, CLUSTER_VS_CO_MEDIAN, CLUSTER_HIT_RATE,
            AUTHOR_ARTICLE_COUNT, AUTHOR_CLUSTER_DIVERSITY, AUTHOR_HIT_COUNT, AUTHOR_HIT_RATE,
            AUTHOR_AVG_PVS, AUTHOR_PV_STDDEV, AUTHOR_AVG_WEEKLY_OUTPUT,
            AUTHOR_AVG_SIM_DESC, AUTHOR_AVG_SIM_FIRST400W,
            _MODELED_AT
        FROM {SRC}
    """)

    cur.execute(f"""
        SELECT COUNT(*) FROM {DST}
        WHERE SNAPSHOT_DATE = '{snap_date}'::DATE
    """)
    written = cur.fetchone()[0]
    print(f"  Written: {written:,} rows for snapshot {snap_date}.")

    cur.execute(f"SELECT COUNT(DISTINCT SNAPSHOT_DATE), COUNT(*) FROM {DST}")
    r = cur.fetchone()
    print(f"  Total in TRACKER_WEEKLY: {r[1]:,} rows across {r[0]} snapshots.")

    cur.close()
    conn.close()
    print("Snapshot complete.")


if __name__ == "__main__":
    main()
