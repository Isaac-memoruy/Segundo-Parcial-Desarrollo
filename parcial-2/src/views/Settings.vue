<template>
  <div>
    <h1>Ajustes</h1>
    <button @click="resetData">Restablecer datos por defecto</button>
  </div>
</template>

<script>
export default {
  name: 'AppSettings',
  methods: {
    resetData() {
      localStorage.removeItem('usuarios')
      localStorage.removeItem('usuarioLogueado')
      alert('Datos restablecidos')
    }
  }
}
</script>

<style scoped>
button { padding:0.5rem 1rem }
</style>
