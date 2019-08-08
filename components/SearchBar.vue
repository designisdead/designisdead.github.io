<template>
  <div class="search-bar__main-container">
    <div class="search-bar__tags-container">
      <span
        v-for="tag in tags"
        :key="tag.value"
        class="search-bar__single-tag"
        :class="{ 'search-bar__selected-tag': tag.active }"
        @click="tag.active = !tag.active; tagToSelected(tag)"
      >
        {{ tag.name }}
        <span v-if="tag.active">
          <img
            src="/close.svg"
            alt="Cancel icon"
            width="10px"
            style="vertical-align: baseline;">
        </span>
      </span>
    </div>

    <form
      @submit="sendSearch"
      class="search-bar__search-form"
      autocomplete="off">
      <input
        type="text"
        @keyup="sendSearch"
        v-model="searchInput"
        required
        name="searchInput"
        class="search-bar__search-input">

      <label
        for="searchInput"
        class="search-bar__search-input-label">What {{ searchType }} are you looking for ?</label>

      <button
        type="submit"
        class="search-bar__submit-button"
      >
        <img src="/search-icon.svg" alt="submit icon" width="16px">
        <span>&nbsp;Search</span>
      </button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    searchType: {
      type: String
    }
  },
  data() {
    return {
      publicToken: 'O2r6aDSsF6m26lYt5NNMzQtt',
      searchInput: '',
      tags: [],
      selectedTags: []
    }
  },
  methods: {
    // Emit to the parent the search input on each keyup or submit
    sendSearch(e) {
      e.preventDefault()
      this.$emit('sendSearchInput', this.searchInput.replace(' ', '').toLowerCase())
    },
    tagToSelected(tag) {
      tag.active ? this.selectedTags.push(tag) : this.selectedTags = this.selectedTags.filter(currentTag => currentTag !== tag)
      this.$emit('sendSelectedTags', this.selectedTags)
    }
  },
  mounted() {
    this.$storyapi.get(`cdn/datasource_entries?datasource=tags&token=${this.publicToken}`)
    .then(res => {
      console.log(res.data.datasource_entries)
      this.tags = res.data.datasource_entries.map(tag => { return { name: tag.name, value: tag.value, active: false }})
      console.log(this.tags)
    })
    .catch(err => console.log(err))
  }
}
</script>

<style lang="scss">
  .search-bar__main-container {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    flex-direction: row;
    margin-bottom: 40px;
  }

  .search-bar__search-form {
    position: relative;
    display: flex;
    width: 380px;
    height: 38px;
    margin-bottom: 5px;
  }

  .search-bar__search-input-label {
    color: #BBB;
    font-size: $font-size / 1.3;
    font-weight: normal;
    pointer-events: none;
    position: absolute;
    top: 12px;
    left: 5px;
    transition: .5s;
  }

  .search-bar__search-input {
    position: relative;
    width: 100%;
    padding: 10px 0 10px 5px;
    background-color: transparent;
    border: none;
    outline: none;
    border-bottom: 2px solid #BBB;
    border-bottom-left-radius: 5px;
    &:focus,
    &:valid {
      border-bottom: 2px solid color('secondary');
      ~ .search-bar__search-input-label {
        color: color('secondary');
        top: -12px;
        font-size: $font-size / 1.4;
      }
      ~ .search-bar__submit-button {
        border-bottom: 2px solid color('secondary');
      }
    }
  }

  .search-bar__submit-button {
    outline: none;
    cursor: pointer;
    height: auto;
    border-bottom: 2px solid #BBB;
    border-radius: 3px 3px 5px 0;
    vertical-align: bottom;
    padding: 8px 5px;
    display: flex;
    justify-content: center;
    color: #999;
    &:hover {
      background: #dddddd;
      color: color('secondary');
    }
  }

  .search-bar__tags-container {
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    max-width: 400px;
    margin-right: 20px;
  }

  .search-bar__single-tag {
    padding: 4px 10px;
    margin: 4px;
    border-radius: 8px;
    background-color: #e6e6e6;
    color: #666;
    cursor: pointer;
    user-select: none;
    &:hover {
      background-color: color('secondary');
      color: color('greyLight');
    }
  }

  .search-bar__selected-tag {
    background-color: color('secondary');
    color: color('greyLight');
  }

  @media screen and (max-width: size('small')) {
    .search-bar__search-form {
      width: 100%;
    }
  }

  @media screen and (max-width: size('medium')) {
    .search-bar__main-container {
      flex-direction: column-reverse;
      align-items: center;
    }

    .search-bar__tags-container {
      justify-content: flex-start;
    }

    .search-bar__search-form {
      margin-bottom: 14px;
    }
  }
</style>
