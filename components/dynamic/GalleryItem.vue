<template>
  <div :class="classes + ' mb-4 mb-lg-5 gallery-item-full'">
   <!-- <v-gallery :id="'blue-imp-gallery-' + id" :images="gallery" :index="index"></v-gallery>-->
    <b-card
      no-body
      img-top
      tag="article"
      class="h-100 card-overflow pointer"
      @click="goToCardUrl()"
    >
      <b-card-img
        v-if="headerImage.url && !isVideo"
        :src="headerImage.url"
        :alt="headerImage.caption"
        class="rounded-0 clickable">
      </b-card-img>
      <div class="gallery-video-cnt" 
        v-else-if="url && isVideo"> 
        <div id="gallery-video" 
        class="rounded-0 clickable gallery-video-wrap">
          <iframe :src="urlEmbed" 
          allow="autoplay; fullscreen" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="allowfullscreen" frameborder="0"
          style="position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; cursor: pointer"></iframe>
        </div>
      </div>
      

      <b-card-header class="bg-white py-35">
        <h4 class="mb-0">{{title}}</h4>
      </b-card-header>

      <b-card-body class="py-3 pl-3 pr-3">
        <div class="card-text" v-if="blurb && blurb != ''" v-html="blurb">
        </div>
      </b-card-body>

      <!-- <b-card-footer class="bg-white py-35 px-35">
        <button class="btn btn-primary btn-block" @click="index = 0">
          View project
        </button>
      </b-card-footer> -->
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
      credits: {
        type: String
      },
      blurb: {
        type: String
      },
      specs: {
        type: String
      },
      media: {
        type: Array
      },
      classes: {
        type: String,
        default: 'col-12 col-md-6'
      },
      url: {
        type: String,
      }
    },
    data: function() {
      return {
        headerImage: {
          url: null,
          caption: null
        },
        index: null,
        gallery: [],
        id: null,
        isVideo: false,
        urlEmbed: null
      }
    },
    methods: {
      goToCardUrl() {
        let cardUrl = this.url
        let win = window.open(cardUrl, '_blank')
        win.focus()
      },
      /*open() {
        this.index = 0
        this.toggleBodyClass('modal-is-open')
      },
      close() {
        this.index = null
        this.toggleBodyClass('modal-is-open')
      },*/
      toggleBodyClass(className) {
        const body = document.body
        body.classList.toggle(className)
      },
      getVimeoId(url) {
        let m = url.match(/^.+vimeo.com\/(.*\/)?([^#\?]*)/);
        return m ? m[2] || m[1] : null;
      },
      vimeoURL(id) {
        return 'https://player.vimeo.com/video/' + id + '?background=1&autoplay=1&loop=1&byline=0&title=0?muted=1'
      }
    },
    mounted() {
      this.id = this._uid

      let self = this

      if(this.media != undefined) {
        if(this.media.length > 0) {

          // Set the card's header image, based on first item in media
          for (let i = 0; i < this.media.length; i++) {

            // Remove HTML tags from caption
            var html = this.media[0].caption
            var div = document.createElement("div")
            div.innerHTML = html
            var text = div.textContent

            // Set stripped string as headerImage.caption (used for alt)
            this.headerImage.caption = text

            // Check typename, if video use thumbnailUrl as headerImage
            if(this.media[0].__typename != 'VideoRecord') {
              this.headerImage.url = this.media[0].file.url
            } else {
              // If video
              this.isVideo = true;
              let id = this.media[0].file.url.split("https://vimeo.com/")[1]
              this.urlEmbed = this.vimeoURL(id)
              //this.headerImage.url = this.media[0].file.thumbnailUrl
            }
            break;
          }

          // Push all media items to their own array
          this.media.forEach(function(mediaItem, index) {
            // Remove HTML tags from caption
            var html = mediaItem.caption
            var div = document.createElement("div")
            div.innerHTML = html
            var text = div.textContent

            let item = {}
            item.title = text
            item.href = mediaItem.file.url

            switch(mediaItem.__typename) {
              case 'ImageRecord':
                item.type = 'image/jpeg'
                item.poster = mediaItem.file.url
                break
              case 'GifRecord':
                item.type = 'image/gif'
                item.poster = mediaItem.file.url
                break
              case 'VideoRecord':
                item.type = 'text/html'
                item.vimeo = self.getVimeoId(mediaItem.file.url)
                item.poster = mediaItem.file.thumbnailUrl
            }

            self.gallery.push(item)
          })
        }
      }
    }
  }
</script>

<style>
    .pointer {
      cursor: pointer;
    }

    .gallery-video-cnt {
      max-height: 230px;
      overflow: hidden;
    }

    .gallery-video-wrap {
      position: relative;
      overflow: hidden;
      width: 100%;
      padding-top: 56.25%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
    }

    .bg-white {
      background-color: pink !important;
    }

    .card {
      border-radius: 0px !important;
    }

    .card img {
      border-radius: 0px !important;
    }
  
   /* .card:hover {
     border-color: white !important;
     color: white !important;     
     background-color: pink !important;
     transition: all 0.1s ease-in-out !important;
   } */

    .card .card-header h4 {
        transition: all 0.1s ease-in-out !important;
    }

   /* .card:hover .card-header h4 {
     color: white !important;     
     background-color: pink !important;

   } */
  
  .modal-is-open {
    padding-right: 15px;
    overflow-y: hidden;
  }
</style>
