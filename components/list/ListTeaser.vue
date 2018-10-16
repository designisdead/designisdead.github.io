<template>
  <li class="ListTeaser">
    <h2>
      <nuxt-link
        :key="post.full_slug"
        :to="post.full_slug"
        class="ListTeaser-link">{{ post.name }}</nuxt-link>
    </h2>
    <p v-if="post.content.metadescription">
      {{ post.content.metadescription }}
    </p>
    <nuxt-link
      :key="post.full_slug"
      :to="post.full_slug"
      class="ListTeaser-readMore">Read more</nuxt-link>
  </li>
</template>

<script>
  export default {
    props: {
      post: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
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
