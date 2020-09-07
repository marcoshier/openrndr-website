<template lang="html">
  <div :class="'d-inline-block ' + parentClasses">
    <nuxt-link v-if="type == 'intern'" :to="url" :class="'btn btn-primary ' + sizeClass + ' ' + buttonClasses">
      {{title}}
    </nuxt-link>

    <a v-else :href="url" :class="'btn btn-primary ' + sizeClass" target="_blank">
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
      type: String
    },
    size: {
      type: String,
      default: null
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
      sizeClass: ''
    }
  },
  mounted() {
    // Set button size
    if(this.size != undefined && this.size != null) {
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
    }
  }
}
</script>
