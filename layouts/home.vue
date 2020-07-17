<template>
  <div id="app">
    <nav-bar />
    <nuxt />
  </div>
</template>

<script>
  import NavBar from '~/components/NavBar.vue'

  export default {
    components: {
      NavBar
    }
  }
</script>

<style>

  @media (min-width: 1200px) {
    .container, .container-sm, .container-md, .container-lg, .container-xl {
        max-width: 1400px;
    }
  }
  
</style>
