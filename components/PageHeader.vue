<template>
  <div class="jumbotron jumbotron-fluid bg-primary mb-0 border-bottom border-dark">
    <div class="container text-center px-0 py-2">
      <div class="col-12 col-md-8 mx-auto">
        <h1 class="display-1" v-bind:class="{ 'mb-5': description, 'mb-2': !description }">{{title}}</h1>
        <p class="lead-header mb-0" v-if="description">{{description}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String
      },
      description: {
        type: String
      }
    }
  }
</script>
<style scoped>
  h1 {
    text-transform: capitalize;
  }
</style>
