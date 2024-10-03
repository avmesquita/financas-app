### STAGE 1: BUILDER ###
ARG NODE_VERSION=18.16.0
ARG ALPINE_VERSION=3.17.1

FROM node:${NODE_VERSION}-alpine AS node

FROM alpine:${ALPINE_VERSION} as builder

COPY --from=node /usr/lib /usr/lib
COPY --from=node /usr/local/lib /usr/local/lib
COPY --from=node /usr/local/include /usr/local/include
COPY --from=node /usr/local/bin /usr/local/bin

RUN npm install -g yarn --force

RUN mkdir -p /ng-app/dist/frontend

WORKDIR /ng-app

COPY package.json package-lock.json ./

RUN npm install -g @angular/cli@17.3.4

RUN npm install --force

COPY . .

RUN yarn run build

### STAGE 2: SETUP ###

FROM nginx:1.14.1-alpine

COPY --from=builder /ng-app/dist/frontend /usr/share/nginx/html

# CONFIGURE NGINX
COPY --from=builder /ng-app/dist/frontend/nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]
