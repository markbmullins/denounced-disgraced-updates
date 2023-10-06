import { initTRPC } from "@trpc/server";

// Avoid exporting the entire t-object
// since it's not very descriptive.
// is common in i18n libraries.
const t = initTRPC.create();

// Base router and procedure helpers
export const router = t.router;
export const procedure = t.procedure;
