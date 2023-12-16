FROM node:16-alpine AS builder

ENV NODE_ENV build


WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npx prisma generate
RUN npm run build \
    && npm prune --production

# ---


FROM node:16-alpine

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules/ ./node_modules/
COPY --from=builder /usr/src/app/dist/ ./dist/
COPY --from=builder /usr/src/app/src/infrastructure/database/prisma/ ./src/infrastructure/database/prisma/


CMD ["npm", "run", "start:prod"]