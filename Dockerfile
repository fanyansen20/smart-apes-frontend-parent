#Build
FROM node:18.12.0-alpine as build-stage

ARG REACT_APP_SERVER_DOMAIN

ARG REACT_APP_MARKETPLACE_URL

ARG REACT_APP_SELLER_URL

ARG REACT_APP_SERVER_API

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package-lock.json /usr/src/app/package-lock.json

COPY package.json /usr/src/app/package.json

RUN apk add --no-cache git

RUN npm install

COPY . .

# ENV REACT_APP_MARKETPLACE_URL=https://stage.smartapes.sg
# ENV REACT_APP_SELLER_URL=https://stage.seller.smartapes.sg
# ENV REACT_APP_SERVER_API=https://stage.api.smartapes.sg/v1
ENV REACT_APP_RECAPTCHA_SITE_KEY=6Le3KYwkAAAAACzji4mDWzqnr74iO0_mdpjAhtDU
ENV GENERATE_SOURCEMAP=false

RUN npm run build

#Production
FROM nginx:1.20.1
RUN mkdir -p /data/letsencrypt/
COPY config/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


