<template>
  <div>
    <h1>Mi Biblioteca</h1>
    <div class="game-list">
      <div v-for="g in games" :key="g.steam_appid" class="game-card">
        <img :src="g.capsule_image" :alt="g.name" />
        <h3>{{ g.name }}</h3>
        <router-link :to="{ name: 'Game', params: { appId: g.steam_appid } }">Ver más</router-link>
      </div>
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
.game-list { display:grid; grid-template-columns:repeat(auto-fill,minmax(220px,1fr)); gap:1rem }
.game-card img { width:100% }
</style>
