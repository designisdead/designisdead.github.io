<template>
  <div class="Spinner" :class="{'Spinner--loading': loading}">
    <slot></slot>
    <no-ssr>
      <div class="Spinner-wrapper">
        <div class="Spinner-overlay" v-if="loading"></div>
        <div class="Spinner-icon" v-if="loading"></div>
      </div>
    </no-ssr>
  </div>
</template>

<script>
  export default {
    props: {
      loading: {
        type: Boolean,
        require: true
      }
    }
  }
</script>

<style lang="scss">
  .Spinner {
    position: relative;
  }

  .Spinner--loading {
    min-height: 200px;
  }

  .Spinner-overlay {
    background: white;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  .Spinner-icon {
    position: absolute;
    width: 40px;
    height: 40px;
    background-color: color('dark');

    top: 50%;
    left: 50%;

    margin-top: -20px;
    margin-left: -20px;

    -webkit-animation: spinner 1s infinite ease-in-out;
    animation: spinner 1s infinite ease-in-out;
  }

  @keyframes spinner {
    0% {
      transform: perspective(120px) rotateX(0deg) rotateY(0deg);
    }
    50% {
      transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
    }
    100% {
      transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
    }
  }
</style>
