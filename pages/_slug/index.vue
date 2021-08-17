<template>
  <div>
    <!-- <loading-bar ref="loadingBar" /> -->

    <div v-if="page && !loading" class="bg-primary">
      <!-- BEGIN PageHeader -->
      <page-header v-if="page.title && page.title !='Articles'" :title="page.title" :description="page.description" />
      <!-- END PageHeader -->

      <!-- <div class="w-100 border-top border-bottom border-primary bg-primary">
        <div class="container-fluid px-2 px-sm-4 px-lg-5">
          <div class="w-100 border-left border-right border-primary py-2 py-sm-3 py-lg-4">
          </div>
        </div>
      </div> -->

      <!-- BEGIN PageBody -->
      <div class="w-100 border-primary">
        <div class="container-fluid px-0">
          <div class="row row-eq-height m-0">

            <template v-if="hasSidebar">
              <!-- BEGIN Sidebar -->
              <div class="sidebar col-12 col-lg-2 col-xxl-2 p-4 p-lg-0">
                <sidebar :title="page.title" :contentBlocks="page.dynamicContentBlocks" />
              </div>
              <!-- END Sidebar -->

              <div class="col-12 col-lg-10 col-xxl-10 px-0 border-left border-dark">
                
                <!--<div id="marker" style="position: absolute; width: 10vw; right: 0; background-color: red; z-index: 99"></div>-->
                <template v-for="(block, index) in page.dynamicContentBlocks">
                  <content-block :initTitle="block.title" :initSubtext="block.subtext" :initBodyText="block.bodyText"
                  :initAnchorpoint="block.anchorpoint" :initType="block.blockType" :dynamicContent="block.dynamicContent" :initButtons="block.buttons" :page="pageInfo" :initIndex="index" />
                </template>
              </div>
            </template>

            <template v-else-if="isCommunity">
              <div class="col-12 col-lg-12 col-xxl-12 px-0 border-left border-dark">
                <div class="d-flex flex-row">
                  <template v-for="(block, index) in page.dynamicContentBlocks" v-if="index < 3">
                    <content-block :initTitle="block.title" :initSubtext="block.subtext" :initBodyText="block.bodyText"
                    :initAnchorpoint="block.anchorpoint" :initType="block.blockType" :dynamicContent="block.dynamicContent" :initButtons="block.buttons" :page="pageInfo" :initIndex="index" class="border-right"/>
                  </template>
                </div>
                
                <div>
                <template v-for="(block, index) in page.dynamicContentBlocks" v-if="index == 3">
                    <content-block :initTitle="block.title" :initSubtext="block.subtext" :initBodyText="block.bodyText"
                    :initAnchorpoint="block.anchorpoint" :initType="block.blockType" :dynamicContent="block.dynamicContent" :initButtons="block.buttons" :page="pageInfo" :initIndex="index" />
                  </template>
                </div>
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

      <!-- <div class="w-100 border-top border-bottom border-primary bg-primary">
        <div class="container-fluid px-2 px-sm-4 px-lg-5">
          <div class="w-100 border-left border-right border-primary py-2 py-sm-3 py-lg-4">
          </div>
        </div>
      </div> -->
      <!-- END PageBody -->
    </div>
    <div v-else-if="loading"></div>
    <div v-else>
      <error-message />
    </div>

    <!-- <div v-else-if="$apollo.loading && test">
      <loading-bar />
    </div> -->

    <!-- <div v-else>
      <h1>Page not found</h1>
    </div> -->
  </div>
</template>

<script>
  import { mapGetters } from "vuex"
  import PageHeader from '~/components/PageHeader.vue'
  import Sidebar from '~/components/Sidebar.vue'
  import ContentBlock from '~/components/ContentBlock.vue'
  // import LoadingBar from '~/components/LoadingBar.vue'
  import ErrorMessage from '~/components/404.vue'

  export default {
    scrollToTop: true,
    layout: 'sidebar',
    components: {
      PageHeader,
      Sidebar,
      ContentBlock,
      // LoadingBar,
      ErrorMessage
    },
    data: function() {
      return {
          page: false,
          hasSidebar: false,
          isCommunity: false,
          pageInfo: null,
          loading: true,
          loadingBar: null,
          loadingBarDone: false,
          slug: this.$route.params.slug,
      }
    },
    computed: {
     ...mapGetters(
       ['currentPage']
     ),
    },
    watch: {
      page: function() {
        if(this.page || typeof this.page === 'undefined') {
          this.loading = false
        }
      }
    },
    methods: {
      // Setup the loadingBar
      // setupLoadingBar() {
      //   this.loadingBar = this.$refs.loadingBar
      //
      //   if(this.page && !this.loading) {
      //     // Page is already loaded
      //     // Don't display loading bar
      //     this.loadingBar.hideLoadingBar()
      //   }
      // },
      // Loads al initial data in the page component
      initialSetup() {
        this.checkCommunity()
        if(this.isCommunity == false) {
          this.setSidebar()
        }
        this.pageInfo = {
          title: this.page.title,
          slug: this.page.slug,
          description: this.page.description
        }
      },

      checkCommunity() {
        let self = this
        if(self.page.title == "Community") {
          self.isCommunity = true
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
      },
      handleScroll() {

        let contentBlockCnts = this.$el.querySelectorAll(".content-block-cnt")

        contentBlockCnts.forEach(contentBlock => {
          let rect = contentBlock.getBoundingClientRect()
          let headerHeight = 75
          let debounce = 10


          let topDistance = (window.innerHeight - headerHeight) - rect.y - debounce

          // let marker = document.getElementById("marker")
          // marker.style.backgroundColor = "blue"
          // marker.style.height = topDistance + "px"


          if(topDistance > 0 && topDistance < window.innerHeight) {
            // pass to sidebar
            this.$store.dispatch("blockChange", contentBlock.id)
          }

        })
      }
    },
    mounted() {
      this.page = this.currentPage(this.slug)
      if(this.page) {
        this.initialSetup()
      }
    },
    beforeMount () {
      window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }
</script>
