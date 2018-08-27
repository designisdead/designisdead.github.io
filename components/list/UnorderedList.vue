<template>
  <li>
    <nuxt-link :key="post.full_slug" :to="post.full_slug">
        {{ post.name }}
    </nuxt-link>
  </li>
</template>

<script>
  export default {
    props: ['post'],
  }
</script>
