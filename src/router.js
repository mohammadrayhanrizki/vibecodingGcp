import { createRouter, createWebHistory } from 'vue-router'
import Auth  from './views/Auth.vue'
import Arena from './views/Arena.vue'

const routes = [
  { path: '/',      component: Auth,  name: 'auth'  },
  { path: '/arena', component: Arena, name: 'arena' },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
