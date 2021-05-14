<template lang="html">
  <div id="getting-started-area" class="d-flex justify-content-between p-4 p-lg-5">
    <template v-for="(button, index) in items">
      <vue-button
        :title="button.title"
        :url="button.url"
        :type="button.linkType"
        :page="button.page"
        :anchorpoint="button.anchorpoint"
        buttonClasses="getting-started-link"
      />
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
  #getting-started-area {
    margin-top: 50px;
    margin-bottom: 70px;
  }

  .getting-started-link {
    font-size: 22px;
    min-width: 330px;
    padding-top: 30px;
    padding-bottom: 30px;
    transform: scale(1);
    transition: all 0.1s ease;
   }

  .getting-started-link:hover {
    transform: scale(0.99);
    transition: all 0.2s ease;
  }

  .arrow-next {
    width: 40px;
    height: 90px;
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
    #getting-started-area {
      flex-direction: column;
    }

    .arrow-next {
      height: 43px;
      width: 30px;
      transform: rotate(90deg);
      margin-left: auto;
      margin-right: auto;
      margin-top: 10px;
      margin-bottom: 10px;
    }

    .getting-started-link {
      font-size: 17px;
      min-width: 150px;
      padding-top: 22px;
      padding-bottom: 22px;
      display: block;
      width: 100%;
     }
  }
</style>
