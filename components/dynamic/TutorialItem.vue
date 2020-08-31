<template>
  <div class="col-12 col-md-6 mb-5">
    <a :href="url" target="_blank">
      <b-card
      no-body
      tag="article"
      class="h-100 card-img-middle"
      >
        <b-card-header class="bg-white">
          <h4 class="mb-0">{{title}}</h4>
          <p class="lead mb-0">{{time}} minutes</p>
        </b-card-header>

        <b-card-img v-if="image" :src="image.url" :alt="image.alt" class="rounded-0 border-bottom"></b-card-img>

        <b-card-body class="align-self-stretch">
          <p class="mb-0">{{description}}</p>
        </b-card-body>

      </b-card>
    </a>
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
      time: {
        type: Number
      },
      url: {
        type: String
      },
      image: {
        type: Object
      }
    }
  }
</script>
