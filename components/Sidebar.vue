<template>
  <div v-if="hasSidebar" id="sidebar" class="p-0 bg-primary">
    <ul class="list-group rounded-0 p-0 d-none d-lg-flex bg-primary">
      <li v-if="pageTitle" class="list-group-item border-0 pr-0 pr-lg-3 bg-primary">
        <span class="sidebar-title">{{this.title}}</span>
      </li>
      <li :id="'menu-' + item.anchorpoint" v-for="(item, index) in items" :key="index" class="list-group-item border-0 bg-primary">
        <a class="" :href="'#' + item.anchorpoint">
          {{item.title}}
        </a>
      </li>
    </ul>

    <ul class="list-group rounded-0 p-0 d-lg-none bg-primary">
      <li v-if="pageTitle" class="list-group-item border-0 pr-0 pr-lg-3 bg-primary">
        <span class="sidebar-title">{{this.title}}</span>
        <span class="d-lg-none float-right">
          <button @click="toggleSidebar()" class="btn btn-link py-0">
            <font-awesome-icon v-if="collapsed" icon="chevron-down" />
            <font-awesome-icon v-else icon="chevron-up" />
          </button>
        </span>
      </li>
      <li :id="'menu-' + item.anchorpoint" v-for="(item, index) in items" :key="index" v-if="!collapsed" class="list-group-item border-0 bg-primary">
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
    computed: {
      currentBlock () {
        return this.$store.state.currentBlock
      }
    },
    watch: {
      currentBlock (currentBlock, previousBlock) {

        this.items.forEach(item => {
          let firstElem = document.getElementById('menu-' + this.items[0].anchorpoint)
          let currentElem = document.getElementById('menu-' + currentBlock)
          let previousElem = document.getElementById('menu-' + previousBlock)

          if (currentElem != "" && currentElem && previousElem && currentBlock == item.anchorpoint) {
              currentElem.classList.add("current-block")
              previousElem.classList.remove("current-block")
          } else if (currentElem == "" || !currentElem || currentElem && !previousElem || previousElem == "") {
              firstElem.classList.add("current-block")
          }
        })
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

  .current-block {
    color: white !important;
    font-weight: 600 !important;
  }

  /*.current-block::before {
    content: "";
    display: inline-block;
    position: absolute;
    top: 50%;
    transform: translateY(-51%);
    left: 0;
    width: 10px;
    height: 3px;
    background-color: black;
  }*/

</style>
