FROM node:22-alpine AS base

FROM base AS builder

WORKDIR /app

COPY . .

RUN yarn install
RUN yarn build
RUN yarn db:generate

RUN addgroup -g 1001 nodejs
RUN adduser --system --uid 1001 hono

USER hono
EXPOSE 3000

CMD ["yarn", "start"]