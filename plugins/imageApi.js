import Vue from 'vue';

Vue.filter('imageApi', (src, size) => {
  if (src) {
    size = !size ? 'large' : size;

    const sizes = {
      'nano': '25x0',
      'micro': '50x0',
      'tiny': '100x0',
      'small': '400x0',
      'medium': '800x0',
      'large': '1200x0',
      'huge': '1920x0',
    };

    const imageService = '//img2.storyblok.com/';
    const path = src.replace('//a.storyblok.com', '');

    return imageService + sizes[size] + path;
  }
});
