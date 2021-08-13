<template>
  <div class="px-4 pt-4 px-lg-5 pt-lg-5">
    <div class="row row-eq-height">
      <template v-for="(item, index) in items" v-if="index < maxItems">
        <instagram-item
        :title="item.title" :url="item.link" :thumbnail="item.thumbnail"
        />
      </template>
    </div>

    <div v-if="items.length > 4">
      <!-- <modal :items="items" :title="this.name" /> -->
      <b-button v-on:click="expand" class="btn btn-light btn-lg mb-4 mb-lg-5" variant="primary">
        {{ buttonText }}
      </b-button>

      <!-- The modal 
      <b-modal :id="'instagram-modal-' + this.id" size="xl" scrollable
      :header-bg-variant="'primary'"
      :header-text-variant="'dark'"
      :class="'instagram-modal'"
      hide-footer
      >
        <template v-slot:modal-header>
          <h3 class="mb-0 p-3 w-100">
            <span>{{name}}</span>
            <span @click="close()" class="clickable float-right"><font-awesome-icon :icon="['fas', 'times']" /></span>
          </h3>
        </template>
        <div class="row row-eq-height p-3">
          <template v-for="(item, index) in items">
            <instagram-item
            :title="item.title" :url="item.link" :thumbnail="item.thumbnail" initClass="col-12 col-md-6 col-lg-4" initSize="small" popup
            />
          </template>
        </div>
      </b-modal>-->
    </div>



  </div>
</template>

<script>
  import InstagramItem from '~/components/dynamic/InstagramItem.vue'
  import Modal from '~/components/Modal.vue'

  export default {
    components: {
      InstagramItem,
      Modal
    },
    props: {
      name: {
        type: String
      },
      items: {
        type: Array
      },
      page: {
        type: Object
      }
    },
    data: function() {
      return {
        id: null,
        expanded: false,
        maxItems: 4, 
        buttonText: "Show 5 more",
        difference: 0,
        showBtn: true
      }
    },
    methods: {
     /* close() {
        this.$root.$emit('bv::hide::modal', 'instagram-modal-' + this.id)
      }*/
      expand() {
                
          //TODO add scroll restore
          if(this.expanded == false) {
            if(this.difference >= 5) {
              this.maxItems += 5
              this.buttonText = "Show 5 more"
            } else if (this.difference > 0 && this.difference < 5) {
              this.maxItems += this.difference
              this.buttonText = "Show " + this.difference + " more"
              this.difference = this.items.length - this.maxItems

              if(this.difference <= 0) {
                this.maxItems = this.items.length
                this.expanded = true
                this.buttonText = "Collapse"
              }
            } else if(this.difference <= 0) {
              this.maxItems = this.items.length
              this.expanded = true
              this.buttonText = "Collapse"
            }
            
          } else {
            this.expanded = false
            this.maxItems = 4
            this.difference = this.items.length - this.maxItems
            this.buttonText = "Show " + this.difference + " more"
          }
      }
    },
    mounted() {
      this.id = this._uid

      
      if(this.expanded == false) {
        this.difference = this.items.length - this.maxItems
        
        if (this.difference >= 5) {
          this.buttonText = "Show 5 more"
        } else if (this.difference > 0 && this.difference < 5) {  
          this.buttonText = "Show " + this.difference + " more"
        } else if(this.difference <= 0) {
          this.showBtn = false
        }
      }
    }
  }
</script>
