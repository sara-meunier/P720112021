import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Groupomaniapp - Accueil'
    }
  },
  
  {
    path: '/login',
    name: 'Login',
    component: () => import( '../views/login.vue'),
    meta: {
      title: 'Groupomaniapp - login'
    }
  },

  {
    path: '/signup',
    name: 'Signup',
    component: () => import( '../views/signup.vue'),
    meta: {
      title: 'Groupomaniapp - inscription'
    }
  },

  {
    path: '/user',
    name: 'user',
    component: () => import( '../views/user.vue'),
    meta: {
      title: 'Groupomaniapp - profil'
    }
  },

  {
    path: '/forum',
    name: 'Forum',
    component: () => import( '../views/forum.vue'),
    meta: {
      title: 'Groupomaniapp - forum'
    }
  },

  {
    path: '/publication/:id',
    name: 'Publication',
    component: () => import( '../views/publication.vue'),
    meta: {
      title: 'Groupomaniapp - Post'
    }
  },

  {
    path: '/publicationCreation',
    name: 'PublicationCreation',
    component: () => import( '../views/publicationCreation.vue'),
    meta: {
      title: 'Groupomaniapp - Nouveau Post'
    }
  },

]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})


export default router
