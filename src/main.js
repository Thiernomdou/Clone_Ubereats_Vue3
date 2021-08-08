import { createApp } from 'vue'
import App from './App.vue'


//vue router
import { createRouter, createWebHashHistory } from 'vue-router'
//import comosant Home
import Home from '@/page/Home'
//import comosant Restaurant
import Restaurant from '@/page/Restaurant'

//création des routes
const routes = [
    { path: '/', component: Home},
    // le /:name permet de retrouver chaque restaurant avec son nom
    { name: 'Restaurant', path: '/restaurant/:name', component: Restaurant}
] 

//création du router
const router = createRouter({
    history: createWebHashHistory(),
    routes
});

//initialisation
const VueApp = createApp(App)

//métode use
VueApp.use(router)

VueApp.mount('#app')
