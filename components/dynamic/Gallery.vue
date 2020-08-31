<template>
  <div class="p-5">
    <div class="row row-eq-height">
      <template v-for="(item, index) in items" v-if="index < 4">
        <gallery-item
        :title="item.title" :media="item.media" :credits="item.credits" :blurb="item.blurb" :specs="item.techSpecs"
        />
      </template>
    </div>

    <template v-if="this.page">
      <nuxt-link v-if="items.length > 4" :to="this.page.slug + '/gallery'" :class="'btn btn-primary btn-lg'">
        See all gallery items
      </nuxt-link>
    </template>
  </div>
</template>

<script>
  import GalleryItem from '~/components/dynamic/GalleryItem.vue'

  export default {
    components: {
      GalleryItem
    },
    props: {
      items: {
        type: Array
      },
      page: {
        type: Object
      }
    }
  }
</script>
