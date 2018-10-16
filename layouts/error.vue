<template>
  <wrapper
    class="u-textAlignCenter"
    size="large"
    height="halfscreen">
    <h1>{{ error.statusCode }} - {{ error.message }}</h1>
    <p v-if="error.statusCode === 404">
      The page you were looking for was not found.
    </p>
    <nuxt-link
      to="/"
      class="Button">Home page</nuxt-link>
  </wrapper>
</template>

<script>
  export default {
    props: {
      error: {
        type: Object,
        default: function () {
          return {statusCode: 404, message: 'Unknown error'}
        }
      }
    },
    head () {
      return {
        title: this.error.statusCode + ' - ' + this.error.message,
        meta: [
          {
            name: 'viewport',
            content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no'
          }
        ]
      }
    },
  }
</script>
