<template>
  <router-link :to="{ name: 'Game', params: { appId: appId } }" class="card game-card h-100 border-0 shadow-sm">
    <img :src="imageUrl" :alt="title" class="card-img-top game-card__image" />
    <div class="card-body d-flex flex-column">
      <h5 class="card-title text-truncate">{{ title }}</h5>
      <p class="card-text text-primary fw-bold mt-auto">{{ price }}</p>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'GameCard',
  props: {
    title: String,
    appId: [String, Number],
    imageUrl: String,
    price: { type: String, default: 'Gratis' }
  }
}
</script>

<style scoped>
.game-card {
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;
  background-color: #071a2b !important;
  border-color: #2a475e !important;
}

.game-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 25px rgba(102, 192, 244, 0.3) !important;
  border-color: #66c0f4 !important;
}

.game-card__image {
  height: 200px;
  object-fit: contain;
  background: #1b2838;
  padding: 1rem;
}

.card-title {
  font-size: 0.95rem;
  color: #c6d4df;
  line-height: 1.3;
}

.card-body {
  background-color: #071a2b;
  border-top: 2px solid #66c0f4;
}
</style>
