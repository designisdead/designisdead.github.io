import Vue from 'vue'
import Page from '~/components/Page.vue'
import Author from '~/components/Author.vue'
import Post from '~/components/Post.vue'
import Job from '~/components/Job.vue'
import Brick from '~/components/list/Brick.vue'
import Card from '~/components/list/Card.vue'
import List from '~/components/list/List.vue'
import ListTeaser from '~/components/list/ListTeaser.vue'
import UnorderedList from '~/components/list/UnorderedList.vue'
import Hero from '~/components/Hero.vue'
import Teaser from '~/components/Teaser.vue'
import RichText from '~/components/RichText.vue'
import Columns from '~/components/Columns.vue'
import Column from '~/components/Column.vue'
import Feature from '~/components/Feature.vue'
import Wrapper from '~/components/Wrapper.vue'
import Spacer from '~/components/Spacer.vue'
import ImageUpload from '~/components/ImageUpload.vue'
import Markdown from '~/components/Markdown.vue'
import Icon from '@/components/Icon';
import Spinner from '@/components/Spinner';
import Buttons from '@/components/Buttons.vue';
import Button from '@/components/Button.vue';
import VideoBackground from '@/components/VideoBackground.vue';


Vue.component('author', Author)
Vue.component('icon', Icon)
Vue.component('post', Post)
Vue.component('job', Job)
Vue.component('card', Card)
Vue.component('brick', Brick)
Vue.component('list', List)
Vue.component('listTeaser', ListTeaser)
  Vue.component('unorderedList', UnorderedList)
Vue.component('page', Page)
Vue.component('teaser', Teaser)
Vue.component('richtext', RichText)
Vue.component('hero', Hero)
Vue.component('columns', Columns)
Vue.component('column', Column)
Vue.component('feature', Feature)
Vue.component('wrapper', Wrapper)
Vue.component('spacer', Spacer)
Vue.component('imageupload', ImageUpload)
Vue.component('markdown', Markdown)
Vue.component('spinner', Spinner)
Vue.component('buttons', Buttons)
Vue.component('vueButton', Button)
Vue.component('videoBackground', VideoBackground)
