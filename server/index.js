import fs from 'node:fs';
import path from 'node:path';
import express from 'express';
import apiRouter from './api.js';
import { env } from './env.js';

const app = express();

app.set('trust proxy', 1);
app.disable('x-powered-by');
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'portfolio-api', time: new Date().toISOString() });
});

// Public runtime config for the SPA, so one build works in every environment.
app.get('/runtime-config.js', (_req, res) => {
  res.type('application/javascript');
  res.set('Cache-Control', 'no-store');
  res.send(
    `window.__PORTFOLIO_ENV__ = ${JSON.stringify({
      authUrl: env.authBaseUrl,
      realtimeUrl: env.realtimeUrl,
    })};`,
  );
});

app.use('/api', apiRouter);

// Serve the built SPA when it exists (production / local `npm run build && npm run server`)
const distDir = path.resolve('dist');
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir, { index: false }));
  app.use((req, res, next) => {
    if (req.method !== 'GET' || req.path.startsWith('/api')) return next();
    return res.sendFile(path.join(distDir, 'index.html'));
  });
}

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// eslint-disable-next-line no-unused-vars
app.use((error, _req, res, _next) => {
  console.error('[api]', error.message);
  if (error?.name === 'MulterError') {
    return res.status(400).json({ error: error.message });
  }
  return res.status(500).json({ error: 'Something went wrong. Please try again.' });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(env.port, () => {
    console.log(`[api] listening on http://localhost:${env.port}`);
  });
}

export default app;
