// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import VueAxios from 'vue-axios'
import axios from  './axiosreq'
import '@/styles/index.scss' // global css
import '@/icons' // icon



Vue.use(VueAxios,axios);
Vue.config.productionTip = false
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>'
})
