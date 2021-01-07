<template>
  <div class="col-12 col-md-6 mb-4 d-flex">
    <div class="feature-number mr-4">
      <img class="img-fluid" src="@/assets/images/circle-90px.svg">
      <h1 class="mb-0 feature-number-text">{{index + 1}}</h1>
    </div>

    <div>
      <h4>{{title}}</h4>
      <p class="mb-0">{{description}}</p>
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
      },
      index: {
        type: Number
      }
    }
  }
</script>

<style>
  .feature-number {
    position: relative;
  }

  .feature-number-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
