---
title: Custom CSS styling
date: 2023/11/28 00:02
authors: [khaya-zulu]
tag: ["intro"]
---

Just like Astro's Starlight, Changesaw allows you to add your own custom styles to apply to your changelog's pages. Use the `meta.customCSS` field, in your config to define the paths you want added to your pages.

```css
/* src/styles/custom-styles.css */
:root {
  --ch-primary-color: #d95204;
  --ch-secondary-color: #475569;

  --ch-navbar-color-bg: #f0f0f0ed;

  --ch-border-color: #e0e4e7;
  --ch-border-secondary-color: #e0e4e7;

  --ch-text-2xl: 1.5rem;

  /* code */
  --ch-code-bg-color: #f9f5d7;
  --ch-code-border-color: #618d62;
  --ch-code-single-quote-color-bg: #f3f3f3;
  --ch-code-border-color: #dcdcdc;
}
```

You can also stylize your changelog's code elements. Astro comes with built-in support for [shiki](https://github.com/shikijs/shiki):

```css
/* src/styles/custom-shiki.css */
/* https://vscodethemes.com/e/jdinhlife.gruvbox/gruvbox-dark-soft?language=javascript */
:root {
  --astro-code-color-text: #ebdbb2;
  --astro-code-color-background: #32302f;
  --astro-code-token-constant: #82a497;
  --astro-code-token-string: #b0b325;
  --astro-code-token-comment: #928374;
  --astro-code-token-keyword: #f27b19;
  --astro-code-token-parameter: #423e3b;
  --astro-code-token-function: #fabd2f;
  --astro-code-token-string-expression: #9fa227;
  --astro-code-token-punctuation: #a89984;
  --astro-code-token-link: #423e3b;
}
```

Your custom styles can be added by listing their relative paths in your config:

```js
export default defineConfig({
  // ...
  integrations: [
    // ...
    changesaw({
      // ...
      meta: {
        // ...
        customCSS: [
          "./src/styles/custom-shiki.css",
          "./src/styles/custom-styles.css",
        ],
      },
    }),
  ],
});
```
