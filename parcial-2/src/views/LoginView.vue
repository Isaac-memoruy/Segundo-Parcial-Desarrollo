<template>
  <div class="container d-flex align-items-center justify-content-center login-container">
    <div class="card login-card shadow-lg" style="width: 100%; max-width: 400px; background-color: #1b2838;">
      <div class="card-body p-5">
        <h2 class="card-title text-center mb-4 text-light fw-bold">🎮 Iniciar Sesión</h2>
        <form @submit.prevent="onSubmit">
          <div class="mb-3">
            <label for="email" class="form-label text-light">Correo electrónico</label>
            <input v-model="email" type="email" id="email" class="form-control" placeholder="tu@email.com" required />
          </div>

          <div class="mb-4">
            <label for="password" class="form-label text-light">Contraseña</label>
            <input v-model="password" type="password" id="password" class="form-control" placeholder="•••••••••" required />
          </div>

          <button type="submit" class="btn btn-primary w-100 fw-bold">Entrar</button>
        </form>
        <hr class="bg-secondary" />
        <p class="text-center text-muted small">
          ¿No tienes cuenta? <router-link to="/registro" class="text-primary fw-bold">Regístrate aquí</router-link>
        </p>
      </div>
    </div>
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
