<template>
  <div class="col-12 col-md-6 col-lg-4 mb-5">
    <b-card
    no-body
    :img-src="image.url"
    :img-alt="image.alt"
    img-top
    tag="article"
    class="h-100 news-card"
    >
      <b-card-header class="bg-white border-0">
        <p class="text-muted mb-2">{{category}}</p>
        <h4 class="mb-0">{{title}}</h4>
      </b-card-header>

      <b-card-body>
        <b-card-text v-if="description">
          {{description}}
        </b-card-text>

        <hr v-if="description">

        <b-button :href="url" variant="primary" target="_blank">Go somewhere</b-button>
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
    }
  }
</script>
