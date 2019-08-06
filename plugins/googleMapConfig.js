import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCsMglWs78ruOpy77HGTS2Ga2-LeTUeh5w',
    libraries: 'places',
  },
})
