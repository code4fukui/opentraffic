import { DateTime, TimeZone } from "https://js.sabae.cc/DateTime.js";
import { fetchAndSaveData, existsData } from "./saveData.js";
import { sleep } from "https://js.sabae.cc/sleep.js";

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

//const start = new DateTime("202505120000");
const start = getPast(24 * 60); // 1day
//const end = new DateTime("202505220000");
const end = getLatest();
console.log(start);
const dt = min5;
let ndata = 0;
//for (let d = start; d.getTime() < end.getTime(); d = new DateTime(d.getTime() + dt)) {
for (let d = end; d.getTime() >= start.getTime(); d = new DateTime(d.getTime() - dt)) {
  const sdt = d.toLocal(TimeZone.JST).toStringMinLog();
  if (await existsData(sdt)) {
    console.log(sdt, "skip");
    continue;
  }
  console.log(sdt);
  ndata++;
  await fetchAndSaveData(sdt);
  await sleep(150);
}
console.log(ndata);

/*
const d = 25 * 60 * 1000;
const t = Math.floor((new Date().getTime() - d) / min5) * min5;
const dt = new DateTime(t);
const sdtlatest = dt.toStringMinLog();

const sdtform = "202505120000"; // start
const sdt = Deno.args[0] ?? sdtlatest;
console.log(sdt);
//const data = await fetchDataCCTV(dt);
//const data = await fetchDataNormal(dt);
const data = await saveData(sdt);
*/
