<template>
  <li v-if="post" class="timeline--ulistitem">
    <nuxt-link
      :key="post.full_slug"
      :to="'/' + post.full_slug"
      @mouseover.native="preloadHeader()"
      style="flex: 1;">
      <div
        v-lazy:background-image="lazyImage"
        v-if="post.content.primaryimage"
        class="timeline--ulistitem--container"
      >
        <!-- left time line on item -->
        <span class="timeline--ulistitem--leftline"></span>

        <!-- title of the event -->
        <h2 class="timeline--ulistitem--title timeline--ulistitem--text">{{ post.name }}</h2>

        <!-- location of the event -->
        <p class="timeline--ulistitem--location timeline--ulistitem--text">
          <img src="/location-icon.svg" alt="Location icon" width="16px" style="vertical-align: text-top;">
          {{ post.content.author }} // to replace with real location
        </p>

      </div>

    </nuxt-link>

    <!-- date of the event -->
    <div class="timeline--ulistitem--date">
      <b>
        <p>{{ formattedDatePart1 }}<span class="timeline--ulistitem--datecoma">,</span></p>
        <p>{{ formattedDatePart2 }}</p>
      </b>
    </div>
  </li>
</template>

<script>
import moment from 'moment'
import supportsWebP from 'supports-webp'

const filters = supportsWebP ? '/filters:format(webp)' : ''

export default {
  props: {
    post: {
      type: Object, default: function () {
        return {}
      }
    }
  },
  computed: {
    formattedDatePart1() {
      return moment(this.post.content.published).format('dddd, MMMM D')
    },
    formattedDatePart2() {
      return moment(this.post.content.published).format('YYYY')
    },
    lazyImage() {
      return this.$options.filters.imageApi({src: this.post.content.primaryimage, size: 'medium', filters: filters})
    },
  },
  methods: {
    preloadHeader() {
      let img = new Image()
      const url = this.$options.filters.imageApi({src: this.post.content.primaryimage, size: 'large', filters: filters})
      img.src = url
    }
  },
}
</script>

<style lang="scss">
  .timeline--ulistitem {
    margin: 20px 0 60px 60px;
    padding: 0;
    position: relative;
    display: flex;
    background: white;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);
    > a:hover {
      text-decoration: none;
    }
  }

  .timeline--ulistitem--container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 0;
    padding: 20px;
    width: 100%;
    height: 220px;
    background-size: cover;
    background-position: center center;
    filter: blur(15px);
    &[lazy=loaded] {
      filter: blur(0px);
    }
  }

  // darker background
  .timeline--ulistitem--container:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: block;
    background: radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.4) 20%, rgba(0,0,0,0.7) 85%);
  }

  /* solid line on the left */
  .timeline--ulistitem--leftline {
    content: '';
    position: absolute;
    top: 0;
    left: -60px;
    width: 0px;
    height: 100%;
    border: 1px solid #BBB;
  }

  /* dot on the line */
  .timeline--ulistitem--leftline:before {
    content: '';
    position: absolute;
    border-radius: 50%;
    top: 50%;
    left: -8px;
    width: 16px;
    height: 16px;
    border: 2px solid #BBB;
    background-color: #BBB;
  }

  .timeline--ulistitem--text {
    position: relative;
    z-index: 1;
    padding: 0;
    color: color('light');
    letter-spacing: 1.25px;
    text-align: center;
  }

  .timeline--ulistitem--title {
    padding-bottom: 20px;
  }

  .timeline--ulistitem--date {
    width: 212px;
    position: absolute;
    left: -320px;
    top: 42.5%;
  }

  .timeline--ulistitem--date p {
    padding: 0;
    text-align: right;
  }

  .timeline--ulistitem--datecoma {
    display: none;
  }

  @media screen and (max-width: size('medium')) {
    .timeline--ulistitem--date {
      left: 0;
      top: -25px;
    }

    .timeline--ulistitem--date p {
      text-align: left;
      display: inline-block;
    }

    // add ',' char in the date when small screen, so when date is in one line
    .timeline--ulistitem--date span {
      display: inline-block;
    }

    .timeline--ulistitem {
      margin: 20px 0 60px 24px;
    }

    .timeline--ulistitem--leftline {
      left: -24px;
    }
  }

  @media screen and (max-width: size('small')) {
    .timeline--ulistitem--container {
      padding: 10px;
    }
  }
</style>
