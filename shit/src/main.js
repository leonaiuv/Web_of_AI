import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import './assets/main.css'

// 引入TensorFlow.js
import * as tf from '@tensorflow/tfjs'
window.tf = tf // 方便在控制台调试

const app = createApp(App)
app.use(ElementPlus)
app.mount('#app') 