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
    path: '/autocomplete',
    name: 'Autocomplete',
    component: () => import('../views/DemoAutocomplete.vue')
  },
  {
    path: '/slider',
    name: 'Slider',
    component: () => import('../views/DemoSlider.vue')
  },
  {
    path: '/tab',
    name: 'Tab',
    component: () => import('../views/DemoTab.vue')
  },
  {
    path: '/drag',
    name: 'Drag',
    component: () => import('../views/DemoDnD/index.vue')
  },
  {
    path: '/expand',
    name: 'Expand',
    component: () => import('../views/DemoExpand.vue')
  },
  {
    path: '/useFetch',
    name: 'UserFetch',
    component: () => import('../views/DemoUseFetch.vue')
  },
  {
    path: '/error',
    name: 'ErrorCapture',
    component: () => import('../views/DemoError.vue')
  },
  {
    path: '/dropzone',
    name: 'Dropzone',
    component: () => import('../views/DemoDropzone.vue')
  },
  {
    path: '/contextmenu',
    name: 'ContextMenu',
    component: () => import('../views/DemoContext.vue')
  },
  {
    path: '/zoomer',
    name: 'Zoomer',
    component: () => import('../views/DemoZoomer.vue')
  },
  {
    path: '/zoomin',
    name: 'ZoomIn',
    component: () => import('../views/ZoomIn.vue')
  },
  {
    path: '/undo',
    name: 'Undo',
    component: () => import('../views/Undo/index.vue')
  },
  {
    path: '/carousel-list',
    name: 'CarouselList',
    component: () => import('../views/DemoCarouselList.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
