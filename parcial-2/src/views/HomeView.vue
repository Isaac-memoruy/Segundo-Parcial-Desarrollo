<template>
  <div class="container my-5">
    <section class="welcome-section">
      <div class="welcome-content text-center">
        <h1 class="display-4 fw-bold mb-3">🎮 Bienvenido a Game Zone</h1>
        <p class="lead text-muted mb-4">Tu tienda de videojuegos favorita</p>
        <p class="text-secondary fs-5 mx-auto" style="max-width: 600px;">
          Descubre el universo de los videojuegos en un solo lugar. Game Zone es tu plataforma definitiva para explorar, comprar y gestionar tu biblioteca personal de juegos.
        </p>
        <router-link to="/productos" class="btn btn-primary btn-lg mt-4">
          Explorar Productos
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ViewHome'
}
</script>

<style scoped>
.welcome-section {
  background: linear-gradient(135deg, rgba(23, 26, 33, 0.8) 0%, rgba(27, 40, 56, 0.8) 100%);
  border-radius: 15px;
  padding: 3rem 2rem;
  border: 1px solid rgba(102, 192, 244, 0.2);
}

.welcome-content {
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
