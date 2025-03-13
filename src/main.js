import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as echarts from 'echarts'
import * as echarts4 from 'echarts4'
import chinaMap from './assets/china.json'
import 'echarts4/map/js/china.js'
import 'echarts-wordcloud'
//注册地图
echarts4.registerMap('china', chinaMap)

createApp(App).use(router).use(store).mount('#app')
