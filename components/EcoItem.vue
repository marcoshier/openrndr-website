<template>
  <div class="col-12 col-md-6 col-lg-4 mb-4">
    <div class="card">
      <a class="eco-link" href="#">
        <div class="card-body d-flex p-3 align-items-center">
          <div class="eco-img-wrapper text-center mr-3">
            <img class="eco-img d-inline" :src="image.url">
          </div>
          <div class="">
            <h4 class="eco-title mb-1">{{title}}</h4>
            <p class="eco-description mb-0">{{title}}</p>
          </div>
        </div>
      </a>
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
      image: {
        type: Object
      }
    }
  }
</script>

<style>
  .eco-link {
    color: inherit;
  }

  .eco-link:hover{
    text-decoration: none;
    color: inherit;
  }

  .eco-img {
    height: 65px;
  }

  .eco-img-wrapper {
    width: 65px;
    overflow: hidden;
  }
</style>
