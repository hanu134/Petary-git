import Vue from 'vue'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import Router from 'vue-router'
import Top from '@/components/pages/Top'
import Login from '@/components/pages/Login'
import Register from '@/components/pages/Register'
import Userspage from '@/components/pages/Userspage'
import Timeline from '@/components/pages/Timeline'
import Ranking from '@/components/pages/Ranking'
import firebase from 'firebase'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Router)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

let router = new Router({
  routes: [
    {
      path: '*',
      redirect: 'top'
    },
    {
      path: '/',
      component: Top
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/users/:id',
      name: 'users',
      component: Userspage,
      meta: {requiresAuth: true}
    },
    {
      path: '/timeline',
      component: Timeline,
      meta: {requiresAuth: true}
    },
    {
      path: '/ranking',
      component: Ranking
    }
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth) {
    // 未ログイン状態時、トップページにリダイレクト
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        next()
      } else {
        next({
          path: '/',
          query: { redirect: to.fullPath }
        })
      }
    })
  } else {
    next()
  }
})

export default router
