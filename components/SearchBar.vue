<template>
  <div class="search-bar__main-container">
    <form
      @submit="search"
      class="search-bar__search-form"
      autocomplete="off">
      <input
        type="text"
        @keyup="search"
        @click="startTyping()"
        v-model="searchInput"
        required
        name="searchInput"
        class="search-bar__search-input">

      <span
        class="search-bar__tag-filter-container">
        <span
          class="search-bar__tag-filter-open-btn"
          @click="openTagFilter()">
          {{ displaySelectedTags }} &#9662;
        </span>

        <transition name="slide-fade">
          <div
            v-if="tagFilterOpened"
            class="search-bar__tag-filter-box">
            <p class="search-bar__tag-filter-box__header">
              <span>Tags</span>
              <img
                src="/close-grey-icon.svg"
                alt="Close menu icon"
                width="12px;"
                class="search-bar__tag-filter-box__header__close"
                @click="openTagFilter()">
            </p>
            <ul class="search-bar__tag-list">
              <li
                v-for="tag in tags"
                :key="tag.value"
                class="search-bar__tag-list-item">
                <input
                  class="search-bar__tag-list-item__checkbox"
                  type="checkbox"
                  :value="tag.name"
                  v-model="selectedTags"
                  @change="tagToSelected()">
                <span>{{ tag.name }}</span>
              </li>
            </ul>
            <p
              class="search-bar__tag-filter-box__reset-filter">
              <img
                src="/trash-icon.svg"
                alt="Trash icon"
                width="18"
                style="margin-right: 6px; cursor: pointer;"
                @click="resetSelectedTags()">
              <span
                style="line-height: 14px; cursor: pointer;"
                @click="resetSelectedTags()">
                Clear filters
              </span>
            </p>
          </div>
        </transition>
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
    tagArrToString(tags) {
      return tags.map(tag => tag).toString()
    },
    openTagFilter() {
      this.tagFilterOpened = !this.tagFilterOpened
      if (window.innerWidth < 800) {
        this.tagFilterOpened ? (
          document.querySelector('body').style.overflowY = 'hidden',
          document.querySelector('html').style.overflowY = 'hidden'
        ) : (
          document.querySelector('body').style.overflowY = 'auto',
          document.querySelector('body').style.overflowY = 'auto'
        )
      }
    },
    startTyping() {
      this.tagFilterOpened = false;
      document.querySelector('body').style.overflowY = 'auto'
    },
    resetSelectedTags() {
      this.selectedTags = []
      this.openTagFilter()
      this.$emit('emitSearchFields', this.searchInput, this.tagArrToString(this.selectedTags))
    },
    tagToSelected() {
      this.$emit('emitSearchFields', this.searchInput, this.tagArrToString(this.selectedTags))
    }
  },
  computed: {
    displaySelectedTags() {
      if (this.selectedTags.length === 0) {
        return 'All blogs'
      } else if (this.selectedTags.length === 1) {
        return this.selectedTags[0]
      } else if (this.selectedTags.length === 2) {
        return this.selectedTags[0] + ', ' + this.selectedTags[1]
      } else {
        return this.selectedTags[0] + ', ' + this.selectedTags[1] + ', ...'
      }
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
  .slide-fade-enter-active, .slide-fade-leave-active {
    transition: all .5s ease;
  }
  /* .slide-fade-leave-active below version 2.1.8 */
  .slide-fade-enter, .slide-fade-leave-to {
    // transform: translateX(350px);
    opacity: 0;
  }

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
    color: black;
    &:required {
      box-shadow:none;
    }
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
    right: -80px;
    background: white;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
    border-radius: 3px;
    min-width: 200px;
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

  .search-bar__tag-filter-box__header {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #BBB;
    padding-bottom: 4px;
    color: #999;
  }

  .search-bar__tag-filter-box__header__close {
    cursor: pointer;
  }

  .search-bar__tag-list {
    list-style: none;
    padding-top: 16px;
    max-height: 250px;
    overflow-y: auto;
  }

  .search-bar__tag-list-item {
    margin: 0;
    padding-bottom: 16px;
    display: flex;
    align-items: center;
  }

  .search-bar__tag-list-item__checkbox {
    cursor: pointer;
    align-self: flex-start;
    margin-right: 10px;
    -webkit-appearance: none;
    background-color: #fafafa;
    border: 1px solid #cacece;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px -15px 10px -12px rgba(0,0,0,0.05);
    padding: 9px;
    border-radius: 3px;
    display: inline-block;
    position: relative;
  }

  .search-bar__tag-list-item__checkbox:active, .search-bar__tag-list-item__checkbox:checked:active {
	  box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px 1px 3px rgba(0,0,0,0.1);
  }

  .search-bar__tag-list-item__checkbox:checked {
    border: 1px solid #adb8c0;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px -15px 10px -12px rgba(0,0,0,0.05), inset 15px 10px -12px rgba(255,255,255,0.1);
    color: #99a1a7;
  }

  .search-bar__tag-list-item__checkbox:checked:after {
    content: '\2714';
    font-size: 16px;
    position: absolute;
    top: 0px;
    left: 2px;
    color: #919191;
  }

  .search-bar__tag-filter-box__reset-filter {
    user-select: none;
    border-top: 1px solid #BBB;
    padding: 8px 0 0 0;
    color: #999;
    display: flex;
    align-items: flex-end;
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

  @media screen and (max-width: size('medium') - 1) {
    .search-bar__main-container {
      height: 90px;
    }

    .search-bar__tags-container {
      justify-content: flex-start;
    }

    .search-bar__search-form {
      margin-bottom: 14px;
      top: -12px;
    }

    .search-bar__tag-filter-container {
      position: absolute;
      top: 50px;
      border: none;
    }

    .search-bar__search-input {
      &:focus,
      &:valid {
        ~ .search-bar__tag-filter-container {
          border-bottom: none;
        }
      }
    }

    .search-bar__tag-filter-box {
      position: fixed;
      width: 100%;
      left: 0;
      right: 0;
      bottom: 0;
      top: auto;
      border-radius: 0;
      border-top: 2px solid #999;
      padding: 0;
    }

    .search-bar__tag-filter-box:before {
      border: none;
    }

    .search-bar__tag-filter-box__header {
      position: fixed;
      z-index: 1;
      background: #FFF;
      width: 100%;
      left: 0;
      padding: 8px 20px 4px 20px;
    }

    .search-bar__tag-list {
      margin: 37px 0;
      padding: 16px 0 0 20px;
    }

    .search-bar__tag-filter-box__reset-filter {
      position: fixed;
      z-index: 1;
      background: #FFF;
      width: 100%;
      left: 0;
      bottom: 0;
      padding: 10px 20px;
    }

    .slide-fade-enter-active, .slide-fade-leave-active {
      transition: all .5s ease;
    }
    /* .slide-fade-leave-active below version 2.1.8 */
    .slide-fade-enter, .slide-fade-leave-to {
      transform: translateY(300px);
      opacity: 1;
    }
  }
</style>
