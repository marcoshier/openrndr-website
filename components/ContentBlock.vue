<template>
  <div class="w-100 px-0 py-5 border-white" v-bind:class="{ 'border-top': borderTop }" :id="anchorpoint ? anchorpoint : ''">
    <div class="container-xl">

      <div class="px-4 pt-4 px-lg-5 pt-lg-5" v-if="title || subtext">
        <h1 v-if="title" v-bind:class="{ 'mb-0': !subtext }">{{title}}</h1>
        <p v-if="subtext" class="lead">
          {{subtext}}
        </p>

        <div v-if="buttons">
          <template v-for="(button, index) in buttons">
            <vue-button
              :type="button.linkType"
              :url="button.url"
              :size="button.size"
              :title="button.title"
              :page="button.page"
              :anchorpoint="button.anchorpoint"
              :parentClasses="button.class"
            />
          </template>
        </div>
      </div>

      <!-- <hr v-if="bodyTextDivider && bodyText" class="my-0 mx-4 mx-lg-5 border-white"> -->

      <div v-if="bodyText" class="p-4 p-lg-5">
        <div v-html="bodyText" class="wizywig">
        </div>
      </div>

      <template v-if="blockType != 'normal'">
        <!-- <hr v-if="dynamicContentDivider" class="my-0 mx-4 mx-lg-5 border-white"> -->
        <component v-bind:is="blockType" :items="dynamicContent" :page="page" :name="title" :type="blockType"/>
      </template>

    </div>
  </div>
</template>

<script>
  import VueButton from '~/components/Button.vue'

  // Dynamic content
  import Gallery from '~/components/dynamic/Gallery.vue'
  import GalleryPage from '~/components/dynamic/GalleryPage.vue'
  import Instagram from '~/components/dynamic/Instagram.vue'
  import Guide from '~/components/dynamic/Guide.vue'
  import Tutorial from '~/components/dynamic/Tutorial.vue'
  import News from '~/components/dynamic/News.vue'
  import Events from '~/components/dynamic/CalendarCategory.vue'
  import Workshops from '~/components/dynamic/CalendarCategory.vue'
  import Exhibitions from '~/components/dynamic/CalendarCategory.vue'
  import GettingStarted from '~/components/dynamic/GettingStarted.vue'
  import KeyFeatures from '~/components/dynamic/KeyFeatures.vue'
  import Ecosystem from '~/components/dynamic/Ecosystem.vue'
  import Faq from '~/components/dynamic/FaQ.vue'

  export default {
    components: {
      VueButton,
      Gallery,
      GalleryPage,
      Instagram,
      Guide,
      Tutorial,
      News,
      Events,
      Workshops,
      Exhibitions,
      GettingStarted,
      KeyFeatures,
      Ecosystem,
      Faq
    },
    props: {
      initTitle: {
        type: String
      },
      initSubtext: {
        type: String
      },
      initBodyText: {
        type: String
      },
      initButtons: {
        type: Array
      },
      initAnchorpoint: {
        type: String
      },
      initType: {
        type: String
      },
      dynamicContent: {
        type: Array
      },
      page: {
        type: Object
      },
      initIndex: {
        type: Number
      }
    },
    data: function() {
      return {
        title: null,
        subtext: null,
        bodyText: null,
        bodyTextDivider: false,
        dynamicContentDivider: false,
        anchorpoint: null,
        blockType: 'normal',
        buttons: null,
        buttonClass: null,
        index: null,
        borderTop: true
      }
    },
    mounted() {
      if(this.initIndex != undefined) {
        this.index = this.initIndex

        if(this.index == 0) {
          this.borderTop = false
        }
      }

      if(this.initTitle != undefined) {
        this.title = this.initTitle
      }

      if(this.initSubtext != undefined) {
        this.subtext = this.initSubtext
      }

      if(this.initBodyText != undefined) {
        this.bodyText = this.initBodyText

        // Set state of divider above bodyText
        if(this.title || this.subtext || this.initButtons.length > 0) {
          this.bodyTextDivider = true
        }
      }

      if(this.initAnchorpoint != undefined) {
        this.anchorpoint = this.initAnchorpoint
      }

      if (this.initType != undefined) {
        this.blockType = this.initType
      }

      // Set buttons array and classList for buttons
      if(this.initButtons != undefined) {
        if(this.initButtons.length > 0) {
          this.buttons = this.initButtons

          // Give spacing class if there are multiple buttons
          let buttonCounter = 1
          let self = this

          this.buttons.forEach(function(button, index) {
            if(buttonCounter < self.buttons.length) {
              button.class = 'mr-3'
            } else {
              button.class = ''
            }

            buttonCounter++
          })
        }
      }

      if(this.blockType != 'normal') {
        // Set state of divider above dynamic content
        if(this.title || this.subtext || this.bodyText || this.initButtons.length > 0) {
          this.dynamicContentDivider = true
        }
      }
    }
  }
</script>
