<template>
  <span class="Author" rel="author">
    {{ Author.name }}
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
