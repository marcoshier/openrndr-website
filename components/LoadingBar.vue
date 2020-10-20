<template lang="html">
  <div class="bg-primary loading-background" v-bind:class="{ 'd-none': isLoadingDone }" v-if="options">
    <!-- <img class="img-fluid" src="@/assets/images/openrndr-logo.png" alt="The OPENRNDR Logo"> -->

    <div class="w-25 mx-auto h-100 d-flex align-items-center">
      <progress-bar
        type="line"
        ref="percentLine"
        :options="options"
        trailWidth="0"
        trailColor="#ffc0cb"
        class="w-100">
      </progress-bar>
      <!-- <h5 v-if="">{{$refs.percentLine.value()}}</h5> -->
    </div>
  </div>
</template>

<script>
// Options for the Vue Progress bar
const LINE_PERCENT = {
  strokeWidth: 4,
  easing: 'easeInOut',
  duration: 500,
  color: '#FFF',
  trailColor: '#d4a3ab',
  trailWidth: 0,
  svgStyle: {width: '100%', height: '100%'},
  text: {
    style: {
      // Text color.
      // Default: same as stroke color (options.color)
      color: '#0c120c',
      position: 'absolute',
      top: '49vh',
      left: 0,
      right: 0,
      padding: 0,
      margin: 0,
      fontFamily: 'Jost',
      fontWeight: 700,
      textAlign: 'center',
      transform: null
    },
    autoStyleContainer: false
  },
  from: {color: '#FFEA82'},
  to: {color: '#ED6A5A'},
  step: (state, bar) => {
    bar.setText(Math.round(bar.value() * 100) + ' %')
  }
}

export default {
  data: function() {
    return {
      textDiv: null,
      isAnimating: false,
      isLoadingDone: false,
      options: LINE_PERCENT
    }
  },
  methods: {
    startLoading() {
      this.isAnimating = true
      this.$refs.percentLine.animate(1.0)

      // When loading bar is 100%, set isLoadingDone to true
      this.finishLoading()
    },
    finishLoading() {
      // Duration of setTimeout is equal to duration of progress bar animation
      setTimeout(function(scope) {

        scope.hideLoadingBar()

      }, 500, this)
    },
    hideLoadingBar() {
      this.isAnimating = false
      this.isLoadingDone = true
    }
  },
  mounted() {
    this.startLoading()
  }
}
</script>

<style lang="css">
 .loading-background {
    position: fixed;
    z-index: 900000000000000;
    height: 100vh;
    width: 100vw;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
 }
</style>
