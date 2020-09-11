<template lang="html">
  <div class="col-12 col-lg-6 col-xl-4 mb-5 d-flex">
    <div class="card w-100">
      <a class="eco-link h-100" href="#">
        <div class="card-body d-flex h-100 p-3 align-items-center row">
          <div class="col-4 eco-img-wrapper text-center px-3">
            <img class="eco-img img-fluid d-inline" :src="image.url">
          </div>
          <div class="col-8 pl-0">
            <h4 class="eco-title mb-1">{{title}}</h4>
            <p class="eco-description mb-0">{{description}}</p>
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

<style lang="scss" scoped>
.eco-link {
  color: inherit;
}

.eco-link:hover{
  text-decoration: none;
  color: inherit;
}

.eco-img {
}

.eco-img-wrapper {
  width: 65px;
  overflow: hidden;
}
</style>
