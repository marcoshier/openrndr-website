<template>
  <div>
    <!-- <loading-bar ref="loadingBar" /> -->

    <div v-if="page && !loading" class="bg-primary">
      <!-- BEGIN PageHeader -->
      <page-header v-if="page.title" :title="page.title" :description="page.description" />
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
              <div class="sidebar col-12 col-lg-4 col-xxl-3 p-4 p-lg-5">
                <sidebar :title="page.title" :contentBlocks="page.dynamicContentBlocks" />
              </div>
              <!-- END Sidebar -->

              <div class="col-12 col-lg-8 col-xxl-9 px-0 border-left border-dark">
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
          pageInfo: null,
          loading: true,
          loadingBar: null,
          loadingBarDone: false,
          slug: this.$route.params.slug
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
      this.page = this.currentPage(this.slug)
      if(this.page) {
        this.initialSetup()
      }
    }
  }
</script>
