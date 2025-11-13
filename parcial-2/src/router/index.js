import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import Productos from '../views/ProductosView.vue'
import Game from '../views/GameView.vue'
import Login from '../views/LoginView.vue'
import Registro from '../views/RegistroView.vue'
import Biblioteca from '../views/BibliotecaView.vue'
import Settings from '../views/SettingsView.vue'

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
