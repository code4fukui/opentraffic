> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

An excellent project! This refined README aims to make it more accessible and understandable for other developers by adding structure, clarifying the API usage, and explaining how the project works.

Here is the refined version:

---

# OpenTraffic

[
![Scheduled fetch](https://github.com/code4fukui/opentraffic/actions/workflows/scheduled-fetch.yml/badge.svg)
](https://github.com/code4fukui/opentraffic/actions/workflows/scheduled-fetch.yml)

A data archive and toolset for Japan's open traffic data, automatically updated daily.

**[➡️ View the Live Demo](https://code4fukui.github.io/opentraffic/)**

This project fetches, archives, and processes real-time traffic volume data provided by the [Japan Road Traffic Information Center (JARTIC)](https://www.jartic-open-traffic.org/).

## Features

- **Daily Data Archival**: Automatically fetches and saves 5-minute interval traffic data every day.
- **Processed Summaries**: Generates daily summary CSV files for easier analysis.
- **Live Demo**: An interactive map and data viewer to explore the collected traffic data.
- **Open Data**: All archived raw and processed data is available in this repository.

## Data Structure

The data is organized into two main directories:

-   `data/`: Contains the raw, unprocessed data fetched directly from the API. It is structured by date and time:
    -   `data/YYYYMMDD/YYYYMMDDhhmm.csv`
-   `data_processed/`: Contains daily aggregated summaries generated from the raw data.
    -   `data_processed/YYYYMMDD.csv`

## Data Source API

This project utilizes the official JARTIC GeoServer API. The data is available in multiple formats, including JSON and CSV.

The base URL for the API is: `https://api.jartic-open-traffic.org/geoserver`

You can filter data using the `cql_filter` parameter, for example, by `時間コード` (time code) and `道路種別` (road type).

### API Endpoints

There are four main data types, specified using the `typeNames` parameter:

1.  **Permanent Traffic Counters (5-minute data)**
    -   `typeNames=t_travospublic_measure_5m`
    -   Data is updated approximately 20 minutes after observation.

2.  **Permanent Traffic Counters (1-hour data)**
    -   `typeNames=t_travospublic_measure_1h`

3.  **CCTV-based Traffic Counters (5-minute data)**
    -   `typeNames=t_travospublic_measure_5m_img`

4.  **CCTV-based Traffic Counters (1-hour data)**
    -   `typeNames=t_travospublic_measure_1h_img`

### Example API Call

Here is an example of fetching 5-minute data from permanent traffic counters for national highways (`道路種別=3`) at a specific time.

**Get as CSV:**
```
https://api.jartic-open-traffic.org/geoserver?service=WFS&version=2.0.0&request=GetFeature&typeNames=t_travospublic_measure_5m&srsName=EPSG:4326&outputFormat=text/csv&exceptions=application/json&cql_filter=道路種別=3 AND 時間コード=202505201245
```

**Get as JSON:**
```
https://api.jartic-open-traffic.org/geoserver?service=WFS&version=2.0.0&request=GetFeature&typeNames=t_travospublic_measure_5m&srsName=EPSG:4326&outputFormat=application/json&exceptions=application/json&cql_filter=道路種別=3 AND 時間コード=202505201245
```

### Data Columns

The CSV files contain the following columns. Note that columns may vary slightly between permanent and CCTV-based counters.

| Column Name (Japanese)                | Description                                       |
| ------------------------------------- | ------------------------------------------------- |
| `FID`                                 | Feature ID                                        |
| `地方整備局等番号`                    | Regional Development Bureau Number                |
| `開発建設部／都道府県コード`          | Development/Prefecture Code                       |
| `常時観測点コード`                    | Permanent Observation Point Code                  |
| `収集時間フラグ`                      | Collection Interval Flag (5-min/1-hour)           |
| `観測年月日`                          | Observation Date (YYYYMMDD)                       |
| `時間帯`                              | Time Period (hhmm)                                |
| `上り・小型交通量`                    | Inbound - Small Vehicle Traffic Volume            |
| `上り・大型交通量`                    | Inbound - Large Vehicle Traffic Volume            |
| `上り・車種判別不能交通量`            | Inbound - Unidentified Vehicle Traffic Volume     |
| `上り・停電`                          | Inbound - Power Outage Flag                       |
| `上り・ループ異常`                    | Inbound - Loop Detector Anomaly Flag              |
| `上り・超音波異常`                    | Inbound - Ultrasonic Sensor Anomaly Flag          |
| `上り・欠測`                          | Inbound - Missing Data Flag                       |
| `下り・小型交通量`                    | Outbound - Small Vehicle Traffic Volume           |
| `下り・大型交通量`                    | Outbound - Large Vehicle Traffic Volume           |
| `下り・車種判別不能交通量`            | Outbound - Unidentified Vehicle Traffic Volume    |
| `下り・停電`                          | Outbound - Power Outage Flag                      |
| `下り・ループ異常`                    | Outbound - Loop Detector Anomaly Flag             |
| `下り・超音波異常`                    | Outbound - Ultrasonic Sensor Anomaly Flag         |
| `下り・欠測`                          | Outbound - Missing Data Flag                      |
| `道路種別`                            | Road Type Code                                    |
| `時間コード`                          | Time Code (YYYYMMDDhhmm)                          |
| `lat`, `lng`, `lat2`, `lng2`          | Latitude and Longitude coordinates                |
| *(CCTV-specific columns)*             | Various flags for camera/image analysis status    |

## Data Dictionary

-   **時間コード (Time Code)**
    -   Format: `YYYYMMDDhhmm`.
    -   The `mm` (minutes) value is rounded down to the nearest 5-minute interval.

-   **上り・下り (Inbound/Outbound)**
    -   `上り` (Inbound): Traffic moving from the route's end point to its start point.
    -   `下り` (Outbound): Traffic moving from the route's start point to its end point.

-   **交通量 (Traffic Volume)**
    -   Unit: Vehicles per 5 minutes.
    -   An empty value indicates missing data.

-   **道路種別 (Road Type)**
    | Code | Type                  |
    | :--- | :-------------------- |
    | `1`  | National Expressway   |
    | `3`  | National Highway      |

-   **地方整備局番号 (Regional Development Bureau Number)**
    | Code | Region    |
    | :--- | :-------- |
    | `81` | Hokkaido  |
    | `82` | Tohoku    |
    | `83` | Kanto     |
    | `84` | Hokuriku  |
    | `85` | Chubu     |
    | `86` | Kinki     |
    | `87` | Chugoku   |
    | `88` | Shikoku   |
    | `89` | Kyushu    |
    | `90` | Okinawa   |

-   **開発建設部／都道府県コード (Development/Prefecture Code)**
    -   Used for Hokkaido and Chubu regions. Blank for others.
    -   **Hokkaido**: `01`: Sapporo, `02`: Hakodate, `03`: Otaru, etc.
    -   **Chubu**: `21`: Gifu, `22`: Shizuoka, `23`: Aichi, `24`: Mie.

## Automation

This repository uses a [GitHub Action](./.github/workflows/scheduled-fetch.yml) that runs daily. The workflow executes Deno scripts to:
1.  Fetch any missing 5-minute interval data from the last 24 hours (`savePast.js`).
2.