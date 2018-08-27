<template>
  <li class="ListTeaser">
      <h2>
        <nuxt-link class="ListTeaser-link" :key="post.full_slug" :to="post.full_slug">{{ post.name }}</nuxt-link>
      </h2>
      <p v-if="post.content.metadescription">
        {{ post.content.metadescription }}
      </p>
      <nuxt-link class="ListTeaser-readMore" :key="post.full_slug" :to="post.full_slug">Read more</nuxt-link>
  </li>
</template>

<script>
  export default {
    props: ['post'],
  }
</script>

<style lang="scss">
  .ListTeaser {
    position: relative;
    list-style-type: none;
    margin-bottom: $spacer;
    opacity: 0.8;
    display: block;
    &:before {
      content: '*';
      position: absolute;
      top: 0;
      left: -25px;
      font-size: 2.5rem;
    }
  }

  .ListTeaser-link {
    &:hover {
      text-decoration: none;
    }
  }

  a.ListTeaser-readMore {
    position: relative;
    display: inline-block;
    font-weight: bold;
    &:after {
      content: ' ';
      position: absolute;
      bottom: -3px;
      left: 50%;
      height: 2px;
      background: currentColor;
      width: 100%;
      transition: width 0.15s ease-out;
      transform: translateX(-50%);
      will-change: width;
    }

    &:hover {
      text-decoration: none;
      &:after {
        width: 80%;
      }
    }
  }
</style>
