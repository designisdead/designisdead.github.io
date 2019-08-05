<template>
  <li v-if="post" class="timeline--ulistitem">
    <span class="timeline--ulistitem--leftline"></span>
    <h3>{{ post.content.author }}</h3>
    <p class="timeline--paragraph">{{ post.name }}</p>
    <span class="timeline--date">{{ post.content.published }}</span>
  </li>
</template>

<script>
export default {
  props: {
    post: {
      type: Object, default: function () {
        return {}
      }
    }
  },
}
</script>

<style lang="scss">
  .timeline--ulistitem {
    margin: 60px 60px;
    padding: 0;
    position: relative;
    background: white;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);
    > a:hover {
      text-decoration: none;
    }
  }

  /* solid line on the left */
  .timeline--ulistitem--leftline {
    content: '';
    position: absolute;
    top: 0;
    left: -60px;
    width: 0px;
    height: 100%;
    border: 1px solid #999;
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
    border: 2px solid #999;
  }

  .timeline--paragraph {
    padding: 0;
  }

  .timeline--date {
    position: absolute;
    left: -250px;
    top: 50%;
  }
</style>
