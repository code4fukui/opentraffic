// MULTIPOINT ((140.1455465 37.110573456365614))
// MULTIPOINT ((139.068639 37.89993403719785), (139.0649569 37.8988954271968))
export const parseGeometry = (s) => {
  if (!s.startsWith("MULTIPOINT (")) throw new Error("unsupported format");
  s = s.substring("MULTIPOINT (".length, s.length - 1);
  const ss = s.split(", ");
  const res = ss.map(i =>  i.replace(/[\(\)]/g, "").split(" "));
  return res;
};
