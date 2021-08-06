<template>
  <div class="p-4 p-lg-5">
    <div class="row row-eq-height gallery-cnt">
      <template v-for="(item, index) in items" v-if="index < maxItems">
        <gallery-item
        :title="item.title" :media="item.media" :credits="item.credits" :blurb="item.blurb" :specs="item.techSpecs"
        />
      </template>
    </div>

    <template v-if="this.page && items.length > 4">
       <b-button v-on:click="expand" class="btn btn-light btn-lg mb-4 mb-lg-5" variant="primary">
        {{ buttonText }}
      </b-button>
    </template>
  </div>
</template>

<script>
  import GalleryItem from '~/components/dynamic/GalleryItem.vue'

  export default {
    components: {
      GalleryItem
    },
    data: function() {
      return {
        expanded: false,
        maxItems: 4,
        buttonText: "See all"
      }
    },
    props: {
      items: {
        type: Array
      },
      page: {
        type: Object
      },
    },
    methods: {
      expand() {
        this.expanded = !this.expanded 
        if(this.expanded == true) {
          this.buttonText = "Collapse"
          this.maxItems = this.items.length
        } else {
          this.buttonText = "See all"
          this.maxItems = 4
        }
      }
    }

  }
</script>