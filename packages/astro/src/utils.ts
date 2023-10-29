export const sortChangelogsByDate = <T extends Record<any, any>>(
  changelogs: T[]
) => {
  return changelogs.sort(
    (a, b) => a.data.date.getTime() - b.data.date.getTime()
  );
};
