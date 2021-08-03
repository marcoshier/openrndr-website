<template lang="html">
   <div class="mb-4 mb-lg-5 px-0 px-lg-3">
    <div class="card">
      <a v-if="url" class="eco-link h-100" href="#">
        <div class="card-body d-flex h-100 p-3 align-items-center mb-4 mb-sm-0">
          <div class="col-12 eco-img-wrapper text-center px-3">
            <img class="eco-img img-fluid d-inline" :src="image.url">
          </div>
        </div>
      </a>
      <div v-else>
        <div class="card-body h-100 p-3 align-items-center mb-4 mb-sm-0">
          <div class="col-12 eco-img-wrapper text-center px-3">
            <img class="eco-img img-fluid d-inline" :src="image.url">
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
.card {
  display: inline-block;
}

.card {
  transform: scale(1);
  transition: all 0.1s ease;
  background-color: transparent !important;
}

.card:hover {
  background-color: #ffb8c5 !important;
  transform: scale(0.97);
  transition: all 0.2s ease;
}

.eco-img {
  max-width: 100px;
}

.eco-link {
  color: inherit;
}

.eco-description {
  font-size: 1.2rem;
  }

.eco-item {
  padding-left: 2rem;
  }

.eco-link:hover{
  text-decoration: none;
  color: inherit;
}

.eco-img-wrapper {
  width: 100px;
  overflow: hidden;
}
</style>
