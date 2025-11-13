<template>
  <div class="container-fluid py-5">
    <header class="mb-5 text-center">
      <h1 class="display-4 fw-bold mb-2">🎮 Productos</h1>
      <p class="text-muted lead">Descubre nuestro catálogo de juegos</p>
    </header>

    <div class="row g-4">
      <div v-for="game in games" :key="game.steam_appid" class="col-12 col-sm-6 col-lg-4 col-xl-3">
        <GameCard :title="game.name" :appId="game.steam_appid" :imageUrl="game.capsule_image" :price="getPriceText(game)" />
      </div>
    </div>

    <div v-if="games.length === 0" class="alert alert-info text-center mt-5">
      <p>Cargando juegos...</p>
    </div>
  </div>
</template>

<script>
import GameCard from '../components/GameCard.vue'
import steamDataBase from '../services/steamDB'

export default {
  name: 'ViewProductos',
  components: { GameCard },
  data() {
    return { games: [] }
  },
  methods: {
    getPriceText(game) {
      if (!game) return 'No disponible'
      if (game.is_free) return 'Gratis'
      try { return `$${(game.price_overview.final / 100).toFixed(2)}` } catch (e) { return 'Precio no disponible' }
    }
  },
  async mounted() {
    try {
      const list = await fetch('/data/gameList.json').then(r => r.json())
      const sdb = new steamDataBase()
      const results = []
      for (const it of list) {
        try {
          const g = await sdb.importarJuego(it.id)
          if (g && g.name) results.push(g)
        } catch (e) { console.warn('game fetch failed', e) }
      }
      this.games = results
    } catch (e) {
      console.error('Error cargando lista de juegos', e)
    }
  }
}
</script>

<style scoped>
.container-fluid {
  min-height: calc(100vh - 300px);
}
</style>
