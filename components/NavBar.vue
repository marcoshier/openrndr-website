<template>
  <div class="navbar-container">
    <b-navbar toggleable="lg" type="light" class="p-0 bg-primary" :class="{'border-bottom border-dark': borderactive}" v-if="allMainNavigations">
      <div class="container-fluid px-0 px-lg-5">
        <b-navbar-brand to="/" :id="'openrndr-logo'">
          <span id="logo">{{ logoText }}</span>
        </b-navbar-brand>

        <!-- Desktop menu -->
          <b-navbar-nav class="ml-auto d-none d-lg-flex">
            <template v-for="(page, index) in allMainNavigations">

              <menu-item
                class="menu-btn"
                :title="page.menuItem.title"
                :type="page.menuItem.navType"
                :intern="page.menuItem.internLink"
                :value="page.menuItem.value"
                :items="page.menuItem.dropdownItems"
                :key="index"
              />

            </template>

          </b-navbar-nav>
        <!-- /Desktop menu -->

        <!-- Mobile menu -->
        <div class="ml-auto d-lg-none" :id="'mobile-button-wrapper'">
          <mobile-menu
            :items="allMainNavigations"
          />
        </div>
        <!-- /Mobile menu -->
      </div>
    </b-navbar>
  </div>
</template>

<script>
  import { mapState } from "vuex"
  import MenuItem from '~/components/MenuItem.vue'
  import MobileMenu from '~/components/MobileMenu.vue'
  import Typewriter from 'typewriter-effect/dist/core';

  export default {
    components: {
      MobileMenu,
      MenuItem
    },
    data: function() {
      return {
        yScroll: 0,
        borderactive: false,
        currentRouteName: "",
        logoText: "OPENRNDR",
        slug: this.$route.params.slug,
      }
    },
    computed: {
      borderStatus() {
        return this.$store.state.borderStatus
      },
      ...mapState({
        allMainNavigations: (state) => state.navigation.allMainNavigations
      }),
      
    },
    watch: {
      'borderStatus': {
        handler: function(yScroll){
          if(this.currentRouteName == "index") {
            if(yScroll && yScroll < 75) {
              this.borderactive = true
            } else  {
              this.borderactive = false
            }
          }
      },
      deep: true,
      immediate: true
      },
      '$route.name': {
        handler: function(routeChange) {
          this.currentRouteName = routeChange
          if(routeChange == "slug") {
            this.borderactive = true
          }
        },
        deep: true,
        immediate: true,
      }
    },
    methods: {
        logoAnim() {

            let tw = new Typewriter("#logo", {
              autoStart: true,
              cursor: null,
              skipAddStyles: true,
              deleteSpeed: 30,
              wrapperClassName: "logo_typewriter",
              delay: 60,
            });

            let clearReplace = (el , newString) => {
                el.elements.wrapper.innerHTML = newString
                return
            }

            tw.pauseFor(10)
              .callFunction((e) => {
                clearReplace(e, 'PENRNDR')
              })
              .callFunction((e) => {
                clearReplace(e, 'RENRNDR')
              })
              .callFunction((e) => {
                clearReplace(e, 'RUNRNDR')
              })
              .callFunction((e) => {
                clearReplace(e, 'RUNRND')
              })
              .callFunction((e) => {
                clearReplace(e, 'RUNRN')
              })
              .callFunction((e) => {
                clearReplace(e, 'RUNR')
              })
              .callFunction((e) => {
                clearReplace(e, 'RUN')
              })
              .pause(1500)
              .callFunction((e) => {
                clearReplace(e, ' RUN')
              })
              .callFunction((e) => {
                clearReplace(e, '  RUN')
              })
              .typeString('NING ON')
              .callFunction((e) => {
                clearReplace(e, ' RUNNING ON')
              })
              .callFunction((e) => {
                clearReplace(e, 'RUNNING ON')
              })
              .callFunction((e) => {
                clearReplace(e, 'RUNNNG ON')
              })
              .callFunction((e) => {
                clearReplace(e, 'RNNNG ON')
              })
              .callFunction((e) => {
                clearReplace(e, 'RNNG N')
              })
              .callFunction((e) => {
                clearReplace(e, 'RNDGN')
              })
              .callFunction((e) => {
                clearReplace(e, 'RNDR')
              })
              .pauseFor(400)
              .callFunction((e) => {
                clearReplace(e, 'NRNDR')
              })
              .callFunction((e) => {
                clearReplace(e, 'ENRNDR')
              })
              .callFunction((e) => {
                clearReplace(e, 'PENRNDR')
              })
              .callFunction((e) => {
                clearReplace(e, 'OPENRNDR')
              })
              
              .start()
        }
    },
    mounted() {
      if(this.slug == undefined) {
        this.logoAnim()
      } else {
        this.logoText = "OPENRNDR"
      }
    }

  }
</script>


<style scoped>


  .navbar {
    position: fixed;
    z-index: 999;
    width: 100%;
    background-color: white;
  }

  #openrndr-logo > .logo {
    transition: all .35s;
  }

  #openrndr-logo, .logo_typewriter{
    text-decoration: none !important;
    border: none !important;
    outline: none !important;
    box-shadow: none;
  }

  #logo {
    display: flex;
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 700;
    align-items: center;
    height: 75px;
    text-decoration: none !important;
    border: none !important;
    font-weight: 600;
  }


    #openrndr-logo:active, .logo_typewriter:active, #logo:active {
      text-decoration: none !important;
      border: none !important;
      -moz-border: none !important;
      -webkit-border: none !important;
      outline: none !important;
      -moz-outline: none !important;
      -webkit-outline: none !important;
      box-shadow: none;
      -moz-outline-box-shadow: none;
      -webkit-outline-box-shadow: none;

    }



</style>
