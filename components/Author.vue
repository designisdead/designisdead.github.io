<template>
  <span
    class="Author"
    rel="author">
    <picture class="Author-avatar">
      <source :srcset="$options.filters.imageApi({src: Author.content.secondaryimage, size: 'tiny', filters: '/filters:format(webp)'})" type="image/webp">
      <source :srcset="$options.filters.imageApi({src: Author.content.secondaryimage, size: 'tiny'})" type="image/jpeg">
      <img :src="$options.filters.imageApi({src: Author.content.secondaryimage, size: 'tiny'})" >
    </picture>
    <span class="Author-name">{{ Author.name }}</span>
  </span>
</template>

<script>
  export default {
    props: {
      id: {
        type: Number,
        default: null
      },
    },
    computed: {
      Author() {
        return this.$store.state.employees.find((employee) => {
          return employee.id == this.id;
        });
      }
    }
  }
</script>

<style lang="scss">
  .Author {
    display: flex;
    align-items: center;
  }

  .Author-avatar {
    position: relative;
    display: block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 8px;
    > img {
      width: 100%;
      height: auto;
    }
  }

  .Author-name {
    padding: 0;
  }
</style>
