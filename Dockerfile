#  Dockerfile Production

# Stage 1: Build Client
FROM node:12.18.2-alpine as client

RUN mkdir -p usr/app/client
WORKDIR /usr/app/client

COPY client/package*.json ./

RUN npm install --silent

COPY client/ ./
RUN npm run build

# Stage 2: Build Server
FROM node:12.18.2-alpine

RUN mkdir -p usr/src/app
WORKDIR /usr/src/app/

COPY --from=client /usr/app/client/build/ ./client/build/

WORKDIR /usr/src/app/server/
COPY server/package*.json ./
RUN npm install 
COPY server/ ./

EXPOSE 4949

CMD [ "npm", "start" ]