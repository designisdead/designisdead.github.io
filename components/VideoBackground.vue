<template>
  <div class="VideoBackground"
       v-lazy:background-image="$options.filters.imageApi(poster, 'large')">
    <video class="VideoBackground-video" :poster="poster" playsinline autoplay loop muted>
      <!--
    - Video needs to be muted, since Chrome 66+ will not autoplay video with sound.
    WCAG general accessibility recommendation is that media such as background video play through only once.  -->
      <source :src="src" type="video/mp4">
    </video>
  </div>
</template>
<script>
  export default {
    props: {
      src: String,
      poster: String
    },
    mounted() {
      let video = this.$el.querySelectorAll('video')[0];

      if (window.matchMedia('(prefers-reduced-motion)').matches) {
        video.removeAttribute("autoplay");
        this.stopVideo();
      }

      /*
      // only works when there is no loop attribute
      video.addEventListener('loadedmetadata', () => {
        console.log(video.duration);
        // @todo: get 2 seconds transition speed from .VideoBackground-video
        let timeoutDuration = Math.floor((video.duration - 2) * 1000);
        setTimeout(
          () => this.stopVideo(video), timeoutDuration
        );
      });
      */
      this.$nextTick(() => {
        this.startVideo(video);
      });
    },
    methods: {
      startVideo: function (video) {
        video.classList.add('VideoBackground-video--playing');
      },
      stopVideo: function (video) {
        video.pause();
        video.classList.remove('VideoBackground-video--playing');
      }
    }
  }
</script>
<style lang="scss">
  .VideoBackground {
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    background-size: cover;
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
  }
</style>
