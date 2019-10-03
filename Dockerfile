FROM node:12-alpine
WORKDIR /root/foosball-rating

COPY . .

RUN yarn install --pure-lockfile
RUN ["yarn" , "run", "build"]

EXPOSE 3000

CMD ["yarn", "run", "start:prod"]
