import path from "path";

export const basename = "/hw/store";

export const getPath = (path?: string, withBugId?: boolean) => {
  return basename + (path ? path : "/") + (withBugId
    ? "?bug_id=" + (process.env.BUG_ID || "")
    : "");
};
