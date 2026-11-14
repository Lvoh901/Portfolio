# Build the SPA, then run the Express server that serves dist + /api.
FROM node:22-bookworm-slim AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

# Auth and realtime URLs are injected at runtime by /runtime-config.js,
# so the image carries no environment-specific values.
COPY . .
RUN npm run build

FROM node:22-bookworm-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=build /app/dist ./dist
COPY server ./server
# server/api.js and server/migrate.js import the shared defaults from src/data
COPY src/data ./src/data

EXPOSE 3001
CMD ["node", "server/index.js"]
