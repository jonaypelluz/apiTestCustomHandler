

FROM node:18-alpine

WORKDIR /app

RUN apk update && apk add bash git python3

RUN npm install eslint -g

COPY . .

RUN yarn install --ignore-scripts
RUN yarn build

CMD ["yarn", "dev"]