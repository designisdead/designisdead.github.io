<template>
  <div class="timeline--container">
    <ul
      class="timeline--ulist"
      v-if="listContent.length > 0">
      <eventcard
        v-for="post in sortedList"
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
  computed: {
    sortedList() {
      let sorted = JSON.parse(JSON.stringify(this.listContent))

      return sorted.sort((a, b) => {
        console.log(new Date(b.content.date), new Date(a.content.date))
        return new Date(b.content.date) > new Date() ? new Date(b.content.date) - new Date(a.content.date) : null
      })

      // return sorted.sort((a, b) => {
      //   return new Date(a.content.date).getTime() > Date.now() ? (
      //     b - a
      //   ) : null
      // })
    }
  },
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
