<template>
  <div>
    <!-- <loading-bar ref="loadingBar" /> -->
    <div v-if="pageChild && !loading" class="bg-primary">
      <!-- BEGIN PageHeader -->
      <page-header v-if="pageChild.title" :title="pageChild.title" :description="pageChild.description" />
      <!-- END PageHeader -->

      <!-- <div class="w-100 border-top border-bottom border-primary">
        <div class="container-fluid px-2 px-lg-5">
          <div class="w-100 border-left border-right border-primary py-2 py-lg-4">
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
                <sidebar :title="pageChild.title" :contentBlocks="pageChild.dynamicContentBlocks" />
              </div>
              <!-- END Sidebar -->

              <div class="col-12 col-lg-10 col-xxl-10 px-0 border-left border-dark">
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

      <!-- <div class="w-100 border-top border-bottom border-primary">
        <div class="container-fluid px-2 px-lg-5">
          <div class="w-100 border-left border-right border-primary py-2 py-lg-4">
          </div>
        </div>
      </div> -->
      <!-- END PageBody -->
    </div>
    <div v-if="loading"></div>
    <div v-else>
      <error-message />
    </div>
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
          pageChild: false,
          hasSidebar: false,
          pageInfo: null,
          loading: true,
          loadingBar: null,
          loadingBarDone: false,
          slug: this.$route.params.slug,
          subSlug: this.$route.params.subslug
      }
    },
    computed: {
     ...mapGetters(
       ['currentPageChild']
     ),
    },
    watch: {
      pageChild: function() {
        if(this.pageChild || typeof this.pageChild === 'undefined') {
          this.loading = false
        }
      }
    },
    methods: {
      // Setup the loadingBar
      // setupLoadingBar() {
      //   this.loadingBar = this.$refs.loadingBar
      //
      //   if(this.pageChild && !this.loading) {
      //     // Page is already loaded
      //     // Don't display loading bar
      //     this.loadingBar.hideLoadingBar()
      //   }
      // },
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
      this.pageChild = this.currentPageChild(this.subSlug)
      if(this.pageChild) {
        this.initialSetup()
      }
    }
  }
</script>
