import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


import pinia from './store'

import './assets/Common.css'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.min.js'


import ECharts from 'vue-echarts';
import 'echarts';

const app=createApp(App)
app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.component('chart', ECharts)
app.mount('#app')
