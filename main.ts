import {
  basename,
  extname,
  parse,
  resolve,
} from "https://deno.land/std@0.217.0/path/mod.ts";

console.log(extname("public/index.html"));
console.log(basename("public/index.html"));
console.log(parse("public/index.html"));
console.log(resolve("public/index.html"));
