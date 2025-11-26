FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_ENV=production
ENV PORT=3002

EXPOSE 3002

CMD ["node", "main.js"]