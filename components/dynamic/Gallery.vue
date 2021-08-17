<template>
  <div class="p-4 p-lg-5">
    <div class="row row-eq-height gallery-cnt">
      <template v-for="(item, index) in items" v-if="index < maxItems">
        <gallery-item
        :title="item.title" :media="item.media" :credits="item.credits" :blurb="item.blurb" :specs="item.techSpecs"
        />
      </template>
    </div>

    <template v-if="this.page && items.length > 4 && showBtn">
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
        buttonText: "",
        difference: 0,
        showBtn: true
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
    watch: {
      'items': {
        handler: function(items) {
          
          console.log("Items", items)
   
          if(this.expanded == false && items.length > 0) {
            
            this.difference = items.length - this.maxItems
            
            
            if (this.difference > 4) {
              this.buttonText = "Show 4 more"
              this.expanded = true
            } else if (this.difference > 0 && this.difference <= 4) {  
              this.expanded = true
              this.difference -= this.difference
              this.buttonText = "Show " + this.difference + " more"
            } else if(this.difference <= 0) {
              this.showBtn = false
            }
          }
        },
        deep: true,
        immediate: true
      }
    },
    methods: {
      expand() {

            if(this.difference > 4) {
              this.maxItems += 4
              this.difference -= 4
              this.buttonText = "Show " + this.difference + " more"

            } else if (this.difference > 0 && this.difference <= 4) {
              this.maxItems += this.difference
              this.buttonText = "Show " + this.difference + " more"
              this.difference = this.items.length - this.maxItems

              if(this.difference <= 0) {
                this.maxItems = this.items.length
                this.expanded = true
                this.buttonText = "Collapse"
              }
            } else if(this.difference <= 0) {
              this.maxItems = 4
              this.difference = this.items.length - this.maxItems
              this.expanded = false
              this.buttonText = "Show 4 more"
            }
          
      }
    }

  }
</script>