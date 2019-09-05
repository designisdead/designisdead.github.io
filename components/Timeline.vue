<template>
  <div class="timeline--container">
    <ul
      class="timeline--ulist"
      v-if="listContent.length > 0">
      <h3
        v-if="futurEvents.length > 0"
        class="timeline--ulist--subtitle">
        Upcoming events
      </h3>
      <eventcard
        v-for="post in futurEvents"
        :key="post.full_slug"
        :post="post"
      ></eventcard>

      <h3
        v-if="pastEvents.length > 0"
        class="timeline--ulist--subtitle">
        Past events
      </h3>
      <eventcard
        v-for="post in pastEvents"
        :key="post.full_slug"
        :post="post"
      ></eventcard>
    </ul>
    <div
      v-else
      class="timeline--no-match-found">
      <h2>
        Sorry, no events were found that match the specified selection criteria...
      </h2>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    listContent: Array
  },
  // data() {
  //   return {
  //     futurEvents: [],
  //     pastEvents: []
  //   }
  // },
  computed: {
    futurEvents() {
      let futurEvents = []
      this.listContent.forEach(event => new Date() <= new Date(event.content.date) ? futurEvents.push(event) : null)
      return futurEvents.reverse()
    },
    pastEvents() {
      let pastEvents = []
      this.listContent.forEach(event => new Date() > new Date(event.content.date) ? pastEvents.push(event) : null)
      return pastEvents
    }
  },
  // watch: {
  //   listContent: function(val) {
  //     console.log(val)
  //     this.futurEvents = []
  //     this.pastEvents = []
  //     val.forEach(event => new Date() > new Date(event.content.date) ? this.pastEvents.push(event) : this.futurEvents.push(event))
  //     this.futurEvents = this.futurEvents.reverse()
  //   }
  // }
}
</script>

<style lang="scss">
  .timeline--ulist {
    list-style: none;
    position: relative;
    margin-left: 240px;
  }

  /* Dashed line on the left */
  .timeline--ulist:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    border: 1px dashed #BBB;
  }

  .timeline--ulist--subtitle {
    text-align: right;
    color: #999;
  }

  .timeline--no-match-found {
    text-align: center;
    height: 42vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media screen and (max-width: size('medium')) {
    .timeline--ulist {
      margin-left: 0;
    }
  }

</style>
