<template>
  <div class="game-view">
    <div v-if="game">
      <img :src="game.background" class="background-image" />
      <h1 class="title">{{ game.name }}</h1>
      <p class="short_description">{{ game.short_description }}</p>
      <img :src="game.header_image" class="thumbnail" />
      <h4>Precio</h4>
      <p class="price">{{ priceText }}</p>
      <button class="btn--buyGame" @click="buyGame">Comprar</button>
  <h2>Descripción</h2>

  <div class="detailed_description" v-html="game.about_the_game"></div>
  <h2>Requisitos del sistema</h2>
  
  <div class="min-pc_requirements" v-html="game.pc_requirements?.minimum || 'No disponible'"></div>
  <div class="recomended-pc_requirements" v-html="game.pc_requirements?.recommended || 'No disponible'"></div>
    </div>
    <div v-else>
      <p>Cargando juego...</p>
    </div>
  </div>
</template>

<script>
import steamDataBase from '../services/steamDB'
import { ref, onMounted } from 'vue'
import dataManager from '../services/dataManager'

export default {
  name: 'ViewGame',
  props: ['appId'],
  setup(props) {
    const game = ref(null)
    const priceText = ref('')

    onMounted(async () => {
      const sdb = new steamDataBase()
      const g = await sdb.importarJuego(props.appId)
      if (g) {
        game.value = g
        if (g.is_free) priceText.value = 'Gratis'
        else try { priceText.value = `$${(g.price_overview.final/100).toFixed(2)}` } catch(e){ priceText.value='No disponible'}
      }
    })

    function buyGame() {
      if (localStorage.getItem('usuarioLogueado')) {
        const dm = new dataManager()
        dm.buygame(game.value.steam_appid)
        
        window.location.href = '/productos'
      } else {
        alert('Debes iniciar sesion para comprar el juego.')
        window.location.href = '/login'
      }
    }

    return { game, priceText, buyGame }
  }
}
</script>

<style scoped>
.thumbnail { max-width:400px }
.background-image { width:100%; max-height:300px; object-fit:cover }
</style>
