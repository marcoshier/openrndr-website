<template lang="html">
   <div class="mb-1 mb-lg-1 px-0 px-lg-3">
    
    <div class="card border-0" :class="{'hovered' : hovered}" v-on:mouseover="showLinks" v-on:mouseout="hideLinks">
      <a v-if="url" class="eco-link h-100" :href="url">
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
    <div class="links-modal p-3">
      <a v-if="url" :href="url">
         Example
      </a>
      <span> ‎| ‎</span>
      <a v-if="url" :href="url">
         Docs
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
    url: {
      type: String,
      default: undefined
    },
    image: {
      type: Object
    },
  },
  data: function(){
    return {
      hovered: false
    }
  },
  methods: {
    showLinks() {
      this.hovered = true
    },
    hideLinks() {
      this.hovered = false
    }
  }
}
</script>

<style lang="scss" scoped>
.links-modal {
  position: relative;
  background: #ffc0cb;
  text-align: center;
  border-radius: 2px;
  bottom: 20px;
}

.card {
  display: inline-block;
}

.card {
  left: 50%;
  transform: translateX(-50%);
  transition: all 0.1s ease;
  background-color: transparent !important;
  height: 120px
}

.card:hover {
  transform: translateX(-50%);
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
