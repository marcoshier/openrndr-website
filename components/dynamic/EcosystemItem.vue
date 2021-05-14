<template lang="html">
  <div class="col-12 col-lg-6 col-xl-4 mb-4 mb-lg-5 px-0 px-lg-3 d-flex">
    <div class="card w-100">
      <a v-if="url" class="eco-link h-100" href="#">
        <div class="card-body d-flex h-100 p-3 align-items-center row mb-4 mb-sm-0">
          <div class="col-12 col-sm-4 eco-img-wrapper text-center px-3">
            <img class="eco-img img-fluid d-inline" :src="image.url">
          </div>
          <div class="col-12 col-sm-8 px-3 px-sm-0">
            <h4 class="eco-title mb-1 pr-3">{{title}}</h4>
            <p class="eco-description mb-0 pr-3">{{description}}</p>
          </div>
        </div>
      </a>
      <div class="h-100" v-else>
        <div class="card-body d-flex h-100 p-3 align-items-center row mb-4 mb-sm-0">
          <div class="col-12 col-sm-4 eco-img-wrapper text-center px-3">
            <img class="eco-img img-fluid d-inline" :src="image.url">
          </div>
          <div class="col-12 col-sm-8 px-3 px-sm-0">
            <h4 class="eco-title mb-1 pr-3">{{title}}</h4>
            <p class="eco-description mb-0 pr-3">{{description}}</p>
          </div>
        </div>
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
    },
    url: {
      type: String,
      default: undefined
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

.eco-img-wrapper {
  width: 65px;
  overflow: hidden;
}
</style>
