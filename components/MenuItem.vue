<template lang="html">
  <div v-if="isActive" class="menu-item">
    <div class="dd-wrapper">
      <b-nav-item-dropdown v-if="type == 'dropdown'" :text="title" :class="classes" :data-animation-base="animationBase" v-bind="dataOffset">
        <template v-for="(item, index) in items" >
          <b-dropdown-item v-if="item.isActive && item.linkType == 'intern'" :to="'/' + item.internLink.action">{{item.title}}</b-dropdown-item>

          <b-dropdown-item v-else-if="item.isActive && item.linkType == 'extern'" :href="item.value" target="_blank">{{item.title}}<img class="external" src="../assets/images/external.svg" v-if="item.linkType == 'extern'" /></b-dropdown-item>

          <b-dropdown-item v-else-if="item.isActive && item.linkType == 'mail'" :href="'mailto:' + item.value" target="_blank">{{item.title}}</b-dropdown-item>

          <b-dropdown-item v-else-if="item.isActive && item.linkType == 'phone'" :href="'tel:' + item.value" target="_blank">{{item.title}}</b-dropdown-item>
        </template>
      </b-nav-item-dropdown>
    </div>

    <b-nav-item v-if="type == 'intern'" :to="'/' + intern.action" :class="classes" :data-animation-base="animationBase" v-bind="dataOffset">
      {{ title }}
    </b-nav-item>

      <b-nav-item v-else-if="type == 'extern'" :href="value" target="_blank" :class="classes" :data-animation-base="animationBase" v-bind="dataOffset">
        {{title}}
      <img class="external" src="../assets/images/external.svg" v-if="type == 'extern'" />
      </b-nav-item>


    <b-nav-item v-else-if="type == 'mail'" :href="'mailto:' + value" target="_blank" :class="classes" :data-animation-base="animationBase" v-bind="dataOffset">
     {{title}}
    </b-nav-item>

    <b-nav-item v-else-if="type == 'phone'" :href="'tel:' + value" target="_blank" :class="classes" :data-animation-base="animationBase" v-bind="dataOffset">
      {{title}}
    </b-nav-item>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    index: {
      type: Number,
      default: undefined
    },
    type: {
      type: String
    },
    intern: {
      type: Object,
      default: undefined
    },
    value: {
      type: String,
      default: undefined
    },
    items: {
      type: Array,
      default: undefined
    },
    itemClass: {
      type: String,
      default: undefined
    },
    animationBase: {
      type: Number,
      default: undefined
    },
    animationOffset: {
      type: Number,
      default: undefined
    }
  },
  data: function() {
    return {
      isActive: false,
      dropDownItems: this.items,
      classes: this.itemClass
    }
  },
  methods: {
    showDropdown() {
        this.$refs.dropdown.visible = true;
    },
    hideDropdown() {
        this.$refs.dropdown.visible = false;
    },
    isInternActive(intern) {
      // First check if intern is not undefined
      if (intern != undefined) {
        // Check if intern page has a parent
        if(intern.parentPage != undefined) {
          // if page has a parent, merge the slugs
          intern.action = intern.parentPage.slug + '/' + intern.slug + '/'
        } else {
          intern.action = intern.slug + '/'
        }

        // return true because data is filled in properly
        return true
      } else {

        // return false because data is not filled in properly
        return false
      }
    },
    isValueActive(value) {
      
      if (value != undefined) {
        if(value != '') {
          return true
        } else {
          return false
        }
      }
    },
    addTransition(className) {
      let elements = document.getElementsByClassName(className)
      let self = this


      window.addEventListener("load", function(event) {

        Array.from(document.getElementsByClassName(className)).forEach(
            function(element, index, array) {
            }
        )
      });

      Array.prototype.forEach.call(elements, function(el) {
          // Do stuff here
          el.style.transition = "all 275ms " + (175 + (self.index * 50)) + "ms"
      })

      // element.forEach(function(item, index) {
      //   console.log(item)
      //   item.style.transition = "all 275ms " + (175 + (self.index * 50)) + "ms"
      // })

      // if(element[0] != undefined) {
      //   element[0].style.transition = "all 275ms " + (175 + (this.index * 50)) + "ms"
      // }
    }
  },
  computed: {
    dataOffset() {
      return {
      	[`data-index`]: this.index
      }
    },
    transitionDuration(index) {
      return {

      }
    }
  },
  mounted() {
    // Check for every menuItem if data has been properly filled in
    // To prevent errors
    let self = this

    if(this.type == 'intern') {
      this.isActive = this.isInternActive(this.intern)
    } else if (this.type == 'dropdown') {

        // Check if dropDownItems is not undefined
        if(this.dropDownItems != undefined) {
          // Check if dropDownItems has items
          if(this.dropDownItems.length > 0) {

            // Foreach item inside items check if data has been properly filled in
            this.items.forEach(function(item, index) {
              item.isActive = false

              if(item.linkType == 'intern') {
                item.isActive = self.isInternActive(item.internLink)
              } else {
                item.isActive = self.isValueActive(item.value)
              }
            })
          }

          if(this.dropDownItems.length > 0) {
            this.isActive = true
          }
        }

    } else {
      this.isActive = this.isValueActive(this.value)
    }

  }
}
</script>

<style lang="css" scoped>
.external {
  width: 10px;
}
</style>
