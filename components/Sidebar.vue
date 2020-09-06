<template>
  <div v-if="hasSidebar" id="sidebar" class="p-3">
    <ul class="list-group rounded-0 p-3 border">
      <li v-if="pageTitle" class="list-group-item border-0">
        <span class="sidebar-title">{{this.title}}</span>
      </li>
      <li v-for="(item, index) in items" :key="index" class="list-group-item border-0">
        <a class="" :href="'#' + item.anchorpoint">
          {{item.title}}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String
      },
      contentBlocks: {
        type: Array
      }
    },
    data: function() {
      return {
        items: [],
        hasSidebar: false,
        pageTitle: null
      }
    },
    mounted() {
      let self = this

      // Check for each contentBlock if sidebar is true
      if(this.contentBlocks != undefined) {
        this.contentBlocks.forEach(function(block, index) {
          if(block.sidebar && block.anchorpoint != '') {
            self.items.push({'title' : block.title, 'anchorpoint' : block.anchorpoint})
          }
        })
      }


      // Check if items length > 0
      if (this.items.length > 0) {
        // Set hasSidebar to true
        this.hasSidebar = true
      }

      // Set sidebar title
      if(this.title != undefined) {
        this.pageTitle = this.title
      }

    }
  }
</script>

<style>
  /* Set scrolling to smooth and use nav height as offset */
  html {
    scroll-padding: 109px 0 0 0;
    scroll-behavior: smooth;
  }

  #sidebar {
    position: sticky;
    top: 140px;
  }

</style>
