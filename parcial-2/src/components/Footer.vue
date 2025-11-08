<template>
  <footer class="site-footer">
    <div class="footer__container">
      <div class="footer__brand">
        <h2 class="footer__title">Game Zone</h2>
        <p class="footer__description">Tu destino para encontrar los mejores juegos, novedades y reseñas — todo en un solo lugar.</p>
      </div>

      <hr class="footer__separator" />

      <div class="footer__legal">
        <p class="footer__copyright">© <span>{{ year }}</span> Game Zone. Todos los derechos reservados.</p>
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
.site-footer { background:#071129; color:#fff; padding:1rem }
.footer__container { max-width:1100px; margin:0 auto }
.footer__title { margin:0 }
</style>
