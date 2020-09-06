<template>
  <div class="col-12 col-md-6 col-lg-4 py-3">
    <b-card
    no-body
    tag="article"
    class="h-100 news-card rounded"
    >
      <b-card-img
        v-if="image"
        :src="image.url"
        :alt="image.alt"
        @click="goToCardUrl()"
        img-top
        class="clickable">
      </b-card-img>
      <b-card-header class="bg-white border-0 px-35 py-35">
        <p class="card-category mb-1">{{category}}</p>
        <h4 class="mb-0">{{title}}</h4>
      </b-card-header>

      <b-card-body class="d-flex flex-column pt-0">
        <b-card-text v-if="description">
          {{description}}
        </b-card-text>

        <b-button :href="url" variant="primary" target="_blank" class="btn-block mt-auto">Read article</b-button>
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
