<template>
  <div v-if="page">
    <!-- BEGIN PageHeader -->
    <page-header v-if="page.title" :title="page.title" :description="page.description" />
    <!-- END PageHeader -->

    <div class="p-4 container border-left border-right border-primary"></div>

    <!-- BEGIN PageBody -->
    <div class="w-100 border-top border-bottom border-primary">
      <div class="container">
        <div class="row row-eq-height">

          <template v-if="hasSidebar">
            <!-- BEGIN Sidebar -->
            <div class="col-12 col-md-4 col-lg-3 pt-4 border-left border-primary">
              <sidebar :title="page.title" :contentBlocks="page.dynamicContentBlocks" />
            </div>
            <!-- END Sidebar -->

            <div class="col-12 col-md-8 col-lg-9 px-0 border-left border-right border-primary">
              <template v-for="(block, index) in page.dynamicContentBlocks">
                <content-block :initTitle="block.title" :initSubtext="block.subtext" :initBodyText="block.bodyText"
                :initAnchorpoint="block.anchorpoint" :initType="block.blockType" :dynamicContent="block.dynamicContent" :initButtons="block.buttons" :page="pageInfo" :initIndex="index" />
              </template>
            </div>
          </template>

          <template v-else>
            <div class="col-12 border-left border-right border-primary px-0">
              <template v-for="(block, index) in page.dynamicContentBlocks">
                <content-block :initTitle="block.title" :initSubtext="block.subtext" :initBodyText="block.bodyText"
                :initAnchorpoint="block.anchorpoint" :initType="block.blockType" :dynamicContent="block.dynamicContent" :initButtons="block.buttons" :page="pageInfo" :initIndex="index" />
              </template>
            </div>
          </template>

        </div>
      </div>
    </div>

    <div class="p-4 container border-left border-right border-primary">
    </div>
    <!-- END PageBody -->
  </div>

  <div v-else-if="$apollo.loading">
    Loading...
  </div>

  <div v-else>
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
      page: {
        query: gql`query Page($slug: String!){
                page(filter: {
                   slug: {
                      eq: $slug
                }}) {
                    title
                    description
                    slug
                    dynamicContentBlocks {
                      title
                      subtext
                      bodyText
                      anchorpoint
                      blockType
                      sidebar
                      buttons {
                        title
                        size
                        linkType
                        url
                      }
                      dynamicContent {
                      ... on ProjectRecord {
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
                      ... on InstagramPostRecord {
                        title
                        link
                        alt
                      }
                    }
                  }
                }
            }`,
        prefetch({route}) {
            return {
                slug: route.params.slug
            }
        },
        variables() {
            return {
                slug: this.$route.params.slug
            }
        },
        loadingKey: 'this.loading',
        watchLoading (isLoading, countModifier) {
          this.loading = isLoading
        },
      }
    },
    data: function() {
      return {
          hasSidebar: false,
          pageInfo: null,
          loading: null
      }
    },
    watch: {
      loading: function() {
        if(!this.loading) {
          if(this.page) {
            this.initialSetup()
          }
        }
      }
    },
    methods: {
      // Loads al initial data in the page component
      initialSetup() {
        this.setSidebar()
        this.pageInfo = {
          title: this.page.title,
          slug: this.page.slug,
          description: this.page.description
        }
      },

      // Check if at least one content block has sidebar enabled
      setSidebar () {
        let self = this

        self.page.dynamicContentBlocks.forEach(function(block, index) {
          if(block.sidebar && block.anchorpoint != '') {
            self.hasSidebar = true
            return
          } else {
            self.hasSidebar = false
          }
        })
      }
    },
    mounted() {
      if(this.page) {
        this.initialSetup()
      }
    }
  }
</script>
