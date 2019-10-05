FROM node:12-alpine

WORKDIR /app

COPY . /app

RUN yarn install --pure-lockfile
RUN yarn run build

EXPOSE 5000

CMD ["yarn", "run", "start"]
