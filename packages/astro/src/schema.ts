import { z } from "astro/zod";

const socials = z.object({
  discord: z.string().url(),
  github: z.string().url(),
  linkedin: z.string().url(),
  twitter: z.string().url(),
});

export const changesawConfigSchema = z.object({
  title: z.string(),
  description: z.string(),
  indexPath: z.string().optional(),
  idPath: z.string().optional(),
  logoPath: z.string().optional(),
  socials: socials.partial().optional(),
  meta: z
    .object({
      // todo: support relative paths, for now this value is inserted directly into
      // the `meta` content attribute. Relative paths our not supported for OG.
      ogImage: z.string().url(),
      customCSS: z.array(z.string()),
      domain: z.string().url(),
      domainTitle: z.string(),
    })
    .partial()
    .optional(),
});

export type ChangesawConfig = z.infer<typeof changesawConfigSchema>;

export const authorSchema = z.object({
  displayName: z.string(),
  github: z.string().url().optional(),
  email: z.string().email().optional(),
  avatarFilePath: z.string(),
});

export type Author = z.infer<typeof authorSchema>;

export const changelogSchema = z.object({
  title: z.string(),
  date: z.string().transform((args) => new Date(args)),
  cover: z.object({ filePath: z.string(), alt: z.string() }).optional(),
  tag: z.array(z.string()),
});

export type Changelog = z.infer<typeof changelogSchema> & { authors: Author[] };

export const createChangelogSchema = (authorRef: any) =>
  changelogSchema.merge(z.object({ authors: z.array(authorRef) }));
