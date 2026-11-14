import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { env } from './env.js';

if (!env.storage.endpoint) {
  console.warn('[storage] AWS_ENDPOINT_URL_S3 is not set — uploads will fail');
}

const client = new S3Client({
  region: env.storage.region,
  endpoint: env.storage.endpoint || undefined,
  // Neon Object Storage requires path-style addressing
  forcePathStyle: true,
  credentials:
    env.storage.accessKeyId && env.storage.secretAccessKey
      ? {
          accessKeyId: env.storage.accessKeyId,
          secretAccessKey: env.storage.secretAccessKey,
        }
      : undefined,
});

export const BUCKET = env.bucket;

export const uploadObject = async ({ key, body, contentType }) => {
  await client.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: body,
      ContentType: contentType,
      CacheControl: 'public, max-age=3600',
    }),
  );
  return key;
};

export const objectUrl = async (key, expiresIn = 3600) => {
  if (!key) return null;
  return getSignedUrl(client, new GetObjectCommand({ Bucket: BUCKET, Key: key }), { expiresIn });
};

export const deleteObject = async (key) => {
  if (!key) return;
  await client.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: key }));
};

export const buildKey = (prefix, filename) => {
  const extension = (filename.split('.').pop() || 'bin').toLowerCase().replace(/[^a-z0-9]/g, '');
  const safePrefix = prefix.replace(/[^a-z0-9/_-]/gi, '');
  return `${safePrefix}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${extension}`;
};
