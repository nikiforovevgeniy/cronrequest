FROM node:14.18-alpine as build-stage
WORKDIR /usr/src/app
RUN npm install -g http-server
COPY package.json .
RUN npm install
COPY . .
ARG VUE_APP_API_URL http://localhost/
ENV VUE_APP_API_URL=$VUE_APP_API_URL
RUN npm run build
EXPOSE 8080
CMD ["http-server", "dist", "--proxy", "http://localhost:8080?"]