import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import trapFocus from './directives/trapFocus.js'
import clickOutSide from './directives/clickOutSide'

const app = createApp(App)
app.directive('click-outside', clickOutSide)
app.directive('trap-focus', trapFocus)
app.use(store).use(router).mount('#app')
