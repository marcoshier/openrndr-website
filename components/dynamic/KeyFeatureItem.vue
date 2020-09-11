<template lang="html">
  <div class="col-12 col-lg-6 mb-5 d-flex px-0" v-bind:class="{'first-item': isFirstInRow, 'last-item': !isFirstInRow}">
    <div class="feature-number mr-5">
      <img class="img-fluid" src="@/assets/images/key-feature-circle.png">
      <h1 class="mb-0 feature-number-text">{{index + 1}}</h1>
    </div>

    <div>
      <h4>{{title}}</h4>
      <p class="mb-0">{{description}}</p>
    </div>
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
    index: {
      type: Number
    }
  },
  data: function() {
    return {
      isFirstInRow: null
    }
  },
  mounted() {
    if(this.index != undefined) {
      let index = this.index + 1

      // If remainder is not 0, this means the component's index is uneven and first in the row
      if(index % 2 != 0) {
        this.isFirstInRow = true
      } else {
        this.isFirstInRow = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// Only apply spacing when col-6 is displayed (on lg screens)
@media only screen and (min-width: 992px) {
  .first-item {
    padding-right: 1rem !important;
  }

  .last-item {
    padding-left: 1rem !important;
  }
}

.feature-number {
  position: relative;
  min-width: 90px;
  min-height: 90px;
  height: fit-content;

  & > img {
    min-width: 90px;
    min-height: 90px;
  }

  & > {
    .feature-number-text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}



</style>
