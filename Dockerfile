FROM alpine:3.21.2 as base

FROM node:18.18.2-alpine3.18 as build
RUN apk update
RUN apk add maven
WORKDIR /app
COPY . .
RUN yarn
RUN yarn run build-keycloak-theme

FROM base
COPY --from=build /app/dist_keycloak /themes