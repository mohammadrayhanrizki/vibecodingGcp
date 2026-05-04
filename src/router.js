import { createRouter, createWebHistory } from 'vue-router'
import Auth      from './views/Auth.vue'
import Arena     from './views/Arena.vue'
import Dashboard from './views/Dashboard.vue'

const routes = [
  { path: '/',          component: Auth,      name: 'auth'      },
  { path: '/dashboard', component: Dashboard, name: 'dashboard' },
  { path: '/arena',     component: Arena,     name: 'arena'     },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
