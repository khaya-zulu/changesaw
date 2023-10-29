import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import changesaw from "@changesaw/astro";

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  integrations: [
    tailwind(),
    changesaw({
      title: "Changesaw",
      description:
        "Docusaurus for your changelogs. An astro plugin for creating and managing your changelogs with markdown.",
      meta: {
        domain: "https://changesaw.khayaos.com",
        domainTitle: "Docusaurus for your changelog.",
      },
      logoPath: "./logo.png",
      socials: {
        twitter: "https://twitter.com/khaya_was_taken",
      },
    }),
  ],
});
