<template>
  <div v-if="allTutorials">
    <div v-if="allTutorials.length > 0" class="px-5 pt-5">
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
  import gql from 'graphql-tag'
  import TutorialItem from '~/components/dynamic/TutorialItem.vue'

  export default {
    apollo: {
      allTutorials: gql`{
        allTutorials {
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
      TutorialItem
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
