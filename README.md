# opentraffic

https://code4fukui.github.io/opentraffic/

- [交通量データの提供（オープンデータ）](https://www.jartic-open-traffic.org/)

## test

### API1 常設トラカン̲５分間交通量 geoserver

常設トラカン 5 分間交通量 観測後概ね 20 分後

JSON
```
https://api.jartic-open-traffic.org/geoserver?service=WFS&version=2.0.0&request=GetFeature&typeNames=t_travospublic_measure_5m&srsName=EPSG:4326&outputFormat=application/json&exceptions=application/json&cql_filter=道路種別=3
 AND 時間コード=202505201245
```
id,lat,lng,地方整備局等番号,開発建設部／都道府県コード,常時観測点コード,収集時間フラグ（5分間／1時間）,観測年月日,時間帯,上り・小型交通量,上り・大型交通量,上り・車種判別不能交通量,上り・停電,上り・ループ異常,上り・超音波異常,上り・欠測,下り・小型交通量,下り・大型交通量,下り・車種判別不能交通量,下り・停電,下り・ループ異常,下り・超音波異常,下り・欠測,道路種別,時間コード

CSV
```
https://api.jartic-open-traffic.org/geoserver?service=WFS&version=2.0.0&request=GetFeature&typeNames=t_travospublic_measure_5m&srsName=EPSG:4326&outputFormat=text/csv&exceptions=application/json&cql_filter=道路種別=3
 AND 時間コード=202505201245
```
FID,地方整備局等番号,開発建設部／都道府県コード,常時観測点コード,収集時間フラグ（5分間／1時間）,観測年月日,時間帯,上り・小型交通量,上り・大型交通量,上り・車種判別不能交通量,上り・停電,上り・ループ異常,上り・超音波異常,上り・欠測,下り・小型交通量,下り・大型交通量,下り・車種判別不能交通量,下り・停電,下り・ループ異常,下り・超音波異常,下り・欠測,道路種別,時間コード,lat,lng,lng2,lat2

### API2 常設トラカン 1 時間交通量 観測後概ね 20 分後

常設トラカン̲１時間交通量

typeNames: t_travospublic_measure_1h

### API3 CCTV トラカン 5 分間交通量 観測後概ね 20 分後

FID,地方整備局等番号,開発建設部／都道府県コード,常時観測点コード,収集時間フラグ（5分間／1時間）,観測年月日,時間帯,上り・自動車交通量（集計値）,上り・小型交通量（集計値）,上り・大型交通量（集計値）,上り・小型大型判別不能交通量（集計値）,下り・自動車交通量（集計値）,下り・小型交通量（集計値）,下り・大型交通量（集計値）,下り・小型大型判別不能交通量（集計値）,カメラプリセット位置,気象影響による映像不良,照度不足,突発事象（交通事故等）,サーバの稼働,カメラの映像受信,映像のデコード処理,デコード映像から映像解析機能への取込加工処理の失敗,映像解析機能のフリーズ,その他エラー,道路種別,時間コード,lat,lng,lng2,lat2

t_travospublic_measure_5m_img

### API4 CCTV トラカン 1 時間交通量 観測後概ね 20 分後

typeNames: t_travospublic_measure_1h_img


## reference

- 道路種別 1:高速自動車国道 3:一般国道
- 時間コード YYYYMMDDhhmm (mm は 5 の倍数に補正（端数切り捨て）)
- 地方整備局番号 81:北海道、82:東北、83:関東、84:北陸 85:中部、86:近畿、87:中国、88:四国 89:九州、90:沖縄
- 開発建設部／都道府県コード 北海道、中部以外は空欄 01:札幌、02:函館、03:小樽、04:旭川 05:室蘭、06:釧路、07:帯広、08:網走 09:留萌、10:稚内 21:岐阜県、22:静岡県、23:愛知県 24:三重県
- 収集時間フラグ 1:5分間、2:1時間 (すべて5分？)
- 交通量 単位:台／5分 欠測の場合は”空欄"
- データは観測後、概ね20分後に提供されます
- 上り・下り 「上り」は路線の終点から起点に向かう方向、「下り」は路線の終点から起点に向かう方向と定義しています。
