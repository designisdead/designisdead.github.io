<template>
  <div>
    <a
      href="/contact-us"
      :class="[blok.style]"
      class="Button"
      @click="toggleContactModal($event)"
      >
      {{ blok.text }}
    </a>
  </div>
</template>

<script>
  export default {
    props: {
      blok: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    methods: {
      toggleContactModal(event) {
        event.preventDefault();
        document.dispatchEvent(new Event('toggleContactModal'));
      }
    }
  }
</script>
