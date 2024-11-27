import '@/assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/vue-mynotes/App.vue'
import { routes } from './router.js'
import { createRouter, createWebHashHistory } from 'vue-router'
import Vue3Cookies from 'vue3-cookies'

const router = createRouter({
    history: createWebHashHistory('/MyNote/'), routes,
})

createApp(App).use(createPinia()).use(router).use(Vue3Cookies).mount('#app')