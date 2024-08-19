# Node version for other Docker stages
FROM node:20-alpine AS base-node-version

FROM base-node-version AS node-dependencies
RUN mkdir -p /app
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM base-node-version AS build-prod
WORKDIR /app
COPY --from=node-dependencies /app/node_modules ./node_modules
RUN npm run build

FROM base-node-version AS runner
WORKDIR /app
USER node
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=build-prod /app/public/ ./public
RUN mkdir .nextRUN chown nextjs:nodejs .next
COPY --from=build-prod --chown=nextjs:nodejs  /app/.next/standalone ./
COPY --from=build-prod --chown=nextjs:nodejs  /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
CMD HOSTNAME="0.0.0.0" node server.js

FROM base-node-version AS dev
WORKDIR /app
COPY --from=node-dependencies /app/node_modules ./node_modules
COPY --from=node-dependencies /app/package*.json ./
COPY . .
EXPOSE 3000
ENV PORT=3000
CMD ["npm", "run", "dev"]