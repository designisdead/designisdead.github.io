# Design is Dead

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).

## build and push docker image 

``` bash
# build image. Inside of the root of the project do:
$ docker build -t designisdead/website .

# push image to docker hub (make sure you are logged in through the 'docker login' command
$ docker push designisdead/website

```     

## to support env variables we might need to get hacky

https://github.com/nuxt/nuxt.js/issues/5100

https://github.com/nuxt/nuxt.js/issues/5100#issuecomment-476032241

