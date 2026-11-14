import { defineConfig } from "@neon/config/v1";

export default defineConfig({
  // Live queries for the dashboard inbox
  preview: {
    realtime: true,
  },
  // Managed Better Auth for the dashboard sign-in
  auth: true,
  buckets: {
    // private: uploads are served through short-lived presigned URLs from the API
    uploads: { access: "private" },
  },
  // Branch policy: per-branch tuning
  branch: (branch) => {
    if (branch.isDefault) {
      // Default branch: no overrides, uses project defaults
      return {};
    }
    if (!branch.exists) {
      // New non-default branches: auto-expire
      return { ttl: "7d" };
    }
    // Existing branch: no changes
    return {};
  },
});
