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
  }
</script>

<style lang="scss">
.RichText2 {
  h1, h2, h3, h4, h5, h6, p, ul, ol, li {
    color: color('textDark');
    padding: 0;
    line-height: 1;

    &:last-child:not(li) {
      padding-bottom: 30px;
    }
  }

  h1, h2, h3, h4 {
    font-family: $font-primary;
    text-transform: uppercase;
  }

  p, h5, h6, ul, ol {
    font-family: $font-primary;

    &:not(:first-child) {
      padding-top: 20px;
    }

    & + h1, + h2, + h3, + h4 {
      padding-top: 30px;
    }
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
  }

  li {
    & p {
      padding-bottom: 12px!important;
    }

    &:last-child p {
      padding-bottom: 0!important;
    }
  }

  a {
    text-decoration: underline;
    color: color('secondaryColor');
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

  @media screen and (max-width: size('smedium')) {
    h1, h2 {
      font-size: 37px;
    }
  }
}
</style>