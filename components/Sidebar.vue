<template>
  <div v-if="hasSidebar" id="sidebar" class="p-0 p-lg-3 bg-white">
    <ul class="list-group rounded-0 p-3 d-none d-lg-flex">
      <li v-if="pageTitle" class="list-group-item border-0 pr-0 pr-lg-3">
        <span class="sidebar-title">{{this.title}}</span>
      </li>
      <li v-for="(item, index) in items" :key="index" class="list-group-item border-0">
        <a class="" :href="'#' + item.anchorpoint">
          {{item.title}}
        </a>
      </li>
    </ul>

    <ul class="list-group rounded-0 p-3 d-lg-none">
      <li v-if="pageTitle" class="list-group-item border-0 pr-0 pr-lg-3">
        <span class="sidebar-title">{{this.title}}</span>
        <span class="d-lg-none float-right">
          <button @click="toggleSidebar()" class="btn btn-link py-0">
            <font-awesome-icon v-if="collapsed" icon="chevron-down" />
            <font-awesome-icon v-else icon="chevron-up" />
          </button>
        </span>
      </li>
      <li v-for="(item, index) in items" :key="index" v-if="!collapsed" class="list-group-item border-0">
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
        pageTitle: null,
        collapsed: true
      }
    },
    methods: {
      toggleSidebar() {
        this.collapsed = !this.collapsed
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
  #sidebar {
    position: sticky;
    top: 140px;
  }

</style>
