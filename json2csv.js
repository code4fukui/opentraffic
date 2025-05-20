import { CSV } from "https://js.sabae.cc/CSV.js";

//const data = await CSV.fetchJSON("./geoserver.json");
const data = JSON.parse(await Deno.readTextFile("./geoserver.json"));
console.log(data);
console.log(data.features[0].geometry.coordinates);
let nmulti = 0;
const csv = data.features.map(i => {
	const o = {};
	const ll = i.geometry.coordinates;
	o.id = i.id;
	if (ll.length != 1) {
		nmulti++;
		//throw new Error("multi!" + ll);
	}
	o.lat = ll[0][1];
	o.lng = ll[0][0];
	for (const name in i.properties) {
		o[name] = i.properties[name];
	}
	return o;
});
console.log(nmulti, csv.length); // nmulti == 10
await Deno.writeTextFile("./geoserver.csv", CSV.stringify(csv));


