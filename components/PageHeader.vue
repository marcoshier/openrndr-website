<template>
  <div class="jumbotron jumbotron-fluid bg-primary mb-0">
    <div class="container text-center">
      <div class="col-12 col-md-8 mx-auto">
        <h1 class="display-1" v-bind:class="{ 'mb-3': description, 'mb-0': !description }">{{title}}</h1>
        <p class="lead-header" v-if="description">{{description}}</p>
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
