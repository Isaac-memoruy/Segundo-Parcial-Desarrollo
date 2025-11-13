<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top" style="background-color: #071129 !important;">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand fw-bold">
        🎮 Game Zone
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li v-for="item in navItems" :key="item.text" class="nav-item">
            <router-link :to="item.to" class="nav-link">{{ item.text }}</router-link>
          </li>
        </ul>
      </div>
      <div class="d-flex gap-2 align-items-center">
        <template v-if="user">
          <span class="text-light small">Hola, <strong>{{ user.nombre }}</strong></span>
          <button class="btn btn-sm btn-outline-light" @click="goToBiblioteca">Mi biblioteca</button>
          <button class="btn btn-sm btn-outline-danger" @click="logout">Salir</button>
        </template>
        <template v-else>
          <router-link to="/login" class="btn btn-sm btn-outline-light">Iniciar Sesión</router-link>
          <router-link to="/registro" class="btn btn-sm btn-primary">Registrarse</router-link>
        </template>
      </div>
    </div>
  </nav>
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
.navbar {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  z-index: 1030;
}

.navbar-brand {
  font-size: 1.4rem;
  margin-right: 2rem;
  color: #fff !important;
}

.nav-link {
  margin: 0 0.5rem;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #66c0f4 !important;
}

.nav-link.router-link-active {
  color: #1f83ff !important;
  font-weight: 600;
}
</style>
