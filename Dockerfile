FROM node:12-alpine

WORKDIR /app

COPY . /app

USER root

RUN yarn install --pure-lockfile
RUN yarn run build

#RUN chown -R player:player /app && chmod -R 755 /app

EXPOSE 3000

CMD ["yarn", "run", "start:prod"]
