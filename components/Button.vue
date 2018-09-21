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
  import isMailtoLink from '../plugins/isMailtoLink';
  import isExternalLink from '../plugins/isExternalLink';

  export default {
    props: {
      blok: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    computed: {
      externalLink() {
         return isExternalLink(this.blok.link.cached_url) || isMailtoLink(this.blok.link.cached_url);
      }
    },
  }
</script>
