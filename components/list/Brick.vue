<template>
  <article class="Brick">
    <header class="Brick-content">
      <div class="Brick-profileImage" v-if="post.content.secondaryimage">
        <img
          v-lazy="$options.filters.imageApi(post.content.secondaryimage, 'tiny')"
          alt="post.name" />
      </div>
      <h1 class="medium noSpaceBelow u-color--light">{{ post.name }}</h1>
      <h2 class="small noSpaceBelow u-color--light" v-if="post.content.jobtitle">{{ post.content.jobtitle }}</h2>
    </header>
    <div class="Brick-backgroundImage" v-if="post.content.primaryimage">
      <img class="Brick-backgroundImage"
        v-lazy="$options.filters.imageApi(post.content.primaryimage, 'large')" />
    </div>
  </article>
</template>

<script>
  export default {
    props: ['post'],
  }
</script>

<style lang="scss" scoped>

  .Brick {
    position: relative;
    padding: 0;
    margin: 0;
    list-style-type: none;
  }

  .Brick-content {
    position: absolute;
    bottom: 0;
    left: 0;
    padding: $spacer/2;
    z-index: 2;
  }

  .Brick-backgroundImage {
    &:after {
      content: ' ';
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 1;
      top: 0;
      left: 0;
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
    }
  }

  .Brick-profileImage {
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

</style>
