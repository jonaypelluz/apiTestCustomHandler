FROM node:18-alpine

WORKDIR /app

RUN apk update && apk add bash git python3

COPY . .

RUN yarn install --ignore-scripts

CMD ["yarn", "start"]
