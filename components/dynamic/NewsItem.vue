<template>
  <div class="col-12 col-md-6 col-lg-4 py-3">
    <b-card
    no-body
    tag="article"
    class="h-100 news-card rounded clickable btn-like"
    @click="goToCardUrl()"
    img-top
    >
      <b-card-img
        v-if="image"
        :src="image.url"
        :alt="image.alt">
      </b-card-img>
      <b-card-header class="bg-white border-0 px-35 py-35">
        <p class="card-category mb-1">{{category}}</p>
        <div class="title-icon-cnt" >
          <img class="news-item-logo pb-2" src="@/assets/images/medium-logo.png">
          <h4 class="mb-0">{{title}}</h4>
        </div>
      </b-card-header>

      <b-card-body class="d-flex flex-column pt-0">
        <b-card-text v-if="description" class="pt-3">
          {{description}}
        </b-card-text>

      </b-card-body>
      <!-- <b-card-text v-if="credits && credits != ''" v-html="credits">
      </b-card-text> -->


<!--
      <b-card-text v-if="specs && specs != ''" v-html="specs">
      </b-card-text> -->

    </b-card>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String
      },
      description: {
        type: String
      },
      url: {
        type: String
      },
      category: {
        type: String
      },
      image: {
        type: Object
      }
    },
    methods: {
      goToCardUrl() {
        if(this.url) {
          let cardUrl = this.url
          let win = window.open(cardUrl, '_blank');
          win.focus();
        }
      }
    }
  }
</script>
<style>
  .news-item-logo {
    width: 26px;
  }
</style>
