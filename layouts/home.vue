<template>
  <div id="app">
    <nav-bar />
    <nuxt />
    <Footer />
  </div>
</template>

<script>
  import NavBar from '~/components/NavBar.vue'
  import Footer from '~/components/Footer.vue'

  export default {
    components: {
      NavBar,
      Footer
    },
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700;800&family=Noto+Sans+JP:wght@100;300;400;500;700;900&display=swap'
        }
      ]
    }
  }
</script>

<style>



</style>
