<template>
  <div class="navbar-container" v-if="allMainNavigations">
    <b-navbar toggleable="lg" type="light" class="border-bottom border-primary py-3">
      <div class="container">
        <b-navbar-brand to="/">
          <img class="logo" src="@/assets/images/openrndr-logo.png" alt="The OPENRNDR Logo">
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <!-- <b-collapse id="nav-collapse" is-nav> -->
          <b-navbar-nav class="ml-auto">
            <template v-for="(page, index) in allMainNavigations">

              <menu-item
                :title="page.menuItem.title"
                :type="page.menuItem.navType"
                :intern="page.menuItem.internLink"
                :value="page.menuItem.value"
                :items="page.menuItem.dropdownItems"
              />

            </template>

          </b-navbar-nav>
        <!-- </b-collapse> -->
      </div>
    </b-navbar>
  </div>
</template>

<script>
  import gql from 'graphql-tag'
  import MenuItem from '~/components/MenuItem.vue'

  export default {
    apollo: {
      allMainNavigations: gql`{
        allMainNavigations {
          menuItem {
            title
            navType
            internLink {
              slug
            }
            value
            dropdownItems {
              title
              linkType
              internLink {
                slug
              }
              value
            }
          }
        }
      }`
    },
    components: {
      MenuItem
    }
    // computed: {
    //   console: () => console,
    //   window: () => window,
    // }
  }
</script>


<style scoped>
  .logo {
    max-width: 150px;
  }

  .navbar-container {
    height: 110px;
  }

  .navbar {
    position: fixed;
    z-index: 999;
    width: 100%;
    background-color: white;
  }
</style>
