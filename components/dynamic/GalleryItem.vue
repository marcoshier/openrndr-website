<template>
  <div :class="classes + ' mb-4 mb-lg-5 gallery-item-full'">
    <v-gallery :id="'blue-imp-gallery-' + id" :images="gallery" :index="index" @close="close()"></v-gallery>
    <b-card
      no-body
      img-top
      tag="article"
      class="h-100 card-overflow"
    >
      <b-card-img
        v-if="headerImage.url"
        :src="headerImage.url"
        :alt="headerImage.caption"
        @click="open()"
        class="rounded-0 clickable">
      </b-card-img>
      <b-card-header class="bg-white py-35">
        <h4 class="mb-0">{{title}}</h4>
      </b-card-header>

      <b-card-body class="py-3 pl-3 pr-0">
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
        id: null
      }
    },
    methods: {
      open() {
        this.index = 0
        this.toggleBodyClass('modal-is-open')
      },
      close() {
        this.index = null
        this.toggleBodyClass('modal-is-open')
      },
      toggleBodyClass(className) {
        const body = document.body
        body.classList.toggle(className)
      },
      getVimeoId(url) {
        let m = url.match(/^.+vimeo.com\/(.*\/)?([^#\?]*)/);
        return m ? m[2] || m[1] : null;
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
              this.headerImage.url = this.media[0].file.thumbnailUrl
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
  .modal-is-open {
    padding-right: 15px;
    overflow-y: hidden;
  }
</style>
