import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/view/Hello'
import Home from '@/view/Home'
import List from '@/view/List'
import Search from '@/view/Search'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/list',
      name: 'List',
      component: List
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    }
  ]
})
