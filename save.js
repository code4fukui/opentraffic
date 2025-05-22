import { DateTime } from "https://js.sabae.cc/DateTime.js";
import { saveData } from "./saveData.js";

// 20min
const d = 25 * 60 * 1000;
const min5 = 5 * 60 * 1000;
const t = Math.floor((new Date().getTime() - d) / min5) * min5;
const dt = new DateTime(t);
const sdtlatest = dt.toStringMinLog();

const sdtform = "202505120000"; // start
const sdt = Deno.args[0] ?? sdtlatest;
console.log(sdt);
//const data = await fetchDataCCTV(dt);
//const data = await fetchDataNormal(dt);
const data = await saveData(sdt);
