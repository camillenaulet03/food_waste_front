import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import HomeView from '../views/HomeView.vue'
import WasteView from '../views/WasteView.vue'
import store from '../store';

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    beforeEnter: (to, from, next) => beforeEnter(to, from, next)
  },
  {
    path: '/waste',
    name: 'waste',
    component: WasteView,
    beforeEnter: (to, from, next) => beforeEnter(to, from, next)
  }
]

function beforeEnter(to, from, next) {
  if (store.getters.isLoggedIn) next();
  else next('/');
}

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
