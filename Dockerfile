FROM node:8

ENV HOST 0.0.0.0

ARG BUILD_NUMBER_ARG
ARG VERSION_ARG
ARG GIT_HASH_ARG

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

RUN \
  export API_URL='%%API_URL%%' && \
  npm run build

RUN chmod +x ./entrypoint.sh

ENV BUILD_NUMBER=$BUILD_NUMBER_ARG
ENV VERSION=$VERSION_ARG
ENV GIT_HASH=$GIT_HASH_ARG

EXPOSE 3000
ENTRYPOINT ["./entrypoint.sh"]
