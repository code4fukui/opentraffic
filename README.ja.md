# OpenTraffic

[
![Scheduled fetch](https://github.com/code4fukui/opentraffic/actions/workflows/scheduled-fetch.yml/badge.svg)
](https://github.com/code4fukui/opentraffic/actions/workflows/scheduled-fetch.yml)

日本のオープン交通データ用アーカイブおよびツールセットです。毎日自動的に更新されます。

**[➡️ ライブデモを見る](https://code4fukui.github.io/opentraffic/)**

このプロジェクトは、[日本道路交通情報センター（JARTIC）](https://www.jartic-open-traffic.org/)が提供するリアルタイムの交通量データを取得、アーカイブ、および処理します。

## 特徴

- **毎日のデータアーカイブ**: 5分間隔の交通量データを毎日自動的に取得して保存します。
- **処理済みサマリー**: 分析を容易にするため、日次のサマリーCSVファイルを生成します。
- **ライブデモ**: 収集した交通量データを探索できるインタラクティブなマップとデータビューアです。
- **オープンデータ**: アーカイブされたすべての生データおよび処理済みデータは、本リポジトリで利用可能です。

## データ構造

データは主に2つのディレクトリに整理されています：

-   `data/`: APIから直接取得した未加工の生データが含まれます。日付と時間ごとに構成されています：
    -   `data/YYYYMMDD/YYYYMMDDhhmm.csv`
-   `data_processed/`: 生データから生成された日次の集計サマリーが含まれます。
    -   `data_processed/YYYYMMDD.csv`

## データソースAPI

本プロジェクトでは、公式のJARTIC GeoServer APIを利用しています。データはJSONやCSVなど、複数の形式で取得可能です。

APIのベースURLは以下の通りです：`https://api.jartic-open-traffic.org/geoserver`

`cql_filter`パラメータを使用することで、例えば `時間コード` や `道路種別` などでデータをフィルタリングできます。

### APIエンドポイント

`typeNames`パラメータで指定する、主に4つのデータタイプがあります：

1.  **常時観測点（5分間データ）**
    -   `typeNames=t_travospublic_measure_5m`
    -   データは観測から約20分後に更新されます。

2.  **常時観測点（1時間データ）**
    -   `typeNames=t_travospublic_measure_1h`

3.  **CCTV画像処理による観測点（5分間データ）**
    -   `typeNames=t_travospublic_measure_5m_img`

4.  **CCTV画像処理による観測点（1時間データ）**
    -   `typeNames=t_travospublic_measure_1h_img`

### API呼び出し例

以下は、特定の時間における国道（`道路種別=3`）の常時観測点から5分間データを取得する例です。

**CSVとして取得:**
```
https://api.jartic-open-traffic.org/geoserver?service=WFS&version=2.0.0&request=GetFeature&typeNames=t_travospublic_measure_5m&srsName=EPSG:4326&outputFormat=text/csv&exceptions=application/json&cql_filter=道路種別=3 AND 時間コード=202505201245
```

**JSONとして取得:**
```
https://api.jartic-open-traffic.org/geoserver?service=WFS&version=2.0.0&request=GetFeature&typeNames=t_travospublic_measure_5m&srsName=EPSG:4326&outputFormat=application/json&exceptions=application/json&cql_filter=道路種別=3 AND 時間コード=202505201245
```

### データ列

CSVファイルには以下の列が含まれます。常時観測点とCCTV画像処理による観測点とで、列が若干異なる場合があることに注意してください。

| 列名（日本語）                        | 説明                                              |
| ------------------------------------- | ------------------------------------------------- |
| `FID`                                 | フィーチャID                                      |
| `地方整備局等番号`                    | 地方整備局等番号                                  |
| `開発建設部／都道府県コード`          | 開発建設部／都道府県コード                        |
| `常時観測点コード`                    | 常時観測点コード                                  |
| `収集時間フラグ`                      | 収集時間フラグ（5分間／1時間）                    |
| `観測年月日`                          | 観測年月日（YYYYMMDD）                            |
| `時間帯`                              | 時間帯（hhmm）                                    |
| `上り・小型交通量`                    | 上り - 小型車交通量                               |
| `上り・大型交通量`                    | 上り - 大型車交通量                               |
| `上り・車種判別不能交通量`            | 上り - 車種判別不能交通量                         |
| `上り・停電`                          | 上り - 停電フラグ                                 |
| `上り・ループ異常`                    | 上り - ループ異常フラグ                           |
| `上り・超音波異常`                    | 上り - 超音波異常フラグ                           |
| `上り・欠測`                          | 上り - 欠測フラグ                                 |
| `下り・小型交通量`                    | 下り - 小型車交通量                               |
| `下り・大型交通量`                    | 下り - 大型車交通量                               |
| `下り・車種判別不能交通量`            | 下り - 車種判別不能交通量                         |
| `下り・停電`                          | 下り - 停電フラグ                                 |
| `下り・ループ異常`                    | 下り - ループ異常フラグ                           |
| `下り・超音波異常`                    | 下り - 超音波異常フラグ                           |
| `下り・欠測`                          | 下り - 欠測フラグ                                 |
| `道路種別`                            | 道路種別コード                                    |
| `時間コード`                          | 時間コード（YYYYMMDDhhmm）                        |
| `lat`, `lng`, `lat2`, `lng2`          | 緯度および経度座標                                |
| *(CCTV特有の列)*                      | カメラや画像解析ステータスに関する各種フラグ      |

## データ辞書

-   **時間コード (Time Code)**
    -   形式: `YYYYMMDDhhmm`
    -   `mm`（分）の値は、直近の5分間隔に切り捨てられます。

-   **上り・下り (Inbound/Outbound)**
    -   `上り` (Inbound): 路線の終点から始点に向かう交通。
    -   `下り` (Outbound): 路線の始点から終点に向かう交通。

-   **交通量 (Traffic Volume)**
    -   単位: 5分間あたりの車両台数。
    -   空の値はデータが欠測していることを示します。

-   **道路種別 (Road Type)**
    | コード | 種別                  |
    | :--- | :-------------------- |
    | `1`  | 高速自動車国道        |
    | `3`  | 一般国道              |

-   **地方整備局等番号 (Regional Development Bureau Number)**
    | コード | 地域      |
    | :--- | :-------- |
    | `81` | 北海道    |
    | `82` | 東北      |
    | `83` | 関東      |
    | `84` | 北陸      |
    | `85` | 中部      |
    | `86` | 近畿      |
    | `87` | 中国      |
    | `88` | 四国      |
    | `89` | 九州      |
    | `90` | 沖縄      |

-   **開発建設部／都道府県コード (Development/Prefecture Code)**
    -   北海道および中部地方で使用されます。その他の地域は空白です。
    -   **北海道**: `01`: 札幌、`02`: 函館、`03`: 小樽など。
    -   **中部**: `21`: 岐阜、`22`: 静岡、`23`: 愛知、`24`: 三重。

## 自動化

本リポジトリでは、毎日実行される[GitHub Action](./.github/workflows/scheduled-fetch.yml)を使用しています。このワークフローはDenoスクリプトを実行し、以下の処理を行います：
1.  過去24時間の欠落している5分間隔データを取得します（`savePast.js`）。
2.
