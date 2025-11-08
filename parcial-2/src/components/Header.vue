<template>
  <header class="header">
    <div class="header__container">
      <h1 class="logo">Game Zone</h1>
      <nav class="nav-menu">
        <ul class="nav-menu__list">
          <li v-for="item in navItems" :key="item.text">
            <router-link :to="item.to" class="nav-menu__item">{{ item.text }}</router-link>
          </li>
        </ul>
      </nav>
      <div class="header__actions">
        <template v-if="user">
          <div class="user">Hola, {{ user.nombre }}</div>
          <button class="btn btn--outline" @click="goToBiblioteca">Mi biblioteca</button>
          <button class="btn btn--outline" @click="logout">Cerrar sesión</button>
        </template>
        <template v-else>
          <router-link to="/login" class="btn btn--outline user-action">Iniciar Sesión</router-link>
          <router-link to="/registro" class="btn btn--primary user-action">Registrarse</router-link>
        </template>
      </div>
    </div>
  </header>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'AppHeader',
  setup() {
    const router = useRouter();
    const navItems = ref([
      { text: 'Inicio', to: '/' },
      { text: 'Productos', to: '/productos' }
    ])

    const user = ref(null)

    onMounted(() => {
      const raw = localStorage.getItem('usuarioLogueado')
      if (raw) {
        user.value = JSON.parse(raw)
        navItems.value.push({ text: 'Biblioteca', to: '/biblioteca' })
      }
      navItems.value.push({ text: 'Ajustes', to: '/settings' })
    })

    function logout() {
      localStorage.removeItem('usuarioLogueado')
      user.value = null
      router.push('/')
      
      navItems.value = [
        { text: 'Inicio', to: '/' },
        { text: 'Productos', to: '/productos' },
        { text: 'Ajustes', to: '/settings' }
      ]
    }

    function goToBiblioteca() {
      router.push('/biblioteca')
    }

    return { navItems, user, logout, goToBiblioteca }
  }
}
</script>

<style scoped>
.header { background: #071129; color: white; padding: 0.5rem 1rem; }
.header__container { display:flex; align-items:center; gap:1rem; justify-content:space-between }
.nav-menu__list { list-style:none; display:flex; gap:1rem; margin:0; padding:0 }
.nav-menu__item { color: #fff; text-decoration:none }
.logo { margin:0 }
.header__actions { display:flex; gap:0.5rem; align-items:center }
.btn { padding:0.4rem 0.7rem; border-radius:4px; border:1px solid rgba(255,255,255,0.1); background:transparent; color:#fff }
.btn--primary { background: #1f83ff }
</style>
