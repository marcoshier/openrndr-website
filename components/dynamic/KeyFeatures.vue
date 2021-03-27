\<template lang="html">
  <div v-if="allFeatures" class="row px-4 pt-4 px-lg-5 pt-lg-5 m-0">
    <key-feature-item v-for="(feature, index) in allFeatures"
      :title="feature.title"
      :description="feature.description"
      :index="index"
      :key="index"
    />
  </div>
</template>

<script>
import KeyFeatureItem from '~/components/dynamic/KeyFeatureItem.vue'
import { mapState } from "vuex"

export default {
  components: {
    KeyFeatureItem
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
     allFeatures: (state) => state.landingPage.allKeyFeatures
   })
  }
}
</script>
