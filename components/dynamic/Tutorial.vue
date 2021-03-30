<template>
  <div v-if="allTutorials">
    <div v-if="allTutorials.length > 0" class="px-4 px-lg-5 pt-4 pt-lg-5">
      <div class="row row-eq-height">
        <template v-for="(item, index) in allTutorials">
          <tutorial-item
          :title="item.title" :description="item.description" :url="item.url" :time="item.estimatedTime" :image="item.image"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex"
  import TutorialItem from '~/components/dynamic/TutorialItem.vue'

  export default {
    components: {
      TutorialItem
    },
    props: {
      name: {
        type: String
      },
      page: {
        type: Object
      }
    },
    computed: {
      ...mapState({
        allTutorials: (state) => state.dynamic.allTutorials
      })
    }
  }
</script>
