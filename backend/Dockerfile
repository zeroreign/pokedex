# Node version for other Docker stages
FROM node:20-alpine AS base-node-version

FROM base-node-version AS node-dependencies
RUN mkdir -p /app
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node-dependencies AS dev
WORKDIR /app
COPY . .
EXPOSE 3001
ENV PORT=3001
CMD ["npm", "run", "start:dev"]