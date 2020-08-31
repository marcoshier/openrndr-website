<template>
  <div class="container p-0" :id="anchorpoint ? anchorpoint : ''">
    <div class="p-5 border-primary" v-bind:class="{ 'border-top': borderTop }" v-if="title || subtext">
      <h1 v-if="title" v-bind:class="{ 'mb-0': !subtext }">{{title}}</h1>
      <p v-if="subtext" class="lead">
        {{subtext}}
      </p>

      <div v-if="buttons">
        <template v-for="(button, index) in buttons">
          <nuxt-link v-if="button.linkType == 'intern'" :to="button.url" :class="'btn btn-primary ' + button.class">
            {{button.title}}
          </nuxt-link>

          <a v-else :href="button.url" :class="'btn btn-primary ' + button.class" target="_blank">
            {{button.title}}
          </a>
        </template>
      </div>
    </div>

    <hr v-if="bodyTextDivider && bodyText" class="my-0 border-primary">

    <div v-if="bodyText" class="p-5">
      <div v-html="bodyText">
      </div>
    </div>

    <template v-if="blockType != 'normal'">
      <hr v-if="dynamicContentDivider" class="m-0 border-primary">
      <component v-bind:is="blockType" :items="dynamicContent" :page="page" :name="title"/>
    </template>
  </div>
</template>

<script>
  import Gallery from '~/components/dynamic/Gallery.vue'
  import Instagram from '~/components/dynamic/Instagram.vue'
  import Guide from '~/components/dynamic/Guide.vue'
  import Tutorial from '~/components/dynamic/Tutorial.vue'
  import News from '~/components/dynamic/News.vue'
  import Events from '~/components/dynamic/Events.vue'
  import Workshops from '~/components/dynamic/Workshops.vue'
  import Exhibitions from '~/components/dynamic/Exhibitions.vue'

  export default {
    components: {
      Gallery,
      Instagram,
      Guide,
      Tutorial,
      News,
      Events,
      Workshops,
      Exhibitions
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
      index: {
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
        borderTop: true
      }
    },
    mounted() {
      if(this.index = 0) {
        this.borderTop = false
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

      if(this.initButtons != undefined) {
        if(this.initButtons.length > 0) {

          // Check button size and give it a bootstrap class
          this.initButtons.forEach(function(button, index) {
            switch(button.size) {
              case 'small':
                button.class = 'btn-sm'
                break

              case 'normal':
                button.class = ''
                break

              case 'large':
                button.class = 'btn-lg'
                break

              default:
                button.class = ''

            }
          })

          this.buttons = this.initButtons
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
