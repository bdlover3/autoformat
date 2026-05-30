import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ribbon from './components/ribbon.js'

// 必须在模块顶层立即设置window.ribbon，不能等到Vue mount
// WPS加载ribbon.xml后会立即调用ribbon.OnAddinLoad等回调
window.ribbon = ribbon

const app = createApp(App)

app.use(router)

app.mount('#app')

