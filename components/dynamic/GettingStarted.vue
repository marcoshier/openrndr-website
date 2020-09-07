<template lang="html">
  <div class="d-flex justify-content-between p-5">
    <template v-for="(button, index) in items">
      <vue-button :title="button.title" :url="button.url" :type="button.linkType" buttonClasses="getting-started-link" />
      <img v-if="index < items.length -1" src="@/assets/images/arrow.svg" alt="Next step indicator" class="arrow-next">
    </template>
  </div>
</template>

<script>
import VueButton from '~/components/Button.vue'

export default {
  components: {
    VueButton
  },
  props: {
    name: {
      type: String
    },
    page: {
      type: Object
    },
    items: {
      type: Array
    }
  }
}
</script>

<style>
  .getting-started-link {
    font-size: 22px;
    min-width: 330px;
    padding-top: 12px;
    padding-bottom: 12px;
   }

  .arrow-next {
    width: 40px;
    height: 59px;
  }

  @media only screen and (max-width: 1199px) {
    .arrow-next {
      height: 50px;
      width: 30px;
    }

    .getting-started-link {
      font-size: 20px;
      min-width: 260px;
      padding-top: 8px;
      padding-bottom: 8px;
     }
  }

  @media only screen and (max-width: 991px) {
    .arrow-next {
      height: 43px;
      width: 30px;
    }

    .getting-started-link {
      font-size: 17px;
      min-width: 150px;
      padding-top: 8px;
      padding-bottom: 8px;
     }
  }
</style>
