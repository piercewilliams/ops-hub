"""
create_tracker_weekly.py — One-time DDL: create TRACKER_WEEKLY in
MCC_PRESENTATION.CONTENT_SCALING_AGENT.

TRACKER_WEEKLY is an append-only history table. Each row = one article's
enriched state at the time of a weekly snapshot run. Snapshots are idempotent:
running snapshot_tracker.py twice on the same Monday is safe (no duplicate rows).

Schema: SNAPSHOT_DATE DATE + all TRACKER_ENRICHED columns + WEEKS_SINCE_PUBLISH.

Primary key (logical): (ASSET_ID, SNAPSHOT_DATE)

Run once. snapshot_tracker.py handles all subsequent appends.
"""

import os
from pathlib import Path
from cryptography.hazmat.primitives.serialization import (
    load_pem_private_key, Encoding, PrivateFormat, NoEncryption,
)
import snowflake.connector

SF_ACCOUNT  = "wvb49304-mcclatchy_eval"
SF_USER     = "GROWTH_AND_STRATEGY_SERVICE_USER"
SF_KEY_PATH = os.getenv("SNOWFLAKE_PRIVATE_KEY_PATH",
                        str(Path.home() / ".credentials" / "growth_strategy_service_rsa_key.p8"))

CREATE_DDL = """
CREATE TABLE IF NOT EXISTS MCC_PRESENTATION.CONTENT_SCALING_AGENT.TRACKER_WEEKLY (
    -- Snapshot anchor
    SNAPSHOT_DATE           DATE        NOT NULL,
    WEEKS_SINCE_PUBLISH     INTEGER,

    -- Editorial metadata (from Sara's tracker sheet)
    ASSET_ID                VARCHAR,
    BRAND_TYPE              VARCHAR,
    CONTENT_TYPE            VARCHAR,
    PARENT_ID               VARCHAR,
    CLUSTER_ID              VARCHAR,
    DRAFT_URL               VARCHAR,
    PUBLISHED_URL           VARCHAR,
    AUTHOR                  VARCHAR,
    SYNDICATION_PLATFORM    VARCHAR,
    HEADLINE                VARCHAR,
    WEEK_NUM                NUMBER,
    WEEK_OF                 DATE,
    CREATION_DATE_MONTH     VARCHAR,
    PUB_DATE_MONTH          VARCHAR,
    CREATED_DATE            DATE,
    PUBLICATION_DATE        DATE,
    VERTICAL                VARCHAR,
    WORD_COUNT              NUMBER,
    PRIMARY_KEYWORDS        VARCHAR,
    META_DESCRIPTION        VARCHAR,
    TARGET_AUDIENCE         VARCHAR,
    DRAFT_DOC               VARCHAR,
    PEER_REVIEWER           VARCHAR,
    UPDATE_FLAG             VARCHAR,
    TEST_CATEGORY           VARCHAR,
    REUTERS_PHOTO           VARCHAR,
    REUTERS_LINK            VARCHAR,
    _ROW_NUM                NUMBER,
    _LOADED_AT              TIMESTAMP_NTZ,

    -- Traffic KPIs (all cumulative lifetime totals as of snapshot date)
    STORY_ID                VARCHAR,
    TOTAL_PVS               INTEGER,
    SEARCH_PVS              INTEGER,
    SOCIAL_PVS              INTEGER,
    DIRECT_PVS              INTEGER,
    APPLENEWS_PVS           INTEGER,
    SMARTNEWS_PVS           INTEGER,
    NEWSBREAK_PVS           INTEGER,
    SUBSCRIBER_PVS          INTEGER,
    AMP_PVS                 INTEGER,
    NEWSLETTER_PVS          INTEGER,
    YAHOO_PVS               INTEGER,
    PUB_MEDIAN_PVS          FLOAT,

    -- Cluster aggregates
    CLUSTER_ARTICLE_COUNT   INTEGER,
    CLUSTER_HITS            INTEGER,
    CLUSTER_TOTAL_PVS       INTEGER,
    CLUSTER_SUM_OF_MEDIANS  FLOAT,

    -- Cluster semantic similarity
    CLUSTER_AVG_SIM_DESC        FLOAT,
    CLUSTER_MIN_SIM_DESC        FLOAT,
    CLUSTER_MAX_SIM_DESC        FLOAT,
    CLUSTER_AVG_SIM_FIRST400W   FLOAT,
    CLUSTER_MIN_SIM_FIRST400W   FLOAT,
    CLUSTER_MAX_SIM_FIRST400W   FLOAT,
    CLUSTER_PAIR_COUNT          INTEGER,

    -- Content classification
    PRIMARY_IAB_TOPIC       VARCHAR,
    ARTICLE_ACCESS_TYPE     VARCHAR,

    -- Performance vs benchmark
    ARTICLE_VS_CO_MEDIAN    FLOAT,
    IS_HIT                  INTEGER,
    CLUSTER_VS_CO_MEDIAN    FLOAT,
    CLUSTER_HIT_RATE        FLOAT,

    -- Author aggregates
    AUTHOR_ARTICLE_COUNT    INTEGER,
    AUTHOR_CLUSTER_DIVERSITY INTEGER,
    AUTHOR_HIT_COUNT        INTEGER,
    AUTHOR_HIT_RATE         FLOAT,
    AUTHOR_AVG_PVS          FLOAT,
    AUTHOR_PV_STDDEV        FLOAT,
    AUTHOR_AVG_WEEKLY_OUTPUT FLOAT,
    AUTHOR_AVG_SIM_DESC     FLOAT,
    AUTHOR_AVG_SIM_FIRST400W FLOAT,

    -- Pipeline metadata
    _MODELED_AT             TIMESTAMP_NTZ
)
"""


def sf_connect():
    with open(SF_KEY_PATH, "rb") as f:
        key = load_pem_private_key(f.read(), password=None)
    der = key.private_bytes(Encoding.DER, PrivateFormat.PKCS8, NoEncryption())
    return snowflake.connector.connect(
        account=SF_ACCOUNT,
        user=SF_USER,
        private_key=der,
        database="MCC_PRESENTATION",
        schema="CONTENT_SCALING_AGENT",
    )


def main():
    print("Connecting to Snowflake...")
    conn = sf_connect()
    cur = conn.cursor()

    print("Creating TRACKER_WEEKLY (IF NOT EXISTS)...")
    cur.execute(CREATE_DDL)
    print("  Done.")

    cur.execute("""
        SELECT COUNT(*) FROM MCC_PRESENTATION.CONTENT_SCALING_AGENT.TRACKER_WEEKLY
    """)
    count = cur.fetchone()[0]
    print(f"  Current row count: {count:,}")

    cur.execute("DESCRIBE TABLE MCC_PRESENTATION.CONTENT_SCALING_AGENT.TRACKER_WEEKLY")
    cols = cur.fetchall()
    print(f"  Columns: {len(cols)}")

    cur.close()
    conn.close()
    print("TRACKER_WEEKLY is ready.")


if __name__ == "__main__":
    main()
