import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCmkg4Zjr8t2eWyDQlXC-VRRt1quAo3PLk',
    libraries: 'places',
  },
})
