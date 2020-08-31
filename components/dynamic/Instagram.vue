<template>
  <div class="p-5">
    <div class="row row-eq-height">
      <template v-for="(item, index) in items" v-if="index < 4">
        <instagram-item
        :title="item.title" :url="item.link" :alt="item.alt"
        />
      </template>
    </div>

    <div v-if="items.length > 4">
      <!-- Using value -->
      <b-button v-b-modal="'instagram-modal-' + this.id" class="btn btn-primary btn-lg" variant="primary">
        See all items
      </b-button>

      <!-- The modal -->
      <b-modal :id="'instagram-modal-' + this.id" size="xl" scrollable
      :title="this.name"
      :header-bg-variant="'primary'"
      :header-text-variant="'dark'">
        <div class="row row-eq-height">
          <template v-for="(item, index) in items">
            <instagram-item
            :title="item.title" :url="item.link" :alt="item.alt" initSize="small"
            />
          </template>
        </div>
      </b-modal>
    </div>



  </div>
</template>

<script>
  import InstagramItem from '~/components/dynamic/InstagramItem.vue'

  export default {
    components: {
      InstagramItem
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
    mounted() {
      this.id = this._uid
    }
  }
</script>
