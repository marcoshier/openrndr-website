<template>
  <div class="navbar-container">
    <b-navbar toggleable="lg" type="light" class="border-bottom">
      <div class="container">
        <b-navbar-brand to="/">
          <img class="logo" src="@/assets/images/openrndr-logo.png" alt="The OPENRNDR Logo">
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>


          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-navbar-nav>
              <template v-for="(page, index) in allNavigations">

                <b-nav-item-dropdown v-if="page.navType == 'dropdown'" :text="page.title" :key="index">
                  <b-dropdown-item v-for="(item, index) in page.dropdownItems" :key="index" :to="item.link">
                    {{item.title}}
                  </b-dropdown-item>
                </b-nav-item-dropdown>

                <b-nav-item v-if="page.navType == 'normal'" :key="index" :to="page.slug">
                  {{ page.title }}
                </b-nav-item>
              </template>

            </b-navbar-nav>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
  </div>
</template>

<script>
  import gql from 'graphql-tag'

  export default {
    apollo: {
      allNavigations: gql`{
        allNavigations {
          title
          slug
          navType,
          dropdownItems {
            title
            link
          }
        }
      }`
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
    height: 93px;
  }

  .navbar {
    position: fixed;
    z-index: 999;
    width: 100%;
    background-color: white;
  }
</style>
