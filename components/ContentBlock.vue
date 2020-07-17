<template>
  <div class="container py-5" :id="anchorpoint ? anchorpoint : ''">
    <h1 v-if="title">{{title}}</h1>
    <p v-if="subtext">
      {{subtext}}
    </p>

    <template v-if="bodyText">
      <hr class="my-5">
      <div v-html="bodyText">
      </div>
    </template>
  </div>
</template>

<script>
  export default {
    props: {
      initTitle: {
        type: String
      },
      initSubtext: {
        type: String
      },
      initBodyText: {
        type: String
      },
      initAnchorpoint: {
        type: String
      }
    },
    data: function() {
      return {
        title: null,
        subtext: null,
        bodyText: null,
        anchorpoint: null
      }
    },
    mounted() {
      if(this.initTitle != undefined) {
        this.title = this.initTitle;
      }

      if(this.initSubtext != undefined) {
        this.subtext = this.initSubtext;
      }

      if(this.initBodyText != undefined) {
        this.bodyText = this.initBodyText;
      }

      if(this.initAnchorpoint != undefined) {
        this.anchorpoint = this.initAnchorpoint;
      }
    }
  }
</script>
