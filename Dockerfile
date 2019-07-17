FROM node:alpine

ENV APP_ROOT /src
ENV PORT 8808
ENV HOST 0.0.0.0

RUN mkdir ${APP_ROOT}
WORKDIR ${APP_ROOT}

ADD . ${APP_ROOT}

RUN rm -rf node_modules/
RUN npm install -g yarn
RUN yarn add sharp
RUN yarn

EXPOSE 8808

CMD [ "yarn", "start" ]