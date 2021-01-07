<template>
  <div class="px-4 pt-4 px-lg-5 pt-lg-5">
    <div class="row row-eq-height">
      <template v-for="(item, index) in items" v-if="index < 4">
        <instagram-item
        :title="item.title" :url="item.link" :alt="item.alt"
        />
      </template>
    </div>

    <div v-if="items.length > 4">
      <!-- <modal :items="items" :title="this.name" /> -->
      <b-button v-b-modal="'instagram-modal-' + this.id" class="btn btn-light btn-lg mb-4 mb-lg-5" variant="primary">
        See all items
      </b-button>

      <!-- The modal -->
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
            :title="item.title" :url="item.link" :alt="item.alt" initClass="col-12 col-md-6 col-lg-4" initSize="small"
            />
          </template>
        </div>
      </b-modal>
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
        id: null
      }
    },
    methods: {
      close() {
        this.$root.$emit('bv::hide::modal', 'instagram-modal-' + this.id)
      }
    },
    mounted() {
      this.id = this._uid
    }
  }
</script>
