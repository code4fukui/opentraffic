import * as t from "https://deno.land/std/testing/asserts.ts";
import { parseGeometry } from "./parseGeometry.js";

Deno.test("simple", () => {
  t.assertEquals(parseGeometry("MULTIPOINT ((140.1455465 37.110573456365614))"), [["140.1455465", "37.110573456365614"]]);
  t.assertEquals(parseGeometry("MULTIPOINT ((139.068639 37.89993403719785), (139.0649569 37.8988954271968))"), [["139.068639", "37.89993403719785"], ["139.0649569", "37.8988954271968"]]);
});
