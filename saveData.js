import { CSV } from "https://js.sabae.cc/CSV.js";
import { fetchDataAll } from "./fetchData.js";
import { existsFile } from "./existsFile.js";

export const getFilename = (sdt) => {
  const ymd = sdt.substring(0, 8);
  return "data/" + ymd + "/" + sdt + ".csv";
};

export const existsData = async (sdt) => {
  const fn = getFilename(sdt);
  return await existsFile(fn);
};

export const loadData = async (sdt) => {
  const fn = getFilename(sdt);
  return await CSV.fetchJSON(fn);
};

export const saveData = async (sdt, data) => {
  const fn = getFilename(sdt);
  await Deno.mkdir(fn.substring(0, fn.lastIndexOf("/")), { recursive: true });
  await Deno.writeTextFile(fn, CSV.stringify(data));
  return true;
};

export const fetchAndSaveData = async (sdt) => {
  //const data = await fetchDataCCTV(dt);
  //const data = await fetchDataNormal(dt);
  const data = await fetchDataAll(sdt);
  if (data.length == 0) return false;
  return await saveData(sdt, data);
};
