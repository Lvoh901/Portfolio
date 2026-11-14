import { createRouteHandler } from 'uploadthing/next';
import { ourFileRouter } from '../../../server/uploadthing.js';

export const runtime = 'nodejs';

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: { token: process.env.UPLOADTHING_TOKEN },
});
