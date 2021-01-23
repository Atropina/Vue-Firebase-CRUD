import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false


var firebaseConfig = {
  
};

firebase.initializeApp(firebaseConfig)
let app = ''
firebase.auth().onAuthStateChanged( ()=>{
  if (!app){
    app = new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')
  }
    
})

