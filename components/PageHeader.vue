<template>
  <div class="jumbotron jumbotron-fluid bg-white mb-0 border-bottom border-dark">
    <div class="container text-center px-0 py-5">
      <div class="col-12 col-md-8 mx-auto">
        <h1 class="display-1 text-uppercase font-weight-extrabold" v-bind:class="{ 'mb-3': description, 'mb-0': !description }">{{title}}</h1>
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
