import { generateReactHelpers } from '@uploadthing/react';

// Endpoint names must match server/uploadthing.js.
export const { useUploadThing } = generateReactHelpers();
