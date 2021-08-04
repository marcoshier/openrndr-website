<template>
  <div>
    <!-- <loading-bar ref="loadingBar" /> -->

    <div v-if="landing && !loading">
      <!-- BEGIN Video background -->
      <header v-if="landing.banner && landing.banner.media" class="bg-primary">
        <video-background v-if="landing.banner.media[0].__typename == 'VideoRecord'" :source="landing.banner.media[0].file.provider" :vidId="landing.banner.media[0].file.providerUid" />
        <div v-else>
        </div>
      </header>
      <!-- END Video background -->

      <!-- <div class="w-100 border-bottom border-primary bg-primary">
        <div class="container-xl px-2 px-sm-4 px-lg-5">
          <div class="w-100 border-left border-right border-primary py-2 py-sm-3 py-lg-4">
          </div>
        </div>
      </div> -->

      <div class="w-100">
        <div class="container-fluid px-0 mx-0">
          <div class="row row-eq-height p-0 m-0">
            <div class="col-12 px-0 border-primary">
              <template v-for="(block, index) in landing.dynamicContentBlocks">
                <content-block :initTitle="block.title" :initSubtext="block.subtext" :initBodyText="block.bodyText"
                :initAnchorpoint="block.anchorpoint" :initType="block.blockType" :dynamicContent="block.dynamicContent" :initButtons="block.buttons" :page="pageInfo" :initIndex="index" />
              </template>
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="w-100 border-top border-primary bg-primary">
        <div class="container-xl px-2 px-sm-4 px-lg-5">
          <div class="w-100 border-left border-right border-primary py-2 py-sm-3 py-lg-4">
          </div>
        </div>
      </div> -->
    </div>
    <div v-else-if="loading">
    </div>
    <div v-else-if="!landing && !loading">
      <error-message />
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex"
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
          if(typeof this.landing != undefined) {
            this.initialSetup()
          } else {
            this.landing = false
          }
        }
      }
    },
    computed: {
     ...mapState({
       landing: (state) => state.landingPage.content
     }),
    },
    methods: {
      // Setup the loadingBar
      setupLoadingBar() {
        this.loadingBar = this.$refs.loadingBar

        if(this.landing && !this.loading) {
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
      },
    },
    mounted() {
      // this.setupLoadingBar()

      if(typeof this.landing != undefined) {
        this.initialSetup()
      } else {
        this.landing = false
      }

    }
  }
</script>