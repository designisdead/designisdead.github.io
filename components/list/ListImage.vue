<template>
  <li class="ListImage">
    <nuxt-link
      :key="post.full_slug"
      :to="'/' + post.full_slug"
      @mouseover.native="preloadHeader($options.filters.imageApi(post.content.primaryimage, 'large'))">
      <article>
        <div 
          v-lazy:background-image="$options.filters.imageApi(post.content.primaryimage, 'small')"
          v-if="post.content.primaryimage"
          :style="'background-image: url(' + $options.filters.imageApi(post.content.primaryimage, 'nano') + ')'"
          class="ListImage-image"
          :data-title="post.name">
          <h1 class="medium Title ListImage-title">{{ post.name }}</h1>
        </div>   
      </article>
    </nuxt-link>
  </li>
</template>

<script>
import moment from "moment";

export default {
  props: {
    post: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  computed: {
    tags() {
      return this.post.content.tags && this.post.content.tags.tags
        ? this.post.content.tags.tags
        : {};
    }
  },
  methods: {
    preloadHeader(url) {
      var img = new Image();
      img.src = url;
    }
  }
};
</script>

<style lang="scss" scoped>
.ListImage {
  background: white;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);
  padding: 0;
  margin: 0 $spacer/2 $spacer;
  list-style-type: none;
  overflow: hidden;
  > a:hover {
    text-decoration: none;
  }
}

.ListImage-title {
  letter-spacing: 1.25px;
  z-index: 1;
  color: white;
  padding: $spacer;
  text-align: center;
}

.ListImage-image {
  position: relative;
  z-index: 0;
  width: 100%;
  height: 180px;
  background-size: cover;
  background-position: center center;
  filter: blur(15px);
  display: flex;
  justify-content: center;
  align-items: center;
  &[lazy="loaded"] {
    filter: blur(0px);
  }
  &:after {
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.35);
    opacity: 1;
    transition: 1.5s ease-out opacity;
  }
  &:hover:after {
    opacity: 0;
  }
  &:before {
    position: absolute;
    z-index: 2;
    content: attr(data-title);
    left: 0;
    bottom: -20px;
    right: 0;
    color: white;
    text-transform: uppercase;
    font-weight: bold;
    opacity: 0.1;
    line-height: 1;
    white-space: nowrap;
    font-size: 100px;
    transform: rotate(-35deg);
  }
}
</style>
