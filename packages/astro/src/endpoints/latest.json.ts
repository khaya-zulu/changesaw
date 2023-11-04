import type { APIRoute } from "astro";

import { getCollection } from "astro:content";

import { sortChangelogsByDate } from "../utils";

export const prerender = true;

export const GET: APIRoute = async () => {
  const changelogs = await getCollection("changelogs");
  const latest = sortChangelogsByDate(changelogs)[0];

  return new Response(JSON.stringify(latest));
};
