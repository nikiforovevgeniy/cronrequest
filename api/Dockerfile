FROM node:14.18-alpine
EXPOSE $SERVER_PORT
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY . .
CMD ["node", "./src/index.js"]
