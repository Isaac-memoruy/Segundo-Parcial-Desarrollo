<template>
  <div id="app">
    <Header />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>

<style>

body, html, #app {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  background: #0f1720;
  color: #fff;
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}
main {
  padding: 1rem;
}
</style>
