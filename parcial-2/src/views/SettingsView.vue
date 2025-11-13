<template>
  <div class="container py-5">
    <header class="mb-5 text-center">
      <h1 class="display-4 fw-bold mb-2">⚙️ Ajustes</h1>
      <p class="text-muted lead">Administra tu cuenta y preferencias</p>
    </header>

    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card border-0 shadow">
          <div class="card-body p-5">
            <h5 class="card-title fw-bold mb-4">Opciones del Sistema</h5>
            
            <div class="alert alert-warning d-flex align-items-center" role="alert">
              <span class="me-3">⚠️</span>
              <div>
                <strong>Restablecer datos:</strong> Esta acción eliminará todos tus datos locales y restablecerá la aplicación a su estado inicial.
              </div>
            </div>

            <button @click="resetData" class="btn btn-danger btn-lg w-100">
              🔄 Restablecer Datos
            </button>
          </div>
        </div>
      </div>
    </div>
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
.container {
  min-height: calc(100vh - 300px);
}

.card {
  background-color: #1b2838 !important;
  border-color: #2a475e !important;
}

.card-body {
  color: #c6d4df;
}

.card-title {
  color: #fff !important;
}
</style>
