<template>
  <div>
    <header class="products-header">
      <h1 class="products-title">Productos</h1>
    </header>

    <section class="product-grid">
      <GameCard v-for="game in games" :key="game.steam_appid" :title="game.name" :appId="game.steam_appid" :imageUrl="game.capsule_image" :price="getPriceText(game)" />
    </section>
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
.product-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(220px,1fr)); gap:1rem; padding:1rem }
.products-header { text-align:center }
</style>
