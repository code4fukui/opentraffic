import { DateTime, TimeZone } from "https://js.sabae.cc/DateTime.js";
import { loadData, saveData, existsData } from "./saveData.js";

const min5 = 5 * 60 * 1000;

const getPast = (min) => {
  const d = min * 60 * 1000;
  const t = Math.floor((new Date().getTime() - d) / min5) * min5;
  const dt = new DateTime(t);
  return dt;
};
const getLatest = () => {
  return getPast(25);
};

const start = new DateTime("202505120000");
//const end = new DateTime("202505220000");
const end = getLatest();
console.log(start);
const dt = min5;
let ndata = 0;
//for (let d = start; d.getTime() < end.getTime(); d = new DateTime(d.getTime() + dt)) {
for (let d = end; d.getTime() >= start.getTime(); d = new DateTime(d.getTime() - dt)) {
  const sdt = d.toLocal(TimeZone.JST).toStringMinLog();
  if (!await existsData(sdt)) {
    console.log(sdt, "skip");
    continue;
  }
  const data = await loadData(sdt);
  data.forEach(i => {
    if (i["上り・小型大型判別不能交通量"]) {
      i["上り・車種判別不能交通量"] = i["上り・小型大型判別不能交通量"];
    }
    delete i["上り・小型大型判別不能交通量"];
    if (i["下り・小型大型判別不能交通量"]) {
      i["下り・車種判別不能交通量"] = i["下り・小型大型判別不能交通量"];
    }
    delete i["下り・小型大型判別不能交通量"];

    delete i["上り・自動車交通量"];
    delete i["下り・自動車交通量"];
    delete i.FID;
    delete i.color;
  });
  ndata++;
  await saveData(sdt, data);
}
console.log(ndata);
