<template lang="html">
  <div v-if="action" :class="'d-inline-block ' + parentClasses">

    <nuxt-link v-if="type == 'intern'" :to="action" :class="'btn btn-primary ' + sizeClass + ' ' + buttonClasses">
      {{title}}
    </nuxt-link>

    <a v-else-if="type == 'extern'" :href="action" :class="'btn btn-primary ' + sizeClass + ' ' + buttonClasses" target="_blank">
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
        this.action = '/' + this.page.parentPage.slug + '/' + this.page.slug
      } else {
        this.action = '/' + this.page.slug
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
