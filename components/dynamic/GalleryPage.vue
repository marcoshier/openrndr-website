<template>
  <div class="pt-5 px-4">
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
  import gql from 'graphql-tag'
  import GalleryItem from '~/components/dynamic/GalleryItem.vue'

  export default {
    apollo: {
      allProjects: gql`{
        allProjects {
          title
          blurb
          techSpecs
          credits
          url
          media {
            ... on ImageRecord {
              file {
                url
              }
              credits
              caption
            }
            ... on VideoRecord {
              credits
              caption
              file {
                url
                thumbnailUrl
              }
            }
            ... on GifRecord {
              credit
              caption
              file {
                url
              }
            }
          }
        }
      }`
    },
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
