<template>
  <div v-editable="blok" class="u-textAlignCenter">
    <div class="TextRotator">
      <div class="TextRotator-slide">Enable Agility</div>
      <div class="TextRotator-slide">Boost Engagement</div>
      <div class="TextRotator-slide">Generate InsigHts</div>
      <div class="TextRotator-slide">Secure Growth</div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['blok']
  }
</script>

<style lang="scss">
  .TextRotator {
    font-family: 'quick_toyregular';
    margin: 0 auto;
    font-size: 100px;
    line-height: 0.8;
    color: white;
    margin-top: 15px;
    width: 300px;
    height: 160px;
    position: relative;
    transform: translateX(-20px);
    zoom: 1.1;
    @media only screen and (max-width: 480px) {
      zoom: 0.7;
    }
  }

  .TextRotator-slide {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: center;
    transform: rotateY(-90deg);
    will-change: transform, opacity;
    -webkit-animation: textrotator-visible 20s linear infinite;
    animation: textrotator-visible 20s linear infinite;
    @for $i from 1 through 10 {
      &:nth-child(#{$i}) {
        -webkit-animation-delay: (#{$i*5s - 5s});
        animation-delay: (#{$i*5s - 5s});
      }
    }
  }

  @-webkit-keyframes textrotator-visible {
    0% {
      transform: rotateY(-90deg);
      opacity: 0;
    }
    1% {
      transform: rotateY(0deg);
      opacity: 1;
    }
    24% {
      transform: rotateY(0deg);
      opacity: 1;
    }
    25% {
      transform: rotateY(-90deg);
      opacity: 0;
    }
    100% {
      transform: rotateY(-90deg);
      opacity: 0;
    }
  }

  @keyframes textrotator-visible {
    0% {
      transform: rotateY(-90deg);
      opacity: 0;
    }
    1% {
      transform: rotateY(0deg);
      opacity: 1;
    }
    24% {
      transform: rotateY(0deg);
      opacity: 1;
    }
    25% {
      transform: rotateY(-90deg);
      opacity: 0;
    }
    100% {
      transform: rotateY(-90deg);
      opacity: 0;
    }
  }
</style>
