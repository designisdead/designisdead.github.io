<template>
  <span class="Author" rel="author">
    <span class="Author-avatar">
      <img v-lazy="$options.filters.imageApi(Author.content.secondaryimage, 'tiny')" />
    </span>
    <span class="Author-name Title micro uppercase">{{ Author.name }}</span>
  </span>
</template>

<script>
  export default {
    props: {
      id: Number,
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
