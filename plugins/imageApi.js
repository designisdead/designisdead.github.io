import Vue from 'vue';

Vue.filter('imageApi', ({src, size = '', filters = ''}) => {
  if (!src.endsWith('.svg')) {
    const sizes = {
      'nano': '25x0',
      'micro': '50x0',
      'tiny': '100x0',
      'small': '400x0',
      'medium': '800x0',
      'large': '1200x0',
      'huge': '1920x0',
      'verticalSmall': '0x400'
    };

    const imageSize = size in sizes ? '/' + sizes[size] : '';
    const imageService = '//img2.storyblok.com';
    const path = src.replace('//a.storyblok.com', '');

    return imageService + imageSize + filters + path;
  }
  else {
    return src;
  }
});
