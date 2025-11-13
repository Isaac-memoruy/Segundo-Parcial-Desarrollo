<template>
  <div class="game-view">
    <div v-if="game" class="container-lg py-5">
      <img :src="game.background" class="img-fluid mb-4 rounded game-background" alt="Fondo del juego" style="object-fit: cover; max-height: 400px;" />
      
      <div class="row mb-5">
        <div class="col-lg-8">
          <h1 class="display-4 fw-bold mb-3">{{ game.name }}</h1>
          <p class="lead text-muted">{{ game.short_description }}</p>
        </div>
        <div class="col-lg-4 text-center">
          <img :src="game.header_image" class="img-fluid rounded mb-4" alt="Thumbnail" style="max-height: 250px; object-fit: contain; background: #1b2838; padding: 1rem;" />
          <div class="price-box mb-3">
            <p class="h4 fw-bold mb-0">{{ priceText }}</p>
          </div>
          <button v-if="!isInLibrary" class="btn btn-success btn-lg w-100 fw-bold" @click="buyGame">
            🛒 Comprar Ahora
          </button>
          <button v-else class="btn btn-danger btn-lg w-100 fw-bold" @click="refundGame">
            💰 Reembolsar Juego
          </button>
        </div>
      </div>

      <hr class="mb-5" />

      <section class="mb-5">
        <h2 class="h3 fw-bold mb-4">📖 Descripción</h2>
        <div class="description-content" v-html="game.about_the_game"></div>
      </section>

      <section>
        <h2 class="h3 fw-bold mb-4">🖥️ Requisitos del Sistema</h2>
        <div class="row">
          <div class="col-md-6">
            <h5 class="fw-bold text-warning mb-3">Mínimos</h5>
            <div class="requirements-box" v-html="game.pc_requirements?.minimum || 'No disponible'"></div>
          </div>
          <div class="col-md-6">
            <h5 class="fw-bold text-success mb-3">Recomendados</h5>
            <div class="requirements-box" v-html="game.pc_requirements?.recommended || 'No disponible'"></div>
          </div>
        </div>
      </section>
    </div>
    <div v-else class="container py-5 text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
      <p class="mt-3 text-muted">Cargando información del juego...</p>
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
    const isInLibrary = ref(false)

    onMounted(async () => {
      const sdb = new steamDataBase()
      const g = await sdb.importarJuego(props.appId)
      if (g) {
        game.value = g
        if (g.is_free) priceText.value = 'Gratis'
        else try { priceText.value = `$${(g.price_overview.final/100).toFixed(2)}` } catch(e){ priceText.value='No disponible'}
      }

      // Verificar si está en la biblioteca
      const usuarioLogueado = localStorage.getItem('usuarioLogueado')
      if (usuarioLogueado) {
        const usuario = JSON.parse(usuarioLogueado)
        isInLibrary.value = usuario.biblioteca && usuario.biblioteca.includes(parseInt(props.appId))
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

    function refundGame() {
      if (!localStorage.getItem('usuarioLogueado')) {
        alert('Debes iniciar sesion.')
        return
      }

      const usuario = JSON.parse(localStorage.getItem('usuarioLogueado'))
      if (usuario.biblioteca && usuario.biblioteca.includes(parseInt(props.appId))) {
        // Remover el juego de la biblioteca
        usuario.biblioteca = usuario.biblioteca.filter(id => id !== parseInt(props.appId))
        
        // Actualizar en localStorage
        localStorage.setItem('usuarioLogueado', JSON.stringify(usuario))
        
        // Actualizar en la lista de usuarios
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []
        const indexUsuario = usuarios.findIndex(u => u.id === usuario.id)
        if (indexUsuario !== -1) {
          usuarios[indexUsuario].biblioteca = usuario.biblioteca
          localStorage.setItem('usuarios', JSON.stringify(usuarios))
        }

        alert('¡Juego reembolsado exitosamente!')
        isInLibrary.value = false
        window.location.href = '/productos'
      }
    }

    return { game, priceText, buyGame, refundGame, isInLibrary }
  }
}
</script>

<style scoped>
.game-view {
  background: linear-gradient(135deg, rgba(23, 26, 33, 0.9) 0%, rgba(27, 40, 56, 0.9) 100%);
  min-height: calc(100vh - 250px);
  color: #c6d4df;
}

.game-background {
  max-height: 400px;
  object-fit: cover;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.price-box {
  background: linear-gradient(135deg, #2a475e, #3a5a7e);
  border: 2px solid #66c0f4;
  border-radius: 10px;
  padding: 1.5rem;
}

.description-content {
  background-color: rgba(42, 71, 94, 0.5);
  padding: 2rem;
  border-radius: 10px;
  border-left: 5px solid #66c0f4;
  line-height: 1.8;
}

.description-content p, 
.description-content li, 
.description-content div {
  color: #c6d4df !important;
}

.requirements-box {
  background-color: rgba(42, 71, 94, 0.7);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #2a475e;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
  color: #c6d4df;
}

.requirements-box p,
.requirements-box li,
.requirements-box div {
  color: #c6d4df !important;
  margin-bottom: 0.5rem;
}

@media (max-width: 768px) {
  .game-background {
    max-height: 250px;
  }
}

.btn-success, .btn-danger {
  transition: all 0.3s ease;
}

.btn-success:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(40, 167, 69, 0.3);
}

.btn-danger:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(220, 53, 69, 0.3);
}

</style>
