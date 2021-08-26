<template lang="html">
  <div v-if="allEcosystems" class="px-4 pt-4 px-lg-5 pt-lg-5 m-0 ecosystem-cnt">
    <ecosystem-item v-for="(item, index) in allEcosystems"
      :title="item.title"
      :description="item.description"
      :image="item.image"
      :url="item.link"
      :exampleurl="item.exampleLink"
      :index="index"
      :key="index"
    />
  </div>
</template>

<script>
import EcosystemItem from '~/components/dynamic/EcosystemItem.vue'
import { mapState } from "vuex"

export default {
  components: {
    EcosystemItem
  },
  props: {
    name: {
      type: String
    },
    page: {
      type: Object
    }
  },
  computed: {
   ...mapState({
     allEcosystems: (state) => state.landingPage.allEcosystems
   })
  }}
</script>

<style scoped>
  .ecosystem-cnt {
    display:grid;
    width: 100%;
    grid-template-areas: 
            "a b c d" 
            ". e f g" 
            "h i j k";
    grid-gap: 20px;
    align-items: center;
    align-content: center;
    justify-content: space-around;
  }

  .ecosystem-cnt div:nth-child(1) {
    margin-left: 50px;
  }

  .ecosystem-cnt div:nth-child(5) {
    margin-right: 50px;
  }
  .ecosystem-cnt div:nth-child(6) {
    margin-left: -20px;
  }

  .ecosystem-cnt div:nth-child(7) {
    margin-left: 20px;
  }

  .ecosystem-cnt div:nth-child(8) {
    margin-left: 40px;
  }

  .ecosystem-cnt div:nth-child(9) {
    margin-left: 40px;
  }
  

  @media screen and (max-width: 768px) {

    .ecosystem-cnt {
      display: flex;
      flex-direction: row;
      align-content:center;
      justify-content:center;
      flex-wrap: wrap;
    }

    .ecosystem-cnt div {
      margin-left: 0 !important;
      margin-right: 0 !important;
    }
    
  }
</style>
