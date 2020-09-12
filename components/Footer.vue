<template lang="html">
  <footer class="bg-primary">
    <div class="container py-5 px-0">
      <div class="row" v-if="allFooterNavigations">
        <div class="col-6 col-lg-3" v-for="(block, index) in allFooterNavigations">
          <h5 v-if="block.title">{{block.title}}</h5>
          <h5 v-else>&nbsp;</h5>

          <b-nav vertical>
            <template v-for="(item, index) in block.menuItems">

              <menu-item
                :title="item.menuItem.title"
                :type="item.menuItem.navType"
                :intern="item.menuItem.internLink"
                :value="item.menuItem.value"
                :items="item.menuItem.dropdownItems"
                :itemClass="'footer-li'"
                :key="index"
              />

            </template>
          </b-nav>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import gql from 'graphql-tag'
import MenuItem from '~/components/MenuItem.vue'

export default {
  apollo: {
    allFooterNavigations: gql`{
      allFooterNavigations {
        title
        menuItems {
          menuItem {
            ... on MenuItemRecord {
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
        }
      }
    }`
  },
  components: {
    MenuItem
  }
}
</script>

<style lang="css" scoped>
</style>
