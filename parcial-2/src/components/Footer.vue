<template>
  <footer class="bg-dark text-light py-4 mt-5 border-top border-secondary">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h5 class="fw-bold">🎮 Game Zone</h5>
          <p class="small text-muted">Tu destino para encontrar los mejores juegos, novedades y reseñas — todo en un solo lugar.</p>
        </div>
        <div class="col-md-6 text-md-end">
          <p class="small text-muted">© {{ year }} Game Zone. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'AppFooter',
  setup() {
    const year = ref(new Date().getFullYear())
    return { year }
  }
}
</script>

<style scoped>
footer {
  background-color: #071129 !important;
  margin-top: auto;
}
</style>
