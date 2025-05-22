import { CSV } from "https://js.sabae.cc/CSV.js";
import { parseGeometry } from "./parseGeometry.js";
import { DateTime } from "https://js.sabae.cc/DateTime.js";

const types = {
  NORMAL: "t_travospublic_measure_5m",
  CCTV: "t_travospublic_measure_5m_img",
};

export const fetchDataNormal = async (dt) => {
  return await fetchData(types.NORMAL, dt);
};

export const fetchDataCCTV = async (dt) => {
  return await fetchData(types.CCTV, dt);
};

export const fetchDataAll = async (dt) => {
  const data1 = await fetchDataNormal(dt);
  const data2 = await fetchDataCCTV(dt);
  data2.forEach(i => i.color = "blue");
  const data = [...data1, ...data2];
  return data;
};

const fetchData = async (type, dt) => { // dt: DateTime or YYMMDDhhmm
  if (dt == null) {
    dt = new DateTime();
  }
  if (dt instanceof DateTime) {
    dt = dt.toStringMinLog();
  }
  //const url = `https://api.jartic-open-traffic.org/geoserver?service=WFS&version=2.0.0&request=GetFeature&typeNames=t_travospublic_measure_5m&srsName=EPSG:4326&outputFormat=text/csv&exceptions=application/json&cql_filter=道路種別=3 AND 時間コード=202505201245`;
  const url = `https://api.jartic-open-traffic.org/geoserver?service=WFS&version=2.0.0&request=GetFeature&typeNames=${type}&srsName=EPSG:4326&outputFormat=text/csv&exceptions=application/json&cql_filter=時間コード=${dt}`;
  //const csv = await (await fetch(url)).text();
  const txt = await (await fetch(url)).json();
  const csv = CSV.decode(txt);
  // delete （集計値）
  for (let i = 0; i < csv[0].length; i++) {
    csv[0][i] = csv[0][i].replace("（集計値）", "");
  }
  const data = CSV.toJSON(csv);
  console.log(data);
  data.forEach(i => {
    const ll = parseGeometry(i.ジオメトリ);
    delete i.ジオメトリ;
    if (ll.length > 2) throw new Error("not supported geometry: " + i.ジオメトリ);
    i.lat = ll[0][1];
    i.lng = ll[0][0];
    if (ll.length > 1) {
      i.lat2 = ll[1][1];
      i.lng2 = ll[1][0];
    } else {
      i.lat2 = i.lng2 = "";
    }
  });
  return data;
};
