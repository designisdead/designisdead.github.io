<template>
  <nuxt-link v-editable="blok"
    class="Button"
    :class="[blok.style]"
    :key="blok.id"
    :to="blok.link.url">
    {{ blok.text }}
  </nuxt-link>
</template>

<script>
  export default {
    props: ['blok']
  }
</script>
