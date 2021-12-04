import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  
  {
    path: '/login',
    name: 'Login',
    component: () => import( '../views/login.vue')
  },

  {
    path: '/signup',
    name: 'Signup',
    component: () => import( '../views/signup.vue')
  },

  {
    path: '/user',
    name: 'user',
    component: () => import( '../views/user.vue')
  },

  {
    path: '/forum',
    name: 'Forum',
    component: () => import( '../views/forum.vue')
  },

  {
    path: '/publication',
    name: 'Publication',
    component: () => import( '../views/publication.vue')
  },

  {
    path: '/publicationCreation',
    name: 'PublicationCreation',
    component: () => import( '../views/publicationCreation.vue')
  },

]

const router = new VueRouter({
  routes
})

export default router
