<template>
  <div>
    <div style="padding:36.88% 0 0 0;position:relative;">
      <iframe
        :src="videoUrl"
        style="position:absolute;top:0;left:0;width:100%;height:100%;"
        frameborder="0"
        allow="autoplay; fullscreen"
        webkitallowfullscreen mozallowfullscreen allowfullscreen
      >
      </iframe>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      source: {
        type: String
      },
      vidId: {
        type: String
      }
    },
    data: function() {
      return {
        isVideo: false,
        videoUrl: null
      }
    },
    mounted() {
      if(this.vidId != undefined) {
        if(this.source == 'vimeo') {
          this.isVideo = true
          this.videoUrl = this.vimeoURL(this.vidId)
        } else if (this.source == 'youtube') {
          this.isVideo = true
          this.videoUrl = this.youtubeURL(this.vidId)
        }
      }
    },
    methods: {
      vimeoURL(id) {
        return 'https://player.vimeo.com/video/' + id + '?background=1&autoplay=1&loop=1&byline=0&title=0'
      },
      youtubeURL(id) {
        return 'https://www.youtube.com/embed/' + id + '?iv_load_policy=3&modestbranding=1&playsinline=1&showinfo=0&rel=0&enablejsapi=1'
      }
    }
  }
</script>

<style>
  .video-wrapper {
    width: 100%;
    height: 650px;
    max-height: calc(100vh - 93px);
    overflow: hidden;
    background-color: black;
  }

  .video-wrapper iframe {
     width: 100vw;
     height: 56.25vw; /* Given a 16:9 aspect ratio, 9/16*100 = 56.25 */
     min-height: 100vh;
     min-width: 177.77vh; /* Given a 16:9 aspect ratio, 16/9*100 = 177.77 */
     position: relative;
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%);
  }
</style>
