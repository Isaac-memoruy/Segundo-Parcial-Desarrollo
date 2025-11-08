import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Productos from '../views/Productos.vue'
import Game from '../views/Game.vue'
import Login from '../views/Login.vue'
import Registro from '../views/Registro.vue'
import Biblioteca from '../views/Biblioteca.vue'
import Settings from '../views/Settings.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/productos', name: 'Productos', component: Productos },
  { path: '/game/:appId', name: 'Game', component: Game, props: true },
  { path: '/login', name: 'Login', component: Login },
  { path: '/registro', name: 'Registro', component: Registro },
  { path: '/biblioteca', name: 'Biblioteca', component: Biblioteca },
  { path: '/settings', name: 'Settings', component: Settings }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
