<template lang="html">
  <footer class="bg-white" v-if="showFooter">
    <div class="container-fluid p-4 p-lg-5">
      <div class="row m-0 justify-content-between" v-if="allFooterNavigations">
        <div class="col-12 col-sm-6 col-lg-3 mb-4 mb-lg-0 px-0 px-sm-3" v-for="(block, index) in allFooterNavigations" v-if="index < 4">
          <h5 v-if="block.title">{{block.title}}</h5>
          <h5 v-else class="d-none d-sm-block">&nbsp;</h5>

          <b-nav vertical>
            <template v-if="block.menuItems.length > 0" v-for="(item, index) in block.menuItems">
              
              <menu-item
                v-if="item.menuItem != undefined || item.menuItem != null"
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
import { mapState } from "vuex"
import MenuItem from '~/components/MenuItem.vue'

export default {
  components: {
    MenuItem
  },
  data: function() {
    return {
      showFooter: true
    }
  },
  computed: {
    ...mapState({
      allFooterNavigations: (state) => state.navigation.allFooterNavigations
    })
  }
}
</script>
