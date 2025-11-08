<template>
  <div class="login-container">
    <h2>Crear una cuenta</h2>
    <form class="login-form" @submit.prevent="onSubmit">
      <label for="nombre">Nombre completo:</label>
      <input v-model="nombre" type="text" id="nombre" required />

      <label for="edad">Edad:</label>
      <input v-model.number="edad" type="number" id="edad" required min="1" />

      <label for="email">Correo electrónico:</label>
      <input v-model="email" type="email" id="email" required />

      <label for="password">Contraseña:</label>
      <input v-model="password" type="password" id="password" required />

      <label for="confirm-password">Confirmar contraseña:</label>
      <input v-model="confirmPassword" type="password" id="confirm-password" required />

      <button type="submit">Registrarse</button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'ViewRegistro',
  setup() {
    const nombre = ref('')
    const edad = ref(0)
    const email = ref('')
    const password = ref('')
    const confirmPassword = ref('')

    async function init() {
      const defaultCredentials = await fetch('/data/defaultCredentials.json').then(r => r.json())
      if (!localStorage.getItem('usuarios')) {
        localStorage.setItem('usuarios', JSON.stringify(defaultCredentials))
      }
    }

    onMounted(init)

    function onSubmit() {
      if (password.value !== confirmPassword.value) { alert('Las contraseñas no coinciden'); return }
      const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []
      if (usuarios.some(u => u.email === email.value)) { alert('El correo ya está registrado'); return }

      const id = usuarios.length
      const nuevoUsuario = { id, nombre: nombre.value, edad: edad.value, email: email.value, password: password.value, biblioteca: [] }
      usuarios.push(nuevoUsuario)
      localStorage.setItem('usuarios', JSON.stringify(usuarios))
      alert('Registro exitoso. Ahora puedes iniciar sesión.')
      window.location.href = '/login'
    }

    return { nombre, edad, email, password, confirmPassword, onSubmit }
  }
}
</script>

<style scoped>
.login-container { max-width:500px; margin:2rem auto }
label { display:block; margin-top:0.5rem }
input { width:100%; padding:0.5rem; border-radius:4px; margin-top:0.25rem }
button { margin-top:1rem }
</style>
