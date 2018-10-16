<template>
  <div class="Page-footer">
    <wrapper size="large">
      <div class="Footer">
        <div class="Footer-left">
          <a
            href="https://twitter.com/designisdead"
            class="u-color--twitter">
            <icon type="twitter" />
          </a>
          &nbsp;
          <a
            href="https://www.facebook.com/DesignisDead/"
            class="u-color--facebook">
            <icon type="facebook" />
          </a>
          &nbsp;
          <a
            href="https://www.linkedin.com/company/design-is-dead"
            class="u-color--linkedin">
            <icon type="linkedin" />
          </a>
        </div>
        <div class="Footer-right">
          <span class="Footer-copyright">
            <nuxt-link to="/cookie-policy">Cookie policy</nuxt-link> -
            <nuxt-link to="/privacy-policy">Privacy policy</nuxt-link> &nbsp;
            &copy; {{ year }}
          </span>
          &nbsp;
          <span class="Footer-knuckles"><icon type="knuckles" /></span>
        </div>
      </div>
    </wrapper>
  </div>
</template>

<script>
  export default {
    computed: {
      year() {
        return new Date().getFullYear();
      }
    }
  }
</script>
