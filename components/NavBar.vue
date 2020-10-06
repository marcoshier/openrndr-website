<template>
  <div class="navbar-container">
    <b-navbar toggleable="lg" type="light" class="border-bottom border-primary p-3"  v-if="allMainNavigations">
      <div class="container">
        <b-navbar-brand to="/" :id="'openrndr-logo'">
          <img class="logo" src="@/assets/images/openrndr-logo.png" alt="The OPENRNDR Logo">
        </b-navbar-brand>

        <!-- Desktop menu -->
          <b-navbar-nav class="ml-auto d-none d-lg-flex">
            <template v-for="(page, index) in allMainNavigations">

              <menu-item
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
  import gql from 'graphql-tag'
  import MenuItem from '~/components/MenuItem.vue'
  import MobileMenu from '~/components/MobileMenu.vue'

  export default {
    apollo: {
      allMainNavigations: gql`{
        allMainNavigations {
          menuItem {
            title
            navType
            value
            internLink {
              ... on PageRecord {
                slug
              }
              ... on PageChildRecord {
                slug
                parentPage {
                  slug
                }
              }
            }
            dropdownItems {
              title
              linkType
              value
              internLink {
                ... on PageRecord {
                  slug
                }
                ... on PageChildRecord {
                  slug
                  parentPage {
                    slug
                  }
                }
              }
            }
          }
        }
      }`
    },
    components: {
      MobileMenu,
      MenuItem
    }
    // computed: {
    //   console: () => console,
    //   window: () => window,
    // }
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
    transition: all .5s;
  }
  
</style>
