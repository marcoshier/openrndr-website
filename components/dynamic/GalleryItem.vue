<template>
  <div class="col-12 col-md-6 mb-5">
    <v-gallery :id="'blue-imp-gallery-' + id" :images="gallery" :index="index" @close="index = null"></v-gallery>
    <b-card
      no-body
      :img-src="headerImage.url"
      :img-alt="headerImage.caption"
      img-top
      tag="article"
      class="h-100 card-overflow clickable"
      @click="index = 0"
    >
      <b-card-header>
        <h4 class="mb-0">{{title}}</h4>
      </b-card-header>

      <b-card-body>
        <b-card-text v-if="blurb && blurb != ''" v-html="blurb">
        </b-card-text>
      </b-card-body>

      <b-card-footer>
        <b-button href="#" variant="primary">Go somewhere</b-button>
      </b-card-footer>
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
    },
    methods: {
      getVimeoId(url) {
        let m = url.match(/^.+vimeo.com\/(.*\/)?([^#\?]*)/);
        return m ? m[2] || m[1] : null;
      }
    }
  }
</script>

<style>
  .card-overflow .card-body {
    max-height: 200px;
    overflow-y: scroll;
  }

  .card-overflow .card-img-top {
    height: 250px;
  }
</style>
