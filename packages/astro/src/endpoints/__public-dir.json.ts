import type { APIRoute } from "astro";

import fs from "fs";

export const GET: APIRoute = () => {
  const publicDir = fs.readFileSync("./public");
  console.log("public/", publicDir);

  return new Response(publicDir);
};
