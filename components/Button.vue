<template>
  <div>
    <nuxt-link
      v-editable="blok"
      v-if="!externalLink"
      :class="[blok.style]"
      :key="blok.id"
      :to="blok.link.cached_url"
      v-scroll-to="{ el: blok.link.url, offset: -this.headerHeight }"
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
          return {
            link: {
              cached_url: '/'
            }
          }
        }
      }
    },
    data() {
      return {
        headerHeight: 0,
      }
    },
    mounted() {
      window.addEventListener('resize', this.handleResize);
      this.handleResize();
    },
    destroyed() {
      window.removeEventListener('resize', this.handleResize);
    },
    computed: {
      externalLink() {
         return isExternalLink(this.blok.link.cached_url) || isMailtoLink(this.blok.link.cached_url);
      }
    },
    methods: {
      handleResize() {
        const header = document.querySelector('.Page-header');

        if(header) {
          this.headerHeight = header.offsetHeight;
        }
      }
    }
  }
</script>
