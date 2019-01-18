<template>
  <div class="Page-footer">
    <wrapper size="large">
      <div class="Doormat">
        <div class="Doormat-contactDetails">
          <p>
            <strong>Design is Dead</strong><br>
            Rue Middelbourg 64 B<br>
            1170 Brussels, Belgium
          </p>
          <p>
            <a href="mailto:info@designisdead.com">info@designisdead.com</a><br>
            VAT: BE457.419.732
          </p>
        </div>
        <div class="Doormat-copyright">
          <p>
            <nuxt-link to="/cookie-policy">cookie policy</nuxt-link>
            -
            <nuxt-link to="/privacy-policy">privacy policy</nuxt-link>
            <br>
            &copy; {{ year }} Design is Dead
          </p>
          &nbsp;
        </div>
        <div class="Doormat-icons">
          <p>
            <a
              href="https://twitter.com/designisdead"
              target="_blank"
              rel="noopener"
              title="Visit our twitter page"
              class="u-color--twitter">
              <icon
                type="twitter"
                size="small"/>
            </a>
            &nbsp;
            <a
              href="https://www.facebook.com/DesignisDead/"
              target="_blank"
              rel="noopener"
              title="Visit our facebook page"
              class="u-color--facebook">
              <icon
                type="facebook"
                size="small"/>
            </a>
            &nbsp;
            <a
              href="https://www.linkedin.com/company/design-is-dead"
              target="_blank"
              rel="noopener"
              title="Visit our linkedin page"
              class="u-color--linkedin">
              <icon
                type="linkedin"
                size="small"/>
            </a>
          </p>
        </div><!-- .Doormat-icons -->
      </div>
    </wrapper>
  </div>
</template>

<style lang="scss">
  .Doormat {
    padding-top: 40px;
    text-align: center;
    font-size: 0.7rem;
    @media screen and (min-width: size("large")) {
      display: flex;
      padding-top: 33px;
      > div {
        flex: 1;
      }
    }
  }

  .Doormat-contactDetails {
    padding-bottom: 20px;

    strong {
      text-transform: uppercase;
    }

    @media screen and (min-width: size("large")) {
      text-align: left;
      display: flex;
      > p {
        flex: 1;
        &:last-child {
          padding-top: 17px;
        }
      }
    }
  }

  .Doormat-copyright {
    padding-bottom: 20px;
    a {
      text-decoration: underline;
      &:hover {
        text-decoration: none;
      }
    }
    @media screen and (min-width: size("large")) {
      padding-top: 17px;
    }
  }

  .Doormat-icons {
    padding-bottom: 20px;
    a {
      margin-left: 10px;
      margin-right: 10px;
    }

    @media screen and (min-width: size("large")) {
      text-align: right;
      padding-top: 22px;
      a {
        margin-right: 0;
      }
    }
  }
</style>

<script>
  export default {
    computed: {
      year() {
        return new Date().getFullYear();
      }
    }
  }
</script>
