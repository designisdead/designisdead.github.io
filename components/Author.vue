<template>
  <span v-if="Author.content"
        class="Author"
        rel="author">
    <picture class="Author-avatar">
      <source
        :srcset="$options.filters.imageApi({src: Author.content.secondaryimage, size: 'tiny', filters: '/filters:format(webp)'})"
        type="image/webp">
      <source :srcset="$options.filters.imageApi({src: Author.content.secondaryimage, size: 'tiny'})" type="image/jpeg">
      <img
        :src="$options.filters.imageApi({src: Author.content.secondaryimage, size: 'tiny'})"
        :title="'Written by ' + Author.name"/>
    </picture>
    <span class="Author-name">{{ Author.name }}</span>
  </span>
  <span v-else></span>
</template>

<script>
  import consola from 'consola'

  export default {
    props: {
      id: {
        default: null
      },
    },
    computed: {
      Author() {
        let author = this.$store.state.employees.all.find((employee) => {
          return (employee.uuid == this.id) || (employee.id == this.id);
        });
        if (author) {
          return author
        } else {
          consola.warn('Did not find author with id:', this.id);
          return {};
        }
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
