<template>
  <div
    class="RichText2"
    :class="{
      'u-textAlignCenter' : blok.alignment == 'center',
      'u-textAlignRight' : blok.alignment == 'right'
    }"
    v-editable="blok">
    <div class="RichText2__content" v-html="richtext"></div>
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
      richtext() {
        return this.blok.text ? this.$storyapi.richTextResolver.render(this.blok.text) : ''
      }
    },
    mounted() {
      console.log(this.$storyapi.richTextResolver)
    },
  }
</script>

<style lang="scss">
.RichText2 {
  h1, h2, h3, h4, h5, h6, p {
    color: color('textDark');
    padding: 0;
    line-height: 1;

    &:last-child {
      padding-bottom: 30px;
    }
  }

  h1, h2, h3, h4 {
    font-family: $font-primary;
  }

  p, h5, h6 {
    font-family: $font-primary;
  }

  h1 {
    font-size: 54px;
  }

  h2 {
    font-size: 40px;
  }

  h3 {
    font-size: 28px;
  }

  h4 {
    font-size: 24px;
  }

  h5, h6 {
    font-size: 20px;
  }

  p {
    font-size: 16px;

    &:not(:first-child) {
      padding-top: 20px;
    }
  }

  .text--secondary {
    color: color('secondaryColor');
  }

  .text--primary {
    color: color('primaryColor');
  }

  .text--light {
    color: color('textLight');
  }
}
</style>