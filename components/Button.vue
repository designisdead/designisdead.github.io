<template>
  <div>
    <nuxt-link 
      v-editable="blok"
      v-if="!externalLink"
      :class="[blok.style]"
      :key="blok.id"
      :to="blok.link.cached_url"
      class="Button">
      {{ blok.text }}
    </nuxt-link>
    <a 
      v-if="externalLink" 
      :href="blok.link.cached_url"
      :class="[blok.style]"
      class="Button"
      rel="noopener">
      {{ blok.text }}
    </a>
  </div>
</template>

<script>
  export default {
    props: {      blok: {        type: Object,        default: function () {          return {}        }      }    },
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
