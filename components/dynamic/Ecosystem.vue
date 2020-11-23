<template lang="html">
  <div v-if="allEcosystems" class="row row-eq-height px-4 pt-4 px-lg-5 pt-lg-5 m-0">
    <ecosystem-item v-for="(item, index) in allEcosystems"
      :title="item.title"
      :description="item.description"
      :image="item.image"
      :url="item.link"
      :index="index"
      :key="index"
    />
  </div>
</template>

<script>
import gql from 'graphql-tag'
import EcosystemItem from '~/components/dynamic/EcosystemItem.vue'

export default {
  apollo: {
    allEcosystems: gql`{
      allEcosystems {
        title
        description
        link
        image {
          url
          alt
          title
        }
      }
    }`
  },
  components: {
    EcosystemItem
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

<style lang="scss" scoped>
</style>
