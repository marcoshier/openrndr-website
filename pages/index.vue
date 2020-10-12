<template>
  <div v-if="landing">
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
    Loading
  </div>
</template>

<script>
  import gql from 'graphql-tag'
  import VideoBackground from '~/components/VideoBackground.vue'
  import ContentBlock from '~/components/ContentBlock.vue'

  export default {
    layout: 'home',
    components: {
      VideoBackground,
      ContentBlock
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
        pageInfo: null
      }
    },
    watch: {
      landing: function() {
        if(this.landing) {
          this.initialSetup()
        }
      }
    },
    methods: {
      initialSetup() {
        this.pageInfo = {
          title: 'home',
          slug: '/',
          description: null
        }
      }
    },
    mounted() {
      this.initialSetup()
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
