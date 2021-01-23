import Vue from 'vue'
import VueRouter from 'vue-router'
import Landing from '../views/Landing.vue'
import Login from '../views/Login.vue'
import Cadastrar from '../views/Cadastrar.vue'
import Home from '../views/Home.vue'
import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  
  {
    path: '/cadastrar',
    name: 'Cadastrar',
    component: Cadastrar
  },
  
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta:{
      requiresAuth : true
    }
  }
  
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) =>{
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some( record => record.meta.requiresAuth);
  if ( requireAuth && !currentUser) next('login')
  else if (!requireAuth && currentUser) next('home')
  else next()
})

export default router
