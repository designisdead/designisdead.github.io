<template>
  <div
    class="contact-modal--content">
    <img
      src="/close-icon-contact-form.svg"
      alt="Close form"
      width="30px"
      class="contact-modal--close"
      @click="closeContactModal">

    <div class="_form_10"></div><script src="https://designisdead.activehosted.com/f/embed.php?id=10" type="text/javascript" charset="utf-8"></script>

    <!-- Infos box -->
    <div class="contact-modal--infos">
      <div class="contact-modal--infos--sub">
        <img
          src="/location-icon.svg"
          alt="Location icon"
          width="20px"
          height="20px"
          class="contact-modal--infos--icon">
        <div class="contact-modal--infos--text">
          <h4><b>Address</b></h4>
          <p>Rue Middelbourg 64 B</p>
          <p>1170 Brussels, Belgium</p>
        </div>
      </div>
      <div class="contact-modal--infos--sub">
        <img
          src="/envelope.svg"
          alt="Mail icon"
          width="20px"
          height="20px"
          class="contact-modal--infos--icon">
        <div class="contact-modal--infos--text">
          <h4><b>General Support</b></h4>
          <p><a href="mailto:info@designisdead.com" target="_blank">info@designisdead.com</a></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closeContactModal() {
      this.$emit('closeContactModal')
    }
  }
}
</script>

<style lang="scss">
.contact-modal--content {
  margin: 40px auto;
  padding: 20px;
  max-width: 600px;
}

.contact-modal--close {
  position: absolute;
  box-sizing: content-box;
  top: 72px;
  right: 60px;
  border-radius: 50%;
  border: 3px solid #DDD;
  padding: 6px;
  &:hover {
    cursor: pointer;
    transform: scale(1.1)
  }
}

.contact-modal--infos {
  color: white;
  margin-top: 40px;
  padding: 50px 10px;
  border-radius: 4px;
  border: 1px solid white;
  background: linear-gradient(
    rgba(0, 0, 0, 0.8),
    rgba(0, 0, 0, 0.8)
  ), url("/contact-modal-infos-bg.jpg");
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.contact-modal--infos--sub {
  display: flex;
  flex-direction: row;
  // flex: .5;
  // display: block;
}

.contact-modal--infos--icon {
  margin-right: 10px;
}

.contact-modal--infos--text p {
  color: #AAA;
  font-size: 14px;
  padding-bottom: 2px;
}

.contact-modal--infos--text a {
  color: #AAA;
  font-size: 14px;
}

@media screen and (max-width: size('medium')) {
  .contact-modal--content {
    margin: 28px auto;
  }

  .contact-modal--close {
    top: 20px;
    right: 20px;
    width: 20px;
  }

  .contact-modal--infos {
    flex-direction: column;
    align-items: center;
  }

  .contact-modal--infos--sub:nth-child(1) {
    margin-bottom: 40px;
  }
}

@media screen and (min-width: size('large')) {
  .contact-modal--close {
    right: 120px;
  }
}

// @media screen and (max-width: size('huge')) {
//   .contact-modal--close {
//     right: 120px;
//   }
// }

@media screen and (min-width: 1600px) {
  .contact-modal--close {
    right: 200px;
  }
}



</style>
