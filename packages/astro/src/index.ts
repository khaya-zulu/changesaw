import type { AstroIntegration } from "astro";

import { changesawConfigSchema, type ChangesawConfig } from "./schema";
import type { AstroUserConfig } from "astro/config";

export default function changesawAstroPlugin(
  changesawConfig: ChangesawConfig
): AstroIntegration {
  const parsedConfig = changesawConfigSchema.safeParse({
    ...{ indexPath: "/", idPath: "/[id]" },
    ...changesawConfig,
  });

  if (!parsedConfig.success) {
    throw new Error(
      "Changesaw integration config invalid:\n" +
        parsedConfig.error.issues
          .map((i) => `[${i.path}] ${i.message}`)
          .join("\n")
    );
  }

  const userConfig = parsedConfig.data;

  return {
    name: "@changesaw/astro",
    hooks: {
      "astro:config:setup": ({ injectRoute, updateConfig, config }) => {
        injectRoute({
          pattern: "/changelog/latest.json",
          entryPoint: "@changesaw/astro/latest.json.ts",
        });

        if (userConfig.indexPath) {
          injectRoute({
            pattern: userConfig.indexPath,
            entryPoint: "@changesaw/astro/index.astro",
          });
        }

        if (userConfig.idPath) {
          injectRoute({
            pattern: userConfig.idPath,
            entryPoint: "@changesaw/astro/[id].astro",
          });
        }

        const userConfigVirtualModuleId = "virtual:changesaw/user-config";
        const styleOverridesVirtualModuleId =
          "virtual:changesaw/style-overrides";

        const createResolvedVirtualModuleId = (id: string) => `\0${id}`;

        const viteUserConfig: AstroUserConfig = {
          vite: {
            plugins: [
              {
                name: "@changesaw/astro",
                resolveId: (id) => {
                  if (
                    [
                      userConfigVirtualModuleId,
                      styleOverridesVirtualModuleId,
                    ].includes(id)
                  ) {
                    return createResolvedVirtualModuleId(id);
                  }
                  return;
                },
                load: (id) => {
                  // create a virtual module that exports the user config
                  if (
                    id ===
                    createResolvedVirtualModuleId(userConfigVirtualModuleId)
                  ) {
                    return `export const userConfig = ${JSON.stringify(
                      userConfig
                    )}`;
                  }

                  // create a virtual module that exports the style
                  // ... used to override the default styles
                  if (
                    id ===
                    createResolvedVirtualModuleId(styleOverridesVirtualModuleId)
                  ) {
                    return (
                      userConfig.meta?.customCSS
                        ?.map((filePath) => `import "${filePath}";`)
                        .join("") ?? ""
                    );
                  }

                  return;
                },
              },
            ],
          },
          markdown: {
            shikiConfig:
              // configure Shiki theme if the user is using the default github-dark theme.
              config.markdown.shikiConfig.theme !== "github-dark"
                ? {}
                : { theme: "css-variables" },
          },
        };

        updateConfig(viteUserConfig);
      },
    },
  };
}
