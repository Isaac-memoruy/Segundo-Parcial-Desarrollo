<template>
  <section class="welcome-section">
    <div class="welcome-content">
      <h1 class="welcome-title">Bienvenido a Game Zone</h1>
      <div class="title-subtitle">Tu tienda de videojuegos favorita</div>
      <p class="welcome-description">Descubre el universo de los videojuegos en un solo lugar. Game Zone es tu plataforma definitiva para explorar, comprar y gestionar tu biblioteca personal de juegos.</p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ViewHome'
}
</script>

<style scoped>
.welcome-section { padding:2rem; text-align:center }
.welcome-title { font-size:2rem; margin:0 }
.title-subtitle { margin-top:0.5rem; color:#cbd5e1 }
.welcome-description { margin-top:1rem; max-width:800px; margin-left:auto; margin-right:auto }
</style>
