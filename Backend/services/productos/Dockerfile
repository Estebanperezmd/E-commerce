FROM node:20.18.0-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20.18.0-slim AS production
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/tsconfig.json ./tsconfig.json
ENV NODE_ENV=production
ENV PORT=3001
EXPOSE 3001
CMD ["node", "dist/main.js"]