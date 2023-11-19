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
        "Astro Starlight, but for changelogs. An astro plugin for creating and managing your changelogs with markdown.",
      meta: {
        domain: "https://changesaw.khayaos.com",
        domainTitle: "Astro Starlight, but for changelogs",
        ogImage: "/default.webp",
      },
      logoPath: "/logo.webp",
      socials: {
        github: "https://github.com/khaya-zulu/changesaw",
      },
    }),
  ],
});
