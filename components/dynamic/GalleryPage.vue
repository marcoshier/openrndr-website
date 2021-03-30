<template>
  <div class="pt-4 pt-lg-5 px-3 px-lg-4">
    <div class="row row-eq-height py-0 px-3">
      <template v-for="(item, index) in allProjects">
        <gallery-item
        :title="item.title" :media="item.media" :credits="item.credits" :blurb="item.blurb" :specs="item.techSpecs" class="col-12 col-md-6 col-lg-4"
        />
      </template>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex"
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
    },
    computed: {
      ...mapState({
        allProjects: (state) => state.dynamic.allProjects
      })
    }

  }
</script>
