FROM node:lts-alpine3.17

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 5000

CMD npx prisma generate && npx prisma migrate deploy && yarn start