const axios = require("axios");
const webpack = require('webpack');
const config = require('./plugins/config');
const bodyParser = require('body-parser')

console.log('Running in environment: ', process.env.NODE_ENV);

module.exports = {
  mode: 'universal',
  modules: [
    '@traum-ferienwohnungen/nuxt-advanced-healthcheck',
    ['storyblok-nuxt', {
      // accessToken: 'O2r6aDSsF6m26lYt5NNMzQtt',
      accessToken: 'AJwMQue3YmvF9GhvSrecTQtt',
      // accessToken: process.env.NODE_ENV === 'production' ? 'O2r6aDSsF6m26lYt5NNMzQtt' : 'AJwMQue3YmvF9GhvSrecTQtt',
      cacheProvider: 'memory',
      excludeHeaderScript: false
      // excludeHeaderScript: process.env.NODE_ENV == 'production'
    }],
    ['@nuxtjs/style-resources'],
    ['@nuxtjs/google-analytics', {
      id: 'UA-98613071-1'
    }],
    ['@nuxtjs/google-tag-manager', {
      id: 'GTM-TQWRSTX'
    }]
  ],
  styleResources: {
    scss: ['@/assets/scss/_config.scss'],
  },
  server: {
    port: 3000,
    host: '0.0.0.0', // localhost
  },
  plugins: [
    {
      ssr: true,
      src: '~/plugins/components.js'
    },
    {
      ssr: true,
      src: '~/plugins/imageApi.js'
    },
    {
      ssr: false,
      src: '~/plugins/lazyLoad.js'
    },
    {
      ssr: false,
      src: '~/plugins/parallax.client.js'
    },
    {
      // ssr true required for gmap to work in staging
      ssr: true,
      src: '~/plugins/googleMapConfig.js'
    }
  ],
  serverMiddleware: [
    // body-parser middleware
    bodyParser.json(),
    '~/servermiddleware/seo.js',
    // Will register file from project api directory to handle /api/* requires
    { path: '/api', handler: '~/servermiddleware/echo.js' },
  ],
  router: {
    middleware: 'stats'
  },
  env: {
    apiUrl: process.env.API_URL || 'http://localhost:3000/api/echo'
  },
  /*
  ** Headers of the page
  */
  head: {
    htmlAttrs: {
      lang: 'en',
    },
    title: 'Design is Dead',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {name: 'theme-color', content: '#fffffe'}, // Chrome tab color on android
      {hid: 'description', name: 'description', content: 'Design is Dead'},
      {hid: 'fb:app_id', name: 'fb:app_id', content: '879905388836438'},
      {hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image'},
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: 'icon', type: 'image/png', href: '/favicon-32x32.png'},
      {rel: 'icon', type: 'image/png', href: '/favicon-16x16.png'},
      {rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5'},
      {rel: 'preconnect', href: 'https://img2.storyblok.com'},
      {rel: 'dns-prefetch', href: 'https://img2.storyblok.com'},
      {rel: 'preconnect', href: 'https://www.google-analytics.com'},
      {rel: 'dns-prefetch', href: 'https://www.google-analytics.com'},
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: {color: '#000001'},
  manifest: {
    theme_color: '#000001',
    name: "Design is Dead",
    display: "standalone",
    short_name: "did"
  },
  /*
  ** Build configuration
  */
  build: {
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.ContextReplacementPlugin(
        /highlight\.js\/lib\/languages$/,
        new RegExp(`^./(${config.allowedLanguagesForHighlightJS.join('|')})$`),
      ),
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ],
    /*
     * Run ESLint on save
     */
    extend(config, {isDev, isClient}) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    transpile: [/^vue2-google-maps($|\/)/]
  },
  generate: {
    fallback: true,
    routes: () => {
      let posts = axios
        .get('https://api.storyblok.com/v1/cdn/links?version=published&token=O2r6aDSsF6m26lYt5NNMzQtt&cv=' + Math.floor(Date.now()))
        .then(res => {
          var pages = [];

          for (var key in res.data.links) {
            // skip loop if the property is from prototype
            if (!res.data.links.hasOwnProperty(key)) continue;

            var obj = res.data.links[key];
            // do not generate empty folder
            if(
              obj.hasOwnProperty('slug') &&
              obj.slug.substr(0,1) !== '_' &&
              // obj.slug.indexOf('/') < 1 &&
              !obj.is_folder
            ) {
              pages.push(obj.slug)
            }
          }

          // add other pages
          return [
            '/',
            ...pages
          ];
        });

      return Promise.all([posts]).then(values => {
        return values.join().split(',');
      });
    }
  },
}
