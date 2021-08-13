<template>
  <div class="col-12 col-md-6 mb-4 mb-lg-5">
    <b-card
    no-body
    tag="article"
    class="card-img-middle h-100"
    >
      <b-card-header class="bg-white">
        <h4 class="card-title mb-2 clickable" @click="goToCardUrl">{{title}}</h4>
        <p class="card-subtitle mb-0" v-if="time"><font-awesome-icon :icon="['far', 'clock']" class="mr-2" />{{time}} minutes</p>
      </b-card-header>

      <b-card-img v-if="image" :src="image.url" :alt="image.alt" class="rounded-0 border-bottom clickable" @click="goToCardUrl"></b-card-img>

      <b-card-body class="bg-white clickable" @click="goToCardUrl">
        <p class="card-text mb-0" v-if="description">{{parsedDescription}} <span v-if="breakWord" class="font-weight-bold"> >> </span></p>
      </b-card-body>

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
      time: {
        type: Number
      },
      url: {
        type: String
      },
      image: {
        type: Object
      }
    },
    data: function() {
      return {
        parsedDescription: null,
        breakWord: false
      }
    },
    mounted() {
      if(this.description) {
        let parsedDescription = this.description.substring(0, 150)
        this.parsedDescription = parsedDescription
        if(this.description.length > 150) {
          let descWords = parsedDescription.split(" ")
          let cutDesc = parsedDescription.replace(descWords[descWords.length - 1], " ")
          this.breakWord = true
          this.parsedDescription = cutDesc
        }
      }
    },
    methods: {
      goToCardUrl() {
        let cardUrl = this.url
        let win = window.open(cardUrl, '_blank');
        win.focus();
      }
    }
  }
</script>
