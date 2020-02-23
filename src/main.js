// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import firebase from 'firebase'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.config.devtools = true

library.add(fas)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

// Initialize Firebase
var firebaseConfig = {
  apiKey: 'AIzaSyA-lxBsWKbz5Y9ab1ljFEdo8PqZQxXSZEs',
  authDomain: 'petary-d5f56.firebaseapp.com',
  databaseURL: 'https://petary-d5f56.firebaseio.com',
  projectId: 'petary-d5f56',
  storageBucket: 'petary-d5f56.appspot.com',
  messagingSenderId: '515954490956',
  appId: '1:515954490956:web:16cdb783ccbc11bec2fee9',
  measurementId: 'G-2RVHFKVRVM'
}
firebase.initializeApp(firebaseConfig)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
