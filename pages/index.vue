<template>
  <div>
    <!-- <loading-bar ref="loadingBar" /> -->

    <div v-if="landing && !loading">
      <!-- BEGIN Video background -->
      <header id="video-cnt" v-if="landing.banner && landing.banner.media" class="bg-primary">  
        <div class="video-text">
          <h1>Playful for<br />prototypes. <br />Serious for<br />production.</h1>
          <span>OPENRNDR is an open source framework for creative coding, written in Kotlin that simplifies writing real-time interactive software.</span>
        </div>
        <video-background  v-if="landing.banner.media[0].__typename == 'VideoRecord'" :source="landing.banner.media[0].file.provider" :vidId="landing.banner.media[0].file.providerUid" />
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
                :initAnchorpoint="block.anchorpoint" :initType="block.blockType" :dynamicContent="block.dynamicContent" :initButtons="block.buttons" :page="pageInfo" :initIndex="index"/>
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
      },
    },
    computed: {
     ...mapState({
       landing: (state) => state.landingPage.content
     })
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
      toggleBorder() {
        let videocnt = document.getElementById("video-cnt").getBoundingClientRect()
        this.$store.dispatch("toggleBorder", videocnt.y)
      }
    },
    mounted() {
      // this.setupLoadingBar()

      if(typeof this.landing != undefined) {
        this.initialSetup()
      } else {
        this.landing = false
      }

    },
    beforeMount () {
      window.addEventListener('scroll', this.toggleBorder);
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.toggleBorder);
    }
  }
</script>
<style scoped> 
  .video-text {
      display: flex;
      flex-direction: column;
      margin: 0 0 0 3rem;
      position: absolute;
      top: 19vh;
      max-width: 40vw;
      z-index: 2;
  }

  h1, span {
    color: white;
  }

  h1 {
    font-family: 'Inter', sans-serif;
    line-height: 1.07;
    font-size: 8.85vh;
  }

  span {
    font-family: 'IBM Plex Mono';
    display: block;
    margin: 40px 0 0 0;
    font-size: 1.025rem;
  }


  @media screen and (max-width: 1133px) {

    .video-text { 
       max-width: 90vw;
       flex-direction: row;
       justify-content: space-between;
       margin: 7.5vh 0 0 5vw;
    }

    h1 {
      font-size: 6.5vw;
    }

    span {
      font-size: 2.1vh;
      margin: 10px 0 0 100px;
    }
  }

  @media screen and (max-width: 692px) {
    .video-text { 
       margin: 3vh 0 0 5vw;
    }

    span {
      font-size: 2.8vw;
      margin: 10px 0 0 50px;
    }
  }

  @media screen and (max-height: 637px) {
    .video-text { 
       max-width: 70vw;
       flex-direction: row;
       justify-content: space-between;
       margin: 7.5vh 0 0 12vw;
    }

    span {
      font-size: 1.4vw;
      margin: 10px 0 0 160px;
    }
  }
</style>