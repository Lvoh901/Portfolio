import { createUploadthing } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';
import { bearerFrom, isAdminEmail, verifyNeonToken } from './auth.js';

const f = createUploadthing();

/**
 * UploadThing calls this with the browser request, so the Managed Auth JWT sent
 * in the Authorization header is verified exactly like the REST routes.
 */
const adminOnly = async ({ req }) => {
  const token = bearerFrom(req);
  if (!token) throw new UploadThingError('Sign in to upload.');

  let payload;
  try {
    payload = await verifyNeonToken(token);
  } catch (error) {
    const expired = error?.code === 'ERR_JWT_EXPIRED';
    throw new UploadThingError(expired ? 'Your session expired. Please sign in again.' : 'Invalid session.');
  }

  const email = String(payload.email || '').toLowerCase();
  if (!email || !(await isAdminEmail(email))) {
    throw new UploadThingError('This account is not an administrator.');
  }

  return { email };
};

const done = ({ file }) => ({ url: file.ufsUrl, key: file.key, name: file.name, size: file.size });

export const ourFileRouter = {
  projectImage: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
    .middleware(adminOnly)
    .onUploadComplete(done),
  cvUpload: f({ pdf: { maxFileSize: '8MB', maxFileCount: 1 } })
    .middleware(adminOnly)
    .onUploadComplete(done),
};
