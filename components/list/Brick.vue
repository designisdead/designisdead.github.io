<template>
  <article class="Brick">
    <header class="Brick-content">
      <picture
        v-if="post.content.secondaryimage"
        class="Brick-profileImage">
        <source :srcset="secondaryImage('/filters:format(webp)')" type="image/webp">
        <source :srcset="secondaryImage('')" type="image/jpeg">
        <img
          :src="secondaryImage('')"
          alt="post.name" >
      </picture>
      <h1 class="medium noSpaceBelow u-color--light">{{ post.name }}</h1>
      <h2
        v-if="post.content.jobtitle"
        class="small noSpaceBelow u-color--light">{{ post.content.jobtitle }}</h2>
      <ul class="Brick-tagList u-color--light">
        <li
          v-for="(tag, index) in post.tag_list.slice(0, 3)"
          v-bind:key="tag">{{ tag }}<span v-if="index != post.tag_list.length - 1">, </span></li>
      </ul>
    </header>
    <picture
      v-if="post.content.primaryimage"
      class="Brick-lowresBackgroundImage">
      <source :srcset="primaryImage('/filters:format(webp)')" type="image/webp">
      <source :srcset="primaryImage('')" type="image/jpeg">
      <img :src="primaryImage('')" alt="">
    </picture>
  </article>
</template>

<script>
  import scrollMonitor from 'scrollmonitor';
  import supportsWebP from 'supports-webp';

  export default {
    props: {
      post: {
        type: Object,
        default: function () {
          return {}
        }
      },
    },
    mounted() {
      if(process.client) {
        const brick = this.$el;
        const elementWatcher = scrollMonitor.create( brick , 1000);
        const filters = supportsWebP ? '/filters:format(webp)' : '';

        let highresImage = document.createElement("img");
        highresImage.classList.add('Brick-highresBackgroundImage');

        elementWatcher.enterViewport(() => {
          highresImage.src = this.$options.filters.imageApi({src: this.post.content.primaryimage, size: 'medium', filters: filters});
          brick.insertBefore(highresImage, brick.childNodes[0]);
        });
      }

    },
    methods: {
      primaryImage(webp) {
        return this.$options.filters.imageApi({src: this.post.content.primaryimage, size: 'nano', filters: webp});
      },
      secondaryImage(webp) {
        return this.$options.filters.imageApi({src: this.post.content.secondaryimage, size: 'tiny', filters: webp});
      },
    }
  }
</script>

<style lang="scss">

  .Brick {
    position: relative;
    padding: 0;
    margin: 0;
    list-style-type: none;
    min-height: 100px;
  }

  .Brick-content {
    position: absolute;
    bottom: 0;
    left: 0;
    padding: $spacer/2;
    z-index: 2;
  }

  .Brick-lowresBackgroundImage {
    display: block;
    overflow: hidden;
    &:after {
      content: ' ';
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 1;
      top: 0;
      left: 0;
      overflow: hidden;
      /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#7db9e8+0,000000+100&0+0,0.35+100 */
      background: -moz-linear-gradient(top,  rgba(125,185,232,0) 0%, rgba(0,0,0,0.35) 100%); /* FF3.6-15 */
      background: -webkit-linear-gradient(top,  rgba(125,185,232,0) 0%,rgba(0,0,0,0.35) 100%); /* Chrome10-25,Safari5.1-6 */
      background: linear-gradient(to bottom,  rgba(125,185,232,0) 0%,rgba(0,0,0,0.35) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#007db9e8', endColorstr='#59000000',GradientType=0 ); /* IE6-9 */
    }
    img {
      display: block;
      width: 100%;
      height: auto;
      transform: scale(1.1);
      transition: 0.25s 0.25s filter ease-out;
    }
  }

  .Brick-highresBackgroundImage {
    width: 100%;
    height: auto;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }

  .Brick-profileImage {
    display: block;
    width: 70px;
    height: 70px;
    border: 4px solid white;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: $spacer/3;
    &:after {
      content: "";
      clear: both;
      display: table;
    }
    > img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }

  .Brick-tagList {
    padding-top: 0;
    list-style-type: none;
    & li {
      margin-left: 0;
      padding-bottom: 0;
      display: inline-block;
      font-size: 0.88rem;
      white-space: pre;
    }
  }

</style>
