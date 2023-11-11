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
```

The project structure with the injected routes from the integration:

```
|-- ...
|-- /src
|   |-- /content
|   |   |-- /authors/
|   |   |-- /changelogs/
|   |-- /index.astro
|   |-- /[id].astro
```
