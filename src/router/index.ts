import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/transition',
    name: 'Transition',
    component: () => import('../views/Transition.vue')
  },
  {
    path: '/transition2',
    name: 'Transition2',
    component: () => import('../views/Transition2.vue')
  },
  {
    path: '/menu',
    name: 'DemoMenu',
    component: () => import('../views/DemoMenu.vue')
  },
  {
    path: '/toggle',
    name: 'DemoToggle',
    component: () => import('../views/DemoToggle.vue')
  },
  {
    path: '/dialog',
    name: 'Dialog',
    component: () => import('../views/DemoDialog.vue')
  },
  {
    path: '/skeleton',
    name: 'DemoSkeleton',
    component: () => import('../views/DemoSkeleton.vue')
  },
  {
    path: '/table',
    name: 'DemoTable',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/DemoTable.vue')
  },
  {
    path: '/tang',
    name: 'Tang',
    component: () => import('../views/tang.vue')
  },
  {
    path: '/drag',
    name: 'Drag',
    component: () => import('../views/DemoDnD/index.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
