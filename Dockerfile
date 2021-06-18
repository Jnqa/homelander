FROM node:12.18-alpine

ENV NODE_ENV=production

WORKDIR /usr/app

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .

RUN ls
CMD npm run dev
