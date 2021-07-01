FROM node:14-alpine AS build
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn prisma generate && yarn build
# Ici, l'application est compilée

FROM node:14-alpine
EXPOSE 4000
WORKDIR /app

COPY package.json yarn.lock src/context.ts docker/entrypoint.sh ./
COPY prisma .
RUN yarn install --production && yarn prisma generate

COPY --from=build /app/dist/src ./
CMD [ "/bin/sh", "/app/entrypoint.sh" ]
