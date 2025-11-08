<template>
  <div class="login-container">
    <h2>Iniciar sesión</h2>
    <form class="login-form" @submit.prevent="onSubmit">
      <label for="email">Correo electrónico:</label>
      <input v-model="email" type="email" id="email" required />

      <label for="password">Contraseña:</label>
      <input v-model="password" type="password" id="password" required />

      <button type="submit">Entrar</button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'ViewLogin',
  setup() {
    const email = ref('')
    const password = ref('')

    async function init() {
      const defaultCredentials = await fetch('/data/defaultCredentials.json').then(r => r.json())
      if (!localStorage.getItem('usuarios')) {
        localStorage.setItem('usuarios', JSON.stringify(defaultCredentials))
      }
    }

    onMounted(init)

    function onSubmit() {
      const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []
      const usuario = usuarios.find(u => u.email === email.value && u.password === password.value)
      if (!usuario) { alert('Correo o contraseña incorrectos'); return }
      localStorage.setItem('usuarioLogueado', JSON.stringify(usuario))
      alert('¡Bienvenido, ' + usuario.nombre + '!')
      window.location.href = '/'
    }

    return { email, password, onSubmit }
  }
}
</script>

<style scoped>
.login-container { max-width:500px; margin:2rem auto }
label { display:block; margin-top:0.5rem }
input { width:100%; padding:0.5rem; border-radius:4px; margin-top:0.25rem }
button { margin-top:1rem }
</style>
