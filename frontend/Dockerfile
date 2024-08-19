# Node version for other Docker stages
FROM node:20-alpine AS base-node-version

FROM base-node-version AS front-end-dependencies-install
RUN mkdir -p /app && chown -R node:node /app
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY --chown=node:node . .

FROM front-end-dependencies-install AS front-end-build
ENV NODE_ENV=production
COPY --from=front-end-dependencies-install /app/node_modules ./node_modules
COPY src ./src
COPY public ./public
COPY next.config.mjs ./
COPY tsconfig.json ./
COPY .eslintrc.json ./
COPY tailwind.config.ts ./
COPY postcss.config.mjs ./
RUN npm run lint
RUN npm run build
COPY --chown=node:node . .

FROM front-end-build AS fron-end-test
COPY --from=front-end-dependencies-install /app/node_modules ./node_modules
COPY --from=front-end-build /app//src ./src
COPY --from=front-end-build /app//public ./public
COPY --from=front-end-build /app/next.config.mjs ./
COPY --from=front-end-build /app/tsconfig.json ./
COPY --from=front-end-build /app/eslintrc.json ./
COPY --from=front-end-build /app/tailwind.config.ts ./
COPY --from=front-end-build /app/postcss.config.mjs ./
COPY jest.{config,setup}.ts ./
RUN npm run test
COPY --chown=node:node . .

FROM front-end-build AS front-end-dev
ENV NODE_ENV=development
COPY --from=front-end-dependencies-install /app/node_modules ./node_modules
COPY --from=front-end-build /app//src ./src
COPY --from=front-end-build /app//public ./public
COPY --from=front-end-build /app/next.config.mjs ./
COPY --from=front-end-build /app/tsconfig.json ./
COPY --from=front-end-build /app/tailwind.config.ts ./
COPY --from=front-end-build /app/postcss.config.mjs ./
EXPOSE 3000
CMD ["npm", "run", "dev"]
