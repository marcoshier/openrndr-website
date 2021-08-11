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
          let difference = this.items.length - this.maxItems
          if(this.expanded == false) {
            if(this.items.length > this.maxItems && difference >= 5) {
              this.maxItems += 5
              this.buttonText = "Show 5 more"
            } else if (this.items.length > this.maxItems && difference < 5) {
              this.maxItems += difference
              this.buttonText = "Show " + difference + " more"
            } else if(this.items.length <= this.maxItems && difference < 5) {
              this.maxItems = this.items.length
              this.expanded = true
              this.buttonText = "Collapse"
            }
          } else {
            this.maxItems = 4
            this.buttonText = "Show 5 more"
          }
          
      }
    }

  }
</script>