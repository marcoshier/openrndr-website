<template>
  <div v-if="pageChild">
    <template v-if="pageChild.parentPage.slug == slug">
      <!-- BEGIN PageHeader -->
      <page-header v-if="pageChild.title" :title="pageChild.title" :description="pageChild.description" />
      <!-- END PageHeader -->

      <div class="p-4 container border-left border-right border-primary"></div>

      <!-- BEGIN PageBody -->
      <div class="w-100 border-top border-bottom border-primary">
        <div class="container">
          <div class="row row-eq-height">

            <template v-if="hasSidebar">
              <!-- BEGIN Sidebar -->
              <div class="col-12 col-md-4 col-lg-3 pt-4 border-left border-primary">
                <sidebar :title="pageChild.title" :contentBlocks="pageChild.dynamicContentBlocks" />
              </div>
              <!-- END Sidebar -->

              <div class="col-12 col-md-8 col-lg-9 px-0 border-left border-right border-primary">
                <template v-for="(block, index) in pageChild.dynamicContentBlocks">
                  <content-block :initTitle="block.title" :initSubtext="block.subtext" :initBodyText="block.bodyText"
                  :initAnchorpoint="block.anchorpoint" :initType="block.blockType" :dynamicContent="block.dynamicContent" :initButtons="block.buttons" :page="pageInfo" :initIndex="index" />
                </template>
              </div>
            </template>

            <template v-else>
              <div class="col-12 border-left border-right border-primary px-0">
                <template v-for="(block, index) in pageChild.dynamicContentBlocks">
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
    </template>

    <div v-else>
      <h1>Page not found</h1>
    </div>
  </div>

  <div v-else-if="$apollo.loading">
    Loading...
  </div>

  <div v-else>
    <h1>Page not found</h1>
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
      pageChild: {
        query: gql`query PageChild($subSlug: String!){
                pageChild(filter: {
                   slug: {
                      eq: $subSlug
                }}) {
                    title
                    description
                    slug
                    parentPage {
                      slug
                    }
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
                        anchorpoint
                        page {
                          ... on PageRecord {
                            slug
                          }
                          ... on PageChildRecord {
                            slug
                            parentPage {
                              slug
                            }
                          }
                        }
                      }
                      dynamicContent {
                      ... on PageButtonRecord {
                        title
                        size
                        linkType
                        url
                        anchorpoint
                        page {
                          ... on PageRecord {
                            slug
                          }
                          ... on PageChildRecord {
                            slug
                            parentPage {
                              slug
                            }
                          }
                        }
                      }
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
                slug: route.params.slug,
                subSlug: route.params.subslug
            }
        },
        variables() {
            return {
                slug: this.$route.params.slug,
                subSlug: this.$route.params.subslug
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
          loading: null,
          slug: this.$route.params.slug,
          subSlug: this.$route.params.subslug
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
          title: this.pageChild.title,
          slug: this.pageChild.slug,
          description: this.pageChild.description
        }
      },

      // Check if at least one content block has sidebar enabled
      setSidebar () {
        let self = this

        self.pageChild.dynamicContentBlocks.forEach(function(block, index) {
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
      console.log(this.slug)
      if(this.page) {
        this.initialSetup()
      }
    }
  }
</script>
