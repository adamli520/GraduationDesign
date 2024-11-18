
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant'
import { Lazyload } from 'vant';
import 'vant/lib/index.css'

import pinia from './store'
const app=createApp(App)
app.use(pinia)
app.use(Vant)
app.use(Lazyload);
app.use(router)
app.mount('#app')
