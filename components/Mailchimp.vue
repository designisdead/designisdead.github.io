<template>
  <div class="center">
    <a href="#" class="Button" :class="[blok.style]" @click="openMailchimpPopup">{{blok.text}}</a>
  </div>
</template>

<script>
import cookies from "js-cookie";
export default {
  props: {
    blok: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  mounted() {
    this.setupMailchimpPopup();
  },
  methods: {
    setupMailchimpPopup() {
      const chimpLoader = window.document.createElement("script");
      chimpLoader.type = "text/javascript";
      chimpLoader.src =
        "https://s3.amazonaws.com/downloads.mailchimp.com/js/signup-forms/popup/unique-methods/embed.js";
      chimpLoader.setAttribute(
        "data-dojo-config",
        "usePlainJson: true, isDebug: false"
      );
      window.document.body.appendChild(chimpLoader);
    },
    openMailchimpPopup(e) {
      e.preventDefault();
      if (cookies.get("MCPopupSubscribed") === "yes") {
        window.open(this.blok.content_target.url).focus();
      }
      if (cookies.get("MCPopupClosed")) {
        cookies.remove("MCPopupClosed");
      }
      const chimpOptions = {
        baseUrl: this.blok.base_url,
        uuid: this.blok.uuid,
        lid: this.blok.list_id,
        uniqueMethods: true
      };
      window.dojoRequire(["mojo/signup-forms/Loader"], function(L) {
        L.start(chimpOptions);
      });
    }
  }
};
</script>

<style>
.center {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>