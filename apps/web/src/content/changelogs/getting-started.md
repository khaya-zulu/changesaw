---
title: Installation & setup
date: 2023/11/28 00:01
authors: [khaya-zulu]
tag: ["getting started"]
---

Install the package:

```bash
pnpm install @changesaw/astro
```

Add the plugin in your to your `astro.config.mjs` file:

```js
export default defineConfig({
  // ...
  integrations: [
    // ...
    changesaw({
      title: "Changesaw",
      description:
        "Astro Starlight, but for changelogs. An astro plugin for creating and managing your changelogs with markdown.",
      meta: {
        domain: "https://changesaw.khayaos.com",
        domainTitle: "Astro Starlight, but for changelogs",
      },
      logoPath: "./logo.png",
      socials: {
        twitter: "https://twitter.com/khaya_was_taken",
      },
    }),
  ],
});
```

Once you have set up your collections in `src/content` ([see example](https://github.com/khaya-zulu/changesaw/tree/main/apps/web/src/content)), your project struture (with the routes injected by the plugin) should look like this:

```
|-- ...
|-- /src
|   |-- /content
|   |   |-- /authors/
|   |   |-- /changelogs/
|   |-- /index.astro
|   |-- /[id].astro
|   |-- /changelog
|   |-- |-- /latest.json
```
