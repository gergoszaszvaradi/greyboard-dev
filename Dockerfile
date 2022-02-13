FROM node:latest as nodejs

WORKDIR /usr/src/greyboard
COPY package.json .
RUN yarn install --production --no-lockfile
COPY dist dist/

EXPOSE 5000
CMD ["yarn", "start"]