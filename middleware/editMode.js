// Runs after nuxtServerInit
// Also triggered client-side when the user navigates between pages
// https://github.com/nuxt/nuxt.js/issues/273
// https://www.storyblok.com/docs/Guides/storyblok-latest-js

// We're not using crypto for now because it has a huge impact on vendor.app.js
// import crypto from 'crypto';

export default function (context) {
  // check editMode
  let editMode = false;

  if(context.query['_storyblok_tk[space_id]']) {
    // const validationString = context.query['_storyblok_tk[space_id]'] + ':AJwMQue3YmvF9GhvSrecTQtt:' + context.query['_storyblok_tk[timestamp]'];
    // const validationToken = crypto.createHash('sha1').update(validationString).digest('hex');

    // if (context.query['_storyblok_tk[token]'] == validationToken && context.query['_storyblok_tk[timestamp]'] > Math.floor(Date.now() / 1000) - 3600) {
      editMode = true;
    // }
  }

  return editMode;
}
