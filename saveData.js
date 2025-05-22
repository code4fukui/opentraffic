import { CSV } from "https://js.sabae.cc/CSV.js";
import { fetchDataAll } from "./fetchData.js";

export const saveData = async (sdt) => {
  //const data = await fetchDataCCTV(dt);
  //const data = await fetchDataNormal(dt);
  const data = await fetchDataAll(sdt);
  if (data.length == 0) return false;
  const ymd = sdt.substring(0, 8);
  await Deno.mkdir("data/" + ymd, { recursive: true });
  await Deno.writeTextFile("data/" + ymd + "/" + sdt + ".csv", CSV.stringify(data));
  return true;
};

