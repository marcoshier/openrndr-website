<template lang="html">
  <div>
    <font-awesome-icon
      @click="toggleMenu()"
     :id="'menu-toggle'"
     :icon="['fas', 'bars']"
     ref="menuIcon"
    />

    <div ref="mobileMenu" class="mobile-menu-wrapper bg-primary" >
      <b-navbar-nav id="mobile-menu-container" class="" v-bind:class="{'d-none': !isMenuOpen}">
        <template v-for="(page, index) in items">
          <menu-item
            :title="page.menuItem.title"
            :type="page.menuItem.navType"
            :intern="page.menuItem.internLink"
            :value="page.menuItem.value"
            :items="page.menuItem.dropdownItems"
            :index="index"
            :class="'p-3 border-bottom border-white'"
            :animation-base="275"
            :animation-offset="175"
            @click.native="close()"
          />
        </template>
      </b-navbar-nav>
    </div>
  </div>
</template>

<script>
import MenuItem from '~/components/MenuItem.vue'

export default {
  props: {
    items: {
      type: Array
    }
  },
  components: {
    MenuItem
  },
  data: function() {
    return {
      isMenuOpen: false,
      iconClass: ''
    }
  },
  methods: {
    toggleMenu() {
      if(this.isMenuOpen) {
        this.close()
      } else {
        this.open()
      }
    },
    open() {
      this.isMenuOpen = true
      //this.$refs.mobileMenu.style.display = "block"
      this.$refs.mobileMenu.style.width = "100%"
    },
    close() {
      this.isMenuOpen = false
      this.$refs.mobileMenu.style.width = "0%"
      //this.$refs.mobileMenu.style.display = "none"
    }
  }
}
</script>

<style lang="scss">
  @import '~/assets/css/variables.scss';

  .mobile-menu-wrapper {
    position: absolute;
    top: $navbarHeight;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    height: 100vh;
    width: 0%;
    transition: 0.5s;
    display: block;
  }

  #mobile-menu-container {
    transition: 0.5s;
  }

  #mobile-menu-container > div > li.nav-item > a.nav-link {
    border: none;
  }
</style>
