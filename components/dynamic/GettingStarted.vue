<template lang="html">
  <div id="getting-started-area" class="d-flex justify-content-between p-3 p-lg-4">
    <template v-for="(button, index) in items">
      <vue-button
        :title="button.title"
        :url="button.url"
        :type="button.linkType"
        :page="button.page"
        :anchorpoint="button.anchorpoint"
        :buttonClasses="'getting-started-link nr-' + index"
      />
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
    padding-left: 0;
    padding-right: 10px;
    font-size: 22px;
    min-width: 330px;
    padding-top: 30px;
    height: 94px;
    padding-bottom: 30px;
    transform: scale(1);
    transition: all 0.2s ease;
    position: relative;
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
    border-right: 1px solid transparent !important;
   }

   .getting-started-link::after {
     content: '';
     position: absolute;
     border-top: 47px solid transparent;
     border-bottom: 47px solid transparent;
     left: 100%;
     top: 0;
     border-left: 30px solid #ffc0cb;
     transition: all 0.2s ease;
   }

   .getting-started-link::before {
     content: '';
     position: absolute;
     border-top: 48px solid transparent;
     border-bottom: 48px solid transparent;
     left: 100%;
     top: -2px;
     border-left: 31px solid black;
     transition: all 0.2s ease;
   }

  .getting-started-link:hover {
    transform: scale(0.99);
    background-color: white !important;
    transition: all 0.2s ease;
    border-right: 1px solid white !important;
  }

   .getting-started-link:hover:before{
    transform: scale(0.99);
    border-left: 31px solid black;
    transition: all 0.2s ease;
  }

  .getting-started-link:hover:after{
    transform: scale(0.99);
    border-left: 31px solid black;
    transition: all 0.2s ease;
     border-left: 30px solid #fff;
  }

  @media only screen and (max-width: 1199px) {


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
