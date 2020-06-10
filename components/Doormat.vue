<template>
  <div class="Page-footer">
    <div class="footer__did-logo-wrapper">
      <svg class="footer__did-logo" viewBox="36 22 82.5 50" preserveAspectRatio="xMaxYMin meet">
        <path
          d="M102.34,53.15a10,10,0,0,1,1.44.21l1.13.15.25,0A11.45,11.45,0,0,0,115,34l-.19-.2c-1.95-1.83.05-2.8-3.31-4s-2.61.71-5,1a10.6,10.6,0,0,0-4.1,1,3.19,3.19,0,0,1-4.33-1.43,13.54,13.54,0,0,0-4-4.44L94,25.81c-2.24-1.47-.44-2.9-4-3.5s-2.48,1.23-4.81,1.91l-.37.1-.4.12a12.8,12.8,0,0,0-4.71,2.75c-1.47,1.35-3.17,1.49-4.89-.09a11.49,11.49,0,0,0-5.68-3c-2.19-.71-1.2-2.42-4.68-1.83s-1.65,2-3.84,3.43a13.91,13.91,0,0,0-4.23,4.59c-1.31,2.2-3.41,1.69-4.48,1.3A12.49,12.49,0,0,0,48,30.79c-2.37-.28-1.61-2.2-5-1s-1.36,2.18-3.31,4l-.19.2a11.46,11.46,0,0,0,8,19.69,11.63,11.63,0,0,0,1.88-.17l.25,0c.39,0,.81-.12,1.23-.19a9.12,9.12,0,0,1,1.23-.17h.49a3.38,3.38,0,0,1,.72.1,6,6,0,0,1,4.24,4.38,8.89,8.89,0,0,1-.67,7.11,7.86,7.86,0,0,1-3.14,2.55C51.4,68.5,49.34,69.36,48,70s-.69,2.18,1,1.88a166.23,166.23,0,0,1,28-2.75A153.32,153.32,0,0,1,105.34,72c2,.47,2.38-1.15,1.23-1.78s-3.47-1.79-6-3A7.26,7.26,0,0,1,97.78,65c-1.33-1.72-1.7-4.67-.88-7.41C97.81,54.58,100.14,53,102.34,53.15ZM107,34.47a7.77,7.77,0,1,1-7.77,7.77A7.77,7.77,0,0,1,107,34.47ZM47.5,50a7.77,7.77,0,1,1,7.77-7.77A7.77,7.77,0,0,1,47.5,50ZM66.63,27.88a8.14,8.14,0,0,1,8.17,8,8,8,0,1,1-16,0A7.85,7.85,0,0,1,66.63,27.88Zm21.86,32.6c-2.17,2.91-6.69,2.87-11,2.87-4.06,0-8.5.26-11.07-2.5a11.71,11.71,0,0,1-2.5-4.66,18.45,18.45,0,0,1-.46-2.26c-.51-4.39,1.46-5.21,4.54-5.67,6-.9,6.54-3.42,9.3-3.42s3.32,2.68,9,3.38c3,.36,5.42,1.22,4.78,5.33a25.13,25.13,0,0,1-.51,2.64A12.7,12.7,0,0,1,88.49,60.48Zm-.76-16.6a8,8,0,0,1-8-8,8.15,8.15,0,0,1,8.17-8,7.85,7.85,0,0,1,7.83,8A8,8,0,0,1,87.73,43.88Z"/>
      </svg>
    </div>

    <p class="footer__did-logo-text">Design is dead</p>

    <div class="footer__details-container">
      <div class="footer__contact-container">
        <span>Rue Middelbourg 64 B 1170 Brussels, Belgium</span>
        <span><a href="mailto:info@designisdead.com">info@designisdead.com</a></span>
        <span>VAT: BE 0457.419.732</span>
      </div>
      <div class="footer__socials-container">
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
        <a
          href="https://www.instagram.com/design.is.dead/"
          target="_blank"
          rel="noopener"
          title="Visit our instagram page"
          class="u-color--instagram">
          <icon
            type="instagram"
            size="small"/>
        </a>
      </div>
    </div>

    <div class="footer__policies-banner">
      cookie policy - privacy policy - © 2020 Design is Dead
    </div>
  </div>
</template>

<style lang="scss">
  .Page-footer {
    z-index: 0;
    position: relative;
    padding-top: 80px;
  }

  .footer__did-logo-wrapper {
    display: flex;
    justify-content: center;
  }

  .footer__did-logo {
    width: 45px;
    fill: color('textLight');
  }

  .footer__did-logo-text {
    margin-top: 12px;
    padding: 0;
    text-align: center;
    text-transform: uppercase;
    color: color('textLight');
    letter-spacing: 3px;
  }

  .footer__details-container {
    padding: 20px 0 80px;
    display: flex;
    justify-content: center;
  }

  .footer__contact-container {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    text-align: right;
    color: color('textLight');
    font-size: 12px;
    padding-right: 20px;

    &:after {
      position: absolute;
      content: '';
      right: 0;
      width: 1px;
      height: 100%;
      background-color: color('textLight');
    }

    span:not(:last-child) {
      padding-bottom: 8px;
    }

    a {
      color: color('textLight');
      &:hover {
        text-decoration: none;
      }
    }
  }

  .footer__socials-container {
    padding-left: 20px;
    flex: 1;
  }

  .footer__policies-banner {
    text-align: center;
    background-color: color('primary');
    padding: 20px;
    font-size: 12px;
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
