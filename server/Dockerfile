FROM node:16-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn
COPY . .
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
RUN yarn build
CMD ["node", "dist/main"]