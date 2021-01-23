import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false


var firebaseConfig = {
  apiKey: "AIzaSyC7D5JKvKQVA2E39CDx0tq5ufkRSFGrQVY",
  authDomain: "yag-inventario.firebaseapp.com",
  projectId: "yag-inventario",
  storageBucket: "yag-inventario.appspot.com",
  messagingSenderId: "308242146113",
  appId: "1:308242146113:web:4e8c662980e9b8dea9b7c0",
  measurementId: "G-MN8Z20PEKC"
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

