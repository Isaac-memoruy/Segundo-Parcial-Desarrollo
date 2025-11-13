<template>
  <div class="container d-flex align-items-center justify-content-center login-container">
    <div class="card login-card shadow-lg" style="width: 100%; max-width: 450px; background-color: #1b2838;">
      <div class="card-body p-5">
        <h2 class="card-title text-center mb-4 text-light fw-bold">🎮 Crear Cuenta</h2>
        <form @submit.prevent="onSubmit">
          <div class="mb-3">
            <label for="nombre" class="form-label text-light">Nombre Completo</label>
            <input v-model="nombre" type="text" id="nombre" class="form-control" placeholder="Juan Pérez" required />
          </div>

          <div class="mb-3">
            <label for="edad" class="form-label text-light">Edad</label>
            <input v-model.number="edad" type="number" id="edad" class="form-control" required min="13" />
          </div>

          <div class="mb-3">
            <label for="email" class="form-label text-light">Correo Electrónico</label>
            <input v-model="email" type="email" id="email" class="form-control" placeholder="tu@email.com" required />
          </div>

          <div class="mb-3">
            <label for="password" class="form-label text-light">Contraseña</label>
            <input v-model="password" type="password" id="password" class="form-control" placeholder="•••••••••" required />
          </div>

          <div class="mb-4">
            <label for="confirm-password" class="form-label text-light">Confirmar Contraseña</label>
            <input v-model="confirmPassword" type="password" id="confirm-password" class="form-control" placeholder="•••••••••" required />
          </div>

          <button type="submit" class="btn btn-primary w-100 fw-bold">Registrarse</button>
        </form>
        <hr class="bg-secondary" />
        <p class="text-center text-muted small">
          ¿Ya tienes cuenta? <router-link to="/login" class="text-primary fw-bold">Inicia sesión aquí</router-link>
        </p>
      </div>
    </div>
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
.login-container {
  min-height: calc(100vh - 250px);
  background: linear-gradient(135deg, rgba(23, 26, 33, 0.9) 0%, rgba(27, 40, 56, 0.9) 100%);
}

.login-card {
  border: 1px solid rgba(102, 192, 244, 0.2) !important;
  border-radius: 15px;
}

.form-control {
  background-color: #2a475e !important;
  border: 1px solid #2a475e !important;
  color: #c6d4df !important;
}

.form-control:focus {
  background-color: #3a5a7e !important;
  border-color: #66c0f4 !important;
  color: #fff !important;
  box-shadow: 0 0 0 0.2rem rgba(102, 192, 244, 0.25) !important;
}

.form-control::placeholder {
  color: #8f98a0 !important;
}
</style>
