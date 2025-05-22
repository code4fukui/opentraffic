import { CSV } from "https://js.sabae.cc/CSV.js";
import { fetchDataAll, fetchDataNormal, fetchDataCCTV } from "./fetchData.js";
import { DateTime } from "https://js.sabae.cc/DateTime.js";

// 20min
const d = 25 * 60 * 1000;
const min5 = 5 * 60 * 1000;
const t = Math.floor((new Date().getTime() - d) / min5) * min5;
const dt = new DateTime(t);
//const sdt = dt.toStringMinLog();
const sdt = "202505211200"; // ok
console.log(sdt);
//const data = await fetchDataCCTV(dt);
//const data = await fetchDataNormal(dt);
const data = await fetchDataAll(sdt);
const ymd = sdt.substring(0, 8);
await Deno.mkdir("data/" + ymd, { recursive: true });
await Deno.writeTextFile("data/" + ymd + "/" + sdt + ".csv", CSV.stringify(data));
