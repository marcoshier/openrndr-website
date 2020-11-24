<template>
  <div>
    <loading-bar ref="loadingBar" />

    <div v-if="landing && !loading">
      <!-- BEGIN Video background -->
      <header v-if="landing.banner.media" class="">
        <video-background v-if="landing.banner.media[0].__typename == 'VideoRecord'" :source="landing.banner.media[0].file.provider" :vidId="landing.banner.media[0].file.providerUid" />
        <div v-else>
        </div>
      </header>
      <!-- END Video background -->

      <div class="w-100 border-top border-bottom border-primary">
        <div class="container-xl px-2 px-sm-4 px-lg-5">
          <div class="w-100 border-left border-right border-primary py-2 py-sm-3 py-lg-4">
          </div>
        </div>
      </div>

      <div class="w-100">
        <div class="container-xl px-2 px-sm-4 px-lg-5">
          <div class="row row-eq-height p-0 m-0">
            <div class="col-12 px-0 border-left border-right border-primary">
              <template v-for="(block, index) in landing.dynamicContentBlocks">
                <content-block :initTitle="block.title" :initSubtext="block.subtext" :initBodyText="block.bodyText"
                :initAnchorpoint="block.anchorpoint" :initType="block.blockType" :dynamicContent="block.dynamicContent" :initButtons="block.buttons" :page="pageInfo" :initIndex="index" />
              </template>
            </div>
          </div>
        </div>
      </div>

      <div class="w-100 border-top border-primary">
        <div class="container-xl px-2 px-sm-4 px-lg-5">
          <div class="w-100 border-left border-right border-primary py-2 py-sm-3 py-lg-4">
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <error-message />
    </div>
  </div>
</template>

<script>
  import gql from 'graphql-tag'
  import VideoBackground from '~/components/Video.vue'
  import ContentBlock from '~/components/ContentBlock.vue'
  import LoadingBar from '~/components/LoadingBar.vue'
  import ErrorMessage from '~/components/404.vue'

  export default {
    layout: 'home',
    components: {
      VideoBackground,
      ContentBlock,
      LoadingBar,
      ErrorMessage
    },
    apollo: {
      landing: gql`{
        landing {
          banner {
            media {
              ... on VideoRecord {
                id
                file {
                  height
                  provider
                  providerUid
                  thumbnailUrl
                  title
                  url
                  width
                }
              }
            }
          }
          dynamicContentBlocks {
            title
            subtext
            bodyText
            anchorpoint
            blockType
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
              ... on ProjectRecord {
                id
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
                  ... on GifRecord {
                    credit
                    caption
                    file {
                      url
                    }
                  }
                  ... on VideoRecord {
                    file {
                      url
                      thumbnailUrl
                    }
                    credits
                    caption
                  }
                }
              }
              ... on InstagramPostRecord {
                    title
                    link
                    alt
            	}
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
            }
          }
        }
      }`
    },
    data: function() {
      return {
        hasSidebar: false,
        pageInfo: null,
        loading: null,
        loadingBar: null,
        loadingBarDone: false
      }
    },
    watch: {
      loading: function() {
        if(!this.loading) {
          if(this.landing) {
            this.initialSetup()
          }
        }
      }
    },
    methods: {
      // Setup the loadingBar
      setupLoadingBar() {
        this.loadingBar = this.$refs.loadingBar

        if(this.loading && !this.loading) {
          // Page is already loaded
          // Don't display loading bar
          this.loadingBar.hideLoadingBar()
        }
      },
      initialSetup() {
        this.pageInfo = {
          title: 'home',
          slug: '/',
          description: null
        }
      }
    },
    mounted() {
      this.setupLoadingBar()

      if(this.landing) {
        this.initialSetup()
      }

    }
  }
</script>

<style>
  .getting-started-link {
    font-size: 22px;
    min-width: 330px;
    padding-top: 12px;
    padding-bottom: 12px;
   }

  .arrow-next {
    width: 40px;
    height: 59px;
  }

  @media only screen and (max-width: 1199px) {
    .arrow-next {
      height: 50px;
      width: 30px;
    }

    .getting-started-link {
      font-size: 20px;
      min-width: 260px;
      padding-top: 8px;
      padding-bottom: 8px;
     }
  }

  @media only screen and (max-width: 991px) {
    .arrow-next {
      height: 43px;
      width: 30px;
    }

    .getting-started-link {
      font-size: 17px;
      min-width: 150px;
      padding-top: 8px;
      padding-bottom: 8px;
     }
  }
</style>
