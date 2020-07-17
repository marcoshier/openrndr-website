<template>
  <div v-if="about" class="">
    <!-- BEGIN PageHeader -->
    <page-header v-if="about.header[0]" :title="about.header[0].title" :description="about.header[0].description" />
    <!-- END PageHeader -->

    <!-- BEGIN PageBody -->
    <div class="container">
      <div class="row row-eq-height">

        <!-- BEGIN Sidebar -->
        <div class="col-12 col-md-4 col-lg-3 mt-4">
          <sidebar :title="about.header[0].title" :contentBlocks="about.contentBlocks" />
        </div>
        <!-- END Sidebar -->

        <div class="col-12 col-md-8 col-lg-9">
          <template v-for="(block, index) in about.contentBlocks">
            <content-block :initTitle="block.title" :initSubtext="block.subtext" :initBodyText="block.bodyText"
            :initAnchorpoint="block.anchorpoint" />
          </template>
        </div>
      </div>
    </div>
    <!-- END PageBody -->
  </div>

  <div v-else>
    Error
  </div>
</template>

<script>
  import gql from 'graphql-tag'
  import PageHeader from '~/components/PageHeader.vue'
  import Sidebar from '~/components/Sidebar.vue'
  import ContentBlock from '~/components/ContentBlock.vue'

  export default {
    layout: 'sidebar',
    components: {
      PageHeader,
      Sidebar,
      ContentBlock
    },
    apollo: {
      about: gql`{
        about {
          header {
            title
            description
          }
          contentBlocks {
            bodyText
            subtext
            title
            anchorpoint
            sidebar
          }
        }
      }`
    },
    data: function() {
      return {

      }
    },
    mounted() {
      console.log(dato.env.AUTH_TOKEN)
    }
  }
</script>
