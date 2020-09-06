<template>
  <div class="navbar-container" v-if="allNavigations">
    <b-navbar toggleable="lg" type="light" class="border-bottom border-primary py-3">
      <div class="container">
        <b-navbar-brand to="/">
          <img class="logo" src="@/assets/images/openrndr-logo.png" alt="The OPENRNDR Logo">
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <!-- <b-collapse id="nav-collapse" is-nav> -->
          <b-navbar-nav class="ml-auto">
            <template v-for="(page, index) in allNavigations">

              <b-nav-item-dropdown v-if="page.navType == 'dropdown'" :text="page.title" :key="index">
                <template v-for="(item, index) in page.dropdownItems">
                  <b-dropdown-item v-if="item.linkType == 'intern'" :key="index" :to="item.link">
                    {{item.title}}
                  </b-dropdown-item>

                  <a v-else :key="index" :href="'//' + item.link" class="dropdown-item" target="_blank">
                    {{item.title}}
                  </a>
                </template>
              </b-nav-item-dropdown>

              <b-nav-item v-if="page.navType == 'normal'" :key="index" :to="page.slug">
                {{ page.title }}
              </b-nav-item>
            </template>

          </b-navbar-nav>
        <!-- </b-collapse> -->
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
            linkType
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
    height: 110px;
  }

  .navbar {
    position: fixed;
    z-index: 999;
    width: 100%;
    background-color: white;
  }
</style>
