<template>
  <div
    v-editable="blok"
    class="YoutubeEmbed">
    <iframe
      :src="youtubeSrc"
      width="560"
      height="349"
      frameborder="0"
      allowfullscreen />
  </div>
</template>

<script>
  export default {
    props: {
      blok: {
        type: Object, default: function () {
          return {}
        }
      }
    },
    computed: {
      youtubeSrc() {
        return '//www.youtube.com/embed/' + this.blok.youtube_id + '?rel=0&hd=1';
      }
    }
  }
</script>

<style lang="scss">
  .YoutubeEmbed {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 */
    padding-top: 25px;
    height: 0;
  }
  .YoutubeEmbed iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
