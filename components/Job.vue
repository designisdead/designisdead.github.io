<!--
Post.vue
This component is used to render the Post content type on Storyblok
-->
<template>
  <main>
    <article>
      <wrapper 
        size="large" 
        :blok="{
          backgroundimage: '//a.storyblok.com/f/44470/2928x1602/fb173b049c/groupe-2-copie-9-3x.png', 
          backgroundposition: 'top right',
          parallax: 0.5,
          backgroundsize: 'contain'
        }">
        <header class="Job-header Wrapper halfscreen u-color--textLight">
          <div class="Job__wrapper">
            <h1 class="Job__title">{{ pagetitle }}</h1>
            <h2 class="Job__subtitle">{{ blok.metadescription }}</h2>
          </div>
      </header>
    </wrapper>

      <div
        v-editable="blok"
        class="page">
        <component
          v-for="blok in blok.body"
          :key="blok._uid"
          :blok="blok"
          :is="blok.component"/>
      </div>

      <footer>
        <wrapper 
          size="medium"
          :blok="{
            backgroundcolor: 'u-backgroundColor--textLight',
            layout: 'shrinked'
          }">
          <div
            class="Buttons"
            style="justify-content: center;">
            <vueButton
              :blok="{
                link: {
                  cached_url: '/jobs',
                  url: '/jobs'
                },
                text: 'View all jobs',
                style: 'outlinePrimary'
              }"
            />
          </div>
        </wrapper>
      </footer>

      <doormat/>
    </article>
  </main>
</template>

<script>
  export default {
    props: {
      blok: {
        type: Object,
        default: function () {
          return {};
        }
      },
      pagetitle: {
        type: String,
        default: "Design is Dead Jobs"
      }
    }
  };
</script>

<style lang="scss">
  .Job-header {
    padding-bottom: $spacer;
  }

  .Job__wrapper {
    width: 100%;
  }

  .Job__title {
    text-transform: uppercase;
    width: 40%;
  }

  .Job__subtitle {
    font-size: 16px;
    width: 40%;
  }
</style>
