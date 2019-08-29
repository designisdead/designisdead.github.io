<template>
  <div class="search-bar__main-container">
    <!-- <div class="search-bar__tags-container">
      <span
        v-for="tag in tags"
        :key="tag.value"
        class="search-bar__single-tag"
        :class="{ 'search-bar__selected-tag': tag.active }"
        @click="tag.active = !tag.active; tagToSelected(tag)"
      >
        <span v-if="tag.taggings_count > 0">
          {{ tag.name }}
          <span v-if="tag.active">
            <img
              src="/close.svg"
              alt="Cancel icon"
              width="10px"
              style="vertical-align: baseline;">
          </span>
        </span>
      </span>
    </div> -->

    <form
      @submit="search"
      class="search-bar__search-form"
      autocomplete="off">
      <input
        type="text"
        @keyup="search"
        v-model="searchInput"
        required
        name="searchInput"
        class="search-bar__search-input">

      <span
        class="search-bar__tag-filter-container">
        <span
          class="search-bar__tag-filter-open-btn"
          @click="openTagFilter()">
          All blogs &#9662;
        </span>

        <div
          v-if="tagFilterOpened"
          class="search-bar__tag-filter-box">
          <p style="border-bottom: 1px solid #999; padding-bottom: 0; color: #999">Tags</p>
          <ul>
            <li v-for="tag in tags" :key="tag.value">{{ tag.name }}</li>
          </ul>
        </div>
      </span>

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
import moment from 'moment'

export default {
  props: {
    searchType: String,
    posts: {
      type: Array,
      default: () => {}
    }
  },
  data() {
    return {
      publicToken: 'O2r6aDSsF6m26lYt5NNMzQtt',
      tags: [],
      searchInput: '',
      selectedTags: [],
      timer: null,
      tagFilterOpened: false
    }
  },
  methods: {
    search(e) {
      e.preventDefault()
      clearTimeout(this.timer)
      this.timer = setTimeout(()=> {
        this.$emit('emitSearchFields', this.searchInput, this.tagArrToString(this.selectedTags))
      }, 500)
    },
    tagToSelected(tag) {
      tag.active ? this.selectedTags.push(tag) : this.selectedTags = this.selectedTags.filter(currentTag => currentTag !== tag)
      this.$emit('emitSearchFields', this.searchInput, this.tagArrToString(this.selectedTags))
    },
    tagArrToString(tags) {
      return tags.map(tag => tag.name).toString()
    },
    openTagFilter() {
      console.log(this.tagFilterOpened)
      this.tagFilterOpened = !this.tagFilterOpened
    }
  },
  mounted() {
    this.$storyapi.get(`cdn/tags`, {
      version: this.$store.state.settings.version,
      cv: this.$store.state.settings.cacheVersion,
    })
    .then(res => this.tags = res.data.tags.map(tag => { return { name: tag.name, active: false, taggings_count: tag.taggings_count }}))
    .catch(err => console.log(err))

    let prevScrollpos = window.pageYOffset
      window.onscroll = () => {
        var currentScrollPos = window.pageYOffset
        if (prevScrollpos > currentScrollPos) {
          document.querySelector('.search-bar__main-container').style.top = "70px"
        } else {
          document.querySelector('.search-bar__main-container').style.top = "-24px"
          this.tagFilterOpened = false
        }
        prevScrollpos = currentScrollPos
      }
  }
}
</script>

<style lang="scss">
  .search-bar__main-container {
    position: fixed;
    z-index: 2;
    background: #fff;
    width: 100%;
    top: 70px;
    left: 0;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
    padding: 16px 20px;
    transition: top 0.4s;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    flex-direction: row;
  }

  .search-bar__search-form {
    position: relative;
    display: flex;
    width: 600px;
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
        top: -4px;
        font-size: $font-size / 1.4;
      }
      ~ .search-bar__submit-button {
        border-bottom: 2px solid color('secondary');
      }
      ~ .search-bar__tag-filter-container {
        border-bottom: 2px solid color('secondary');
      }
    }
  }

  .search-bar__tag-filter-container {
    position: relative;
    display: flex;
    align-items: center;
    border-bottom: 2px solid #BBB;
  }

  .search-bar__tag-filter-open-btn {
    cursor: pointer;
    user-select: none;
    font-size: 12px;
    padding-right: 16px;
    white-space: nowrap;
  }

  .search-bar__tag-filter-box {
    position: absolute;
    top: 44px;
    // Half the parent div's width
    left: 38px;
    transform: translate(-50%, 0);
    background: white;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
    // box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.05);
    border-radius: 3px;
    width: 200px;
    // height: auto;
    padding: 14px;
  }

  .search-bar__tag-filter-box:before {
    content: "";
    width: 0px;
    height: 0px;
    position: absolute;
    top: -20px;
    left: 45%;
    border-top: 10px solid transparent;
    border-bottom: 10px solid white;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
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
