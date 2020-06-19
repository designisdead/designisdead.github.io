<template>
  <div class="search-bar__main-container">
    <div class="search-bar__form-wrapper">
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

        <span class="search-bar__reset-tags-container" v-if="this.selectedTags.length > 0">
          <svg class="search-bar__reset-tags-icon" xmlns="http://www.w3.org/2000/svg" width=20 height=20 @click="resetSelectedTags()">
            <path d="M17 2h-3.5l-1-1h-5l-1 1H3v2h14zM4 17a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V5H4z"/>
          </svg>
          <span
            class="search-bar__reset-tags-label"
            @click="resetSelectedTags()">
            Clear filters
          </span>
        </span>

        <span
          :class="['search-bar__tag-filter-container', tagFilterOpened && 'u-backgroundColor--primaryColorLighten1']">
          <span
            :class="['search-bar__tag-filter-open-btn', tagFilterOpened && 'u-color--textLight']"
            @click="openTagFilter()">
            {{ displaySelectedTags }} <span :class="tagFilterOpened && 'u-rotate--180'">&#9662;</span>
          </span>
        </span>

        <transition name="slide-fade">
          <div
            v-if="tagFilterOpened"
            class="search-bar__tag-filter-box">
            <ul class="search-bar__tag-list">
              <li
                v-for="tag in tags"
                :key="tag.value"
                class="search-bar__tag-list-item">
                <label class="search-bar__tag-list-item__checkbox-wrapper">
                  <input
                  class="search-bar__tag-list-item__checkbox"
                  type="checkbox"
                  :value="tag.name"
                  v-model="selectedTags"
                  @change="tagToSelected()">
                  <span class="checkmark"></span>
                </label>
                <span class="search-bar__tag-list-item__tag-name">{{ tag.name }}</span>
              </li>
            </ul>
          </div>
        </transition>

        <label
          for="searchInput"
          class="search-bar__search-input-label">What {{ searchType }} are you looking for ?</label>
        <button
          type="submit"
          class="search-bar__submit-button"
        >
          <img src="/search-icon.svg" alt="submit icon" width="18px">
        </button>
      </form>
    </div>
  </div>
</template>

<script>
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
      tagFilterOpened: false,
      prevScrollpos: 0
    }
  },
  methods: {
    search(e) {
      e.preventDefault()
      window.scrollTo({top: 0, behavior: 'smooth'})
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.$emit('emitSearchFields', this.searchInput, this.tagArrToString(this.selectedTags))
      }, 500)
    },
    tagArrToString(tags) {
      return tags.map(tag => tag).toString()
    },
    openTagFilter() {
      this.tagFilterOpened = !this.tagFilterOpened
      // Prevent overflow when tags are open
      // if (window.innerWidth < 800) {
      //   const body = document.querySelector('body')
      //   const html = document.querySelector('html')
      //   this.tagFilterOpened ? (
      //     body.style.overflow = 'hidden',
      //     body.style.height = '100%',
      //     html.style.overflow = 'hidden',
      //     html.style.height = '100%'
      //   ) : (
      //     body.style.overflow = 'auto',
      //     body.style.height = 'auto',
      //     html.style.overflow = 'auto',
      //     html.style.height = 'auto'
      //   )
      // }
    },
    startTyping() {
      const body = document.querySelector('body')
      const html = document.querySelector('html')
      this.tagFilterOpened = false;
      body.style.overflow = 'auto'
      body.style.height = 'auto'
      html.style.overflow = 'auto'
      html.style.height = 'auto'
    },
    resetSelectedTags() {
      this.selectedTags = []
      this.openTagFilter()
      window.scrollTo({top: 0, behavior: 'smooth'})
      this.$emit('emitSearchFields', this.searchInput, this.tagArrToString(this.selectedTags))
    },
    tagToSelected() {
      window.scrollTo({top: 0, behavior: 'smooth'})
      this.$emit('emitSearchFields', this.searchInput, this.tagArrToString(this.selectedTags))
    },
    scrollEvent() {
      let currentScrollPos = window.pageYOffset
      let searchBarMainContainer = document.querySelector('.search-bar__main-container')
      if (window.innerWidth > 800) this.tagFilterOpened = false
      if (window.pageYOffset <= 32) {
        searchBarMainContainer.style.top = "30px"
      } else {
        if (this.prevScrollpos > currentScrollPos) {
          searchBarMainContainer.style.opacity = "1"
          if (this.currentScrollPos <= 120 && window.innerWidth > 480) {
            searchBarMainContainer.style.top = "-10px"
          } else {
            searchBarMainContainer.style.top = "30px"
          }
        } else {
          searchBarMainContainer.style.top = "-164px"
          searchBarMainContainer.style.opacity = "0"
        }
      }
      this.prevScrollpos = currentScrollPos
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

    window.addEventListener('scroll', this.scrollEvent)
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollEvent)
  }
}
</script>

<style lang="scss">
  .slide-fade-enter-active, .slide-fade-leave-active {
    transition: all .5s ease;
  }
  /* .slide-fade-leave-active below version 2.1.8 */
  .slide-fade-enter, .slide-fade-leave-to {
    opacity: 0;
  }

  .search-bar__main-container {
    position: fixed;
    z-index: 2;
    background-color: color('primaryColor');
    width: calc(100vw - 100px);
    margin: 0 50px;
    top: 30px;
    left: 0;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
    transition: top 0.4s, opacity 0.4s cubic-bezier(0,1.11,.44,1);

    &:before {
      content: '';
      display: block;
      width: 100%;
      height: 30px;
      background-color: color('primaryColor');
    }
  }

  .search-bar__form-wrapper {
    padding: 22px 18px;
    background-color: color('primaryColorLighten1');

    @media screen and (min-width: size('huge')) {
      padding: 22px 88px;
    }
  }

  .search-bar__search-form {
    position: relative;
    display: flex;
    width: 100%;
    height: 44px;
    background-color: color('light');
  }

  .search-bar__search-input-label {
    color: color('medium');
    font-size: $font-size / 1.3;
    font-weight: normal;
    pointer-events: none;
    position: absolute;
    top: 16px;
    left: 14px;
    transition: .2s;
  }

  .search-bar__search-input {
    position: relative;
    width: 100%;
    padding: 10px 14px;
    background-color: transparent;
    border: none;
    outline: none;
    color: color('primaryColor');
    font-size: 16px;
    &:required {
      box-shadow:none;
    }
    &:focus,
    &:valid {
      ~ .search-bar__search-input-label {
        color: color('primaryColor');
        top: 2px;
        font-size: 10px;
      }
    }
  }

  .search-bar__reset-tags-container {
    position: relative;
    display: flex;
    align-items: center;
    color: color('medium');
    font-size: $font-size / 1.3;
    font-weight: normal;
    white-space: nowrap;
    cursor: pointer;
    margin-right: 16px;
  }

  .search-bar__reset-tags-icon {
    transform: scale(0.65, 0.65);
    margin-right: 2px;
    fill: color('medium');
  }

  .search-bar__tag-filter-container {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 16px;
  }

  .search-bar__tag-filter-open-btn {
    cursor: pointer;
    user-select: none;
    color: color('primaryColor');
    font-size: 16px;
    white-space: nowrap;

    span {
      display: inline-block;
    }
  }

  .search-bar__tag-filter-box {
    position: absolute;
    top: 44px;
    left: 0;
    background: color('light');
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    padding: 16px;
  }

  .search-bar__tag-list {
    list-style: none;
    padding: 16px 140px 0 40px;
    -webkit-overflow-scrolling: touch;
    display: flex;
    flex-wrap: wrap;
  }

  .search-bar__tag-list-item {
    width: 25%;
    margin: 0;
    padding-bottom: 16px;
    padding-right: 6px;
    display: flex;
    align-items: center;
    line-height: 1;
  }

  .search-bar__tag-list-item__checkbox-wrapper {
    position: relative;
    align-self: center;
    display: block;
    margin-right: 8px;
    width: 16px;
    height: 16px;

    .search-bar__tag-list-item__checkbox {
      opacity: 0;
      height: 0;
      width: 0;

      &:checked ~ .checkmark:after {
        display: block;
      }
    }

    .checkmark {
      position: absolute;
      top: 0;
      left: 0;
      height: 16px;
      width: 16px;
      background-color: transparent;
      border: 1px solid color('primaryColor');
      cursor: pointer;

      &:after {
        content: "";
        position: absolute;
        display: none;
        left: 4px;
        top: 1px;
        width: 5px;
        height: 10px;
        border: solid color('primaryColor');
        border-width: 0 2px 2px 0;
        border-radius: 3px;
        transform: rotate(45deg);
      }
    }
  }

  .search-bar__tag-list-item__tag-name {
    font-size: 16px;
    color: color('primaryColor');
    text-transform: capitalize;
  }

  .search-bar__submit-button {
    outline: none;
    cursor: pointer;
    height: auto;
    vertical-align: bottom;
    display: flex;
    align-items: center;
    padding: 0 16px;
    display: flex;
    justify-content: center;
    background-color: color('primaryColor');
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

  @media screen and (max-width: size('smedium')) {
    .search-bar__main-container {
      margin: 0;
      width: 100%;
    }

    .search-bar__tags-container {
      justify-content: flex-start;
    }

    .search-bar__search-form {
      width: 100%;
      margin-bottom: 14px;
      top: -5px;
    }

    .search-bar__tag-filter-container {
      position: absolute;
      top: 58px;
      padding: 0;
      border: none;
    }

    .search-bar__tag-filter-open-btn {
      color: color(light);
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
      top: 85px;
      left: -20px;
      width: calc(100% + 40px);
      padding: 20px 18px;
    }

    .search-bar__tag-filter-box:before {
      border: none;
    }

    .search-bar__tag-list {
      padding: 0;
    }

    .search-bar__tag-list-item {
      width: 50%;
    }

    .search-bar__tag-filter-box__reset-filter {
      position: fixed;
      display: flex;
      align-items: center;
      z-index: 1;
      background: #FFF;
      width: 100%;
      height: 40px;
      left: 0;
      bottom: 0;
      padding: 10px 20px;
    }

    .slide-fade-enter-active, .slide-fade-leave-active {
      opacity: 1;
    }
    /* .slide-fade-leave-active below version 2.1.8 */
    .slide-fade-enter, .slide-fade-leave-to {
      opacity: 1;
    }
  }

  @media screen and (min-width: size('smedium')) {
    .search-bar__tag-list-item {
      width: 50%;
    }
  }

  @media screen and (min-width: size('medium')) {
    .search-bar__tag-list-item {
      width: 25%;
    }
  }

  @media screen and (min-width: size('large')) {
    .search-bar__tag-list-item {
      width: 20%;
    }
  }

  @media screen and (min-width: size(huge) + 100px) {
    .search-bar__main-container {
      margin: 0;
      max-width: size(huge);
      left: 50%;
      margin-left: -700px;
    }
  }
</style>
