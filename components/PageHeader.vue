<template>
  <div class="jumbotron jumbotron-fluid">
    <div class="container text-center">
      <h1 class="display-4">{{title}}</h1>
      <p class="lead" v-if="description">{{description}}</p>
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
