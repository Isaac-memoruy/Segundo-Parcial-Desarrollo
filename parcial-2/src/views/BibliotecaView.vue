<template>
  <div class="container-fluid py-5">
    <header class="mb-5 text-center">
      <h1 class="display-4 fw-bold mb-2">📚 Mi Biblioteca</h1>
      <p class="text-muted lead">{{ games.length }} {{ games.length === 1 ? 'juego' : 'juegos' }} en tu colección</p>
    </header>

    <div v-if="games.length > 0" class="row g-4">
        <div v-for="g in games" :key="g.steam_appid" class="col-12 col-sm-6 col-lg-4 col-xl-3">
        <div class="card h-100 border-0 shadow-sm biblioteca-card">
          <img :src="g.capsule_image" :alt="g.name" class="card-img-top" style="height: 200px; object-fit: contain; padding: 1rem; background: #1b2838; box-sizing: border-box;" />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title text-truncate">{{ g.name }}</h5>
            <router-link :to="{ name: 'Game', params: { appId: g.steam_appid } }" class="btn btn-sm btn-primary mt-auto">
              Ver más
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="alert alert-info text-center mt-5">
      <h5>Aún no tienes juegos en tu biblioteca</h5>
      <p>¡Visita nuestra tienda para agregar juegos!</p>
      <router-link to="/productos" class="btn btn-primary mt-3">
        Ir a Productos
      </router-link>
    </div>
  </div>
</template>

<script>
import steamDataBase from '../services/steamDB'
import { ref, onMounted } from 'vue'

export default {
  name: 'ViewBiblioteca',
  setup() {
    const games = ref([])
    onMounted(async () => {
      const raw = localStorage.getItem('usuarioLogueado')
      if (!raw) return
      const user = JSON.parse(raw)
      const sdb = new steamDataBase()
      const results = []
      for (const id of user.biblioteca) {
        try { const g = await sdb.importarJuego(id); if (g) results.push(g) } catch(e){ console.warn(e) }
      }
      games.value = results
    })
    return { games }
  }
}
</script>

<style scoped>
.container-fluid {
  min-height: calc(100vh - 300px);
}

.biblioteca-card {
  background-color: #071a2b !important;
  border-color: #2a475e !important;
  transition: all 0.3s ease;
}

.biblioteca-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 25px rgba(102, 192, 244, 0.3) !important;
  border-color: #66c0f4 !important;
}

.card-title {
  color: #c6d4df;
  font-size: 0.95rem;
}
</style>
