import { z } from "astro/zod";
import { defineCollection, reference } from "astro:content";

import { authorSchema, changelogSchema } from "@changesaw/astro/schema";

export const collections = {
  changelogs: defineCollection({
    schema: changelogSchema.merge(
      z.object({ authors: z.array(reference("authors")) })
    ),
  }),
  authors: defineCollection({ schema: authorSchema, type: "data" }),
};
