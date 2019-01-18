<template>
  <div
    class="VideoBackground"
    v-lazy:background-image="headerImage">

    <div
      class="VideoBackground-darken"/>

    <video
      class="VideoBackground-video"
      playsinline
      autoplay
      loop
      muted>
      <!--
    - Video needs to be muted, since Chrome 66+ will not autoplay video with sound.
    WCAG general accessibility recommendation is that media such as background video play through only once.  -->
      <source
        :src="src"
        type="video/mp4">
    </video>
  </div>
</template>
<script>
  import supportsWebP from 'supports-webp';

  export default {
    props: {
      src: {
        type: String,
        default: ''
      },
      poster: {
        type: String,
        default: ''
      }
    },
    mounted() {
      // autoplay video
      let video = this.$el.querySelectorAll('video')[0];
      if (window.matchMedia('(prefers-reduced-motion)').matches) {
        video.removeAttribute("autoplay");
        this.stopVideo();
      }
      else {
        this.$nextTick(() => {
          this.startVideo(video);
        });
      }
    },
    methods: {
      startVideo: function (video) {
        // remove video overlay when video is already playing > smooth start
        const raf = () => {
          requestAnimationFrame(raf)
          if (video.currentTime > 0.2) {
            video.classList.add('VideoBackground-video--playing');
          }
        }
        requestAnimationFrame(raf);
      },
      stopVideo: function (video) {
        video.pause();
        video.classList.remove('VideoBackground-video--playing');
      }
    },
    computed: {
      headerImage() {
        const filters = supportsWebP ? '/filters:format(webp)' : '';
        return this.$options.filters.imageApi({src: this.poster, size: 'huge', filters: filters});
      }
    }
  }
</script>

<style lang="scss">
  .VideoBackground-darken,
  .VideoBackground {
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    background-size: cover;
    background-position: center center;
  }

  .VideoBackground-darken {
    background: black;
    z-index: 2;
    opacity: 0.25;
  }

  .VideoBackground-video {
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    z-index: -100;
    transform: translateX(-50%) translateY(-50%);
    transition: 2s opacity;
    will-change: opacity;
    opacity: 0;
  }

  .VideoBackground-video--playing {
    opacity: 1;
    z-index: 1;
  }
</style>
