<template>
  <div class="game-card">
    <router-link :to="{ name: 'Game', params: { appId: appId } }" class="game-card-link">
      <img :src="imageUrl" :alt="title" class="game-card__image" />
      <div class="game-card__info">
        <h3 class="game-card__title">{{ title }}</h3>
        <p class="game-card__price">{{ price }}</p>
      </div>
    </router-link>
  </div>
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
.game-card { background:#071a2b; padding:0.5rem; border-radius:6px; margin:0.5rem }
.game-card__image { width:100%; height:auto; display:block }
.game-card__info { padding-top:0.5rem }
.game-card__title { margin:0; font-size:1rem }
.game-card__price { color:#9ad1ff }
</style>
