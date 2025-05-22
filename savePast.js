import { DateTime } from "https://js.sabae.cc/DateTime.js";
import { saveData } from "./saveData.js";
import { sleep } from "https://js.sabae.cc/sleep.js";

// 20min
const start = new DateTime("202505120000");
const end = new DateTime("202505220000");
console.log(start);
const min5 = 5 * 60 * 1000;
const dt = min5;
let ndata = 0;
//for (let d = start; d.getTime() < end.getTime(); d = new DateTime(d.getTime() + dt)) {
for (let d = end; d.getTime() >= start.getTime(); d = new DateTime(d.getTime() - dt)) {
  const sdt = d.toStringMinLog();
  console.log(sdt);
  ndata++;
  await saveData(sdt);
  await sleep(300);
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
