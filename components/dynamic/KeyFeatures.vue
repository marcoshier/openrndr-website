<template lang="html">
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
import gql from 'graphql-tag'
import KeyFeatureItem from '~/components/dynamic/KeyFeatureItem.vue'

export default {
  apollo: {
    allFeatures: gql`{
      allFeatures {
        title
        description
      }
    }`
  },
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
  }
}
</script>
