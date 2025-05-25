import { Day, DateTime, TimeZone } from "https://js.sabae.cc/DateTime.js";
import { loadData, existsData } from "./saveData.js";
import { CSV } from "https://js.sabae.cc/CSV.js";
import { existsFile } from "./existsFile.js";

const min1 = 60 * 1000;
const min5 = 5 * min1;
const hour1 = 60 * min1;
const day1 = 24 * hour1;

export const makeDataSummary = async (sdate) => {
  const start = new DateTime(sdate);
  const end = new DateTime(start.getTime() + day1);
  const dt = min5;

  const id = "常時観測点コード";

  const itemstay = [
    "地方整備局等番号", "開発建設部／都道府県コード", "常時観測点コード", "収集時間フラグ（5分間／1時間）", "観測年月日", "時間帯",
    "カメラプリセット位置",
    "道路種別", "時間コード", "lat", "lng", "lng2", "lat2",
    "count",
  ];
  const sensors = [];
  for (let d = start; d.getTime() < end.getTime(); d = new DateTime(d.getTime() + dt)) {
    const sdt = d.toLocal(TimeZone.JST).toStringMinLog();
    if (!await existsData(sdt)) {
      console.log(sdt, "skip");
      continue;
    }

    const data = await loadData(sdt);

    data.forEach(i => {
      const d = sensors.find(j => j[id] == i[id]);
      if (!d) {
        for (const name in i) {
          if (itemstay.indexOf(name) >= 0) continue;
          if (i[name] != "") {
            i[name] = parseInt(i[name]);
          }
        }
        i.count = 1;
        sensors.push(i);
      } else {
        d.count++;
        for (const name in i) {
          if (itemstay.indexOf(name) >= 0) continue;
          if (i[name] != "") {
            if (d[name] == "") {
              d[name] = parseInt(i[name]);
            } else {
              d[name] += parseInt(i[name]);
            }
          }
        }
      }
    });
  }

  const p = (n) => n === "" ? 0 : n;
  for (const i of sensors) {
    i.color = i["カメラプリセット位置"] !== "" ? "blue" : "red";
    i["上り・交通量"] = p(i["上り・小型交通量"]) + p(i["上り・大型交通量"]) + p(i["上り・車種判別不能交通量"]);
    i["下り・交通量"] = p(i["下り・小型交通量"]) + p(i["下り・大型交通量"]) + p(i["下り・車種判別不能交通量"]);
    i["交通量"] = i["上り・交通量"] + i["下り・交通量"];
    delete i["時間帯"];
    delete i["時間コード"];
  }
  await Deno.writeTextFile("data_processed/" + sdate + ".csv", CSV.stringify(sensors));
};

const today = new Day();
const startday = new Day("20250512");
for (let d = today.prevDay(); d.isAfter(startday) || d.equals(startday); d = d.prevDay()) {
  const sdate = d.toStringYMD();
  if (await existsFile("data_processed/" + sdate + ".csv")) continue;
  console.log(sdate);
  await makeDataSummary(sdate);
}
