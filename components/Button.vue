<template>
  <div>
    <nuxt-link v-editable="blok"
               v-if="!externalLink"
               class="Button"
               :class="[blok.style]"
               :key="blok.id"
               :to="blok.link.cached_url">
      {{ blok.text }}
    </nuxt-link>
    <a class="Button" :href="blok.link.cached_url"
      rel="noopener"
      :class="[blok.style]"
      v-if="externalLink">
      {{ blok.text }}
    </a>
  </div>
</template>

<script>
  export default {
    props: ['blok'],
    computed: {
      externalLink() {
        /*
          ^ - Only match at the beginning of the string
          http - Match the literal string "http"
          s? - Optionally match an "s"
          : - Match a colon
          \/\/ - Escape the "/" characters since they mark the beginning/end of the regular expression
          The "i" after the regular expression makes it case-insensitive so it will match "HTTP://", etc.
         */
         return /^https?:\/\//i.test(this.blok.link.cached_url);
      }
    }
  }
</script>
