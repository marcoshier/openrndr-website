<template lang="html">
  <div v-if="action" :class="'d-inline-block ' + parentClasses">
    <nuxt-link v-if="type == 'intern' && !gettingStarted" :to="action" :class="'btn btn-primary border-dark' + sizeClass + ' ' + buttonClasses">
      {{title}}
    </nuxt-link>

    <nuxt-link v-else-if="type == 'intern' && gettingStarted == true" :to="action">
      <svg class="getting-started-link-svg" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          viewBox="0 0 271 72.9" style="enable-background:new 0 0 271 72.9;" xml:space="preserve">

          <path class="arrowbox" d="M246.6,72.2H3.9c-1.6,0-3-1.3-3-3V3.7c0-1.7,1.4-3,3-3h242.7c1.7,0,3.3,1.3,4.1,3l19.4,32.4l-19.4,33.1
          C249.7,71,248.2,72.2,246.6,72.2z"/>
          <text class="svg-text" x="45%" y="50%" dominant-baseline="middle" text-anchor="middle">{{ title }}</text>

        </svg>
    </nuxt-link>

    <a v-else-if="type == 'extern'" :href="action" :class="'btn btn-primary border-dark' + sizeClass + ' ' + buttonClasses" target="_blank">
      {{title}}
    </a>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String
    },
    title: {
      type: String
    },
    url: {
      type: String,
      default: undefined
    },
    size: {
      type: String,
      default: null
    },
    page: {
      type: Object,
      default: undefined
    },
    anchorpoint: {
      type: String,
      default: undefined
    },
    buttonClasses: {
      type: String
    },
    parentClasses: {
      type: String
    },
    gettingStarted: {
      type: Boolean
    }
  },
  data: function() {
    return {
      sizeClass: '',
      action: null
    }
  },
  methods: {
    setButtonSize() {
      // Check button size and give it a bootstrap class
      switch(this.size) {
        case 'small':
          this.sizeClass = 'btn-sm'
          break

        case 'normal':
          this.sizeClass = ''
          break

        case 'large':
          this.sizeClass = 'btn-lg'
          break

        default:
          this.sizeClass = ''

      }
    },
    setInternUrl() {
      this.action = ''

      // Check if page has parent
      if(this.page.__typename == 'PageChildRecord' && this.page.parentPage != undefined && this.page.parentPage != null) {
        this.action = '/' + this.page.parentPage.slug + '/' + this.page.slug + '/'
      } else {
        this.action = '/' + this.page.slug + '/'
      }

      // Check if anchorpoint is set
      if(this.anchorpoint != undefined) {
        // If true, check if string is not empty
        if(this.anchorpoint != '') {
          let anchorpoint = this.anchorpoint
          // Check if first character in anchorpoint is a '#'
          if(this.anchorpoint.substring(0,1) == '#') {
            // If true, remove from string to prevent double '##'
            anchorpoint = this.anchorpoint.replace('#','')
          }

          // Add anchorpoint to action
          this.action = this.action + '#' + anchorpoint
        }
      }
    }
  },
  mounted() {
    
    // Check if button size prop has been passed
    if(this.size != undefined && this.size != null) {
      // If true, set button size
      this.setButtonSize()
    }

    // Check if page prop has been passed
    if(this.page != undefined && this.page != null && this.type == 'intern') {
      // If true create url from page slug and anchorpoint (if passed)
      this.setInternUrl()
    }

    // Check if url prop has been passed
    if(this.url != undefined && this.url != null) {
      // If true, check if url value is not empty and check if type is extern
      if(this.url != '' && this.type == 'extern') {
        // If true, create extern url
        this.action = this.url
      }
    }
  }
}
</script>

<style>
 .arrowbox{
      fill:transparent;
      stroke:#000000;
      transition: all 0.2s ease;
      cursor: pointer; 
    }

    .getting-started-link-svg {
      box-sizing: content-box;
      height: 95px;
      width: 100%;
      transition: all 0.2s ease;
    }

    .getting-started-link-svg:hover {
      transform: scale(.99);
      transition: all 0.2s ease;
    }

    .getting-started-link-svg:hover > .arrowbox{  
      fill:white !important;
      transition: all 0.2s ease;
    }
</style>