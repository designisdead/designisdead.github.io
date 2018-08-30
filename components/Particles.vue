<template>
  <div class="Particles">
    <vue-particles
      color="#ffffff"
      :particleOpacity="0.3"
      :particlesNumber="150"
      shapeType="circle"
      :particleSize="5"
      linesColor="#ffffff"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.2"
      :linesDistance="150"
      :moveSpeed="2"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    >
    </vue-particles>
  </div>
</template>

<script>
  /*
  import Vue from 'vue';
  const VueParticles = require('vue-particles');
  Vue.use(VueParticles)
  */
</script>

<style>
  .Particles {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: linear-gradient(135deg, #05081c 1%, #2f6572 100%);
  }


</style>
