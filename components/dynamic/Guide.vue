<template>
  <div v-if="allGuides">
    <div v-if="allGuides.length > 0" class="px-4 px-lg-5 pt-4 pt-lg-5">
      <div class="row row-eq-height">
        <template v-for="(item, index) in allGuides">
          <guide-item
          :title="item.title" :description="item.description" :url="item.url" :time="item.estimatedTime" :image="item.image"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import gql from 'graphql-tag'
  import GuideItem from '~/components/dynamic/GuideItem.vue'

  export default {
    apollo: {
      allGuides: gql`{
        allGuides {
          title
          description
          estimatedTime
          url
          image {
            url
            title
            alt
          }
        }
      }`
    },
    components: {
      GuideItem
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
