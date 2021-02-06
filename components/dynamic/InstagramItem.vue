<template>
  <div :class="this.size +  ' mb-4 mb-lg-5'" v-if="image.url">
    <b-card
    no-body
    :img-src="image.url"
    :img-alt="alt"
    img-top
    tag="article"
    class="instagram-card clickable h-100"
    @click="goToCardUrl()"
    >
      <b-card-header class="border-0 bg-white px-35 py-35">
        <h4 class="mb-0" ><font-awesome-icon :icon="['fab', 'instagram']" class="mr-2" /> {{parsedTitle}}</h4>
      </b-card-header>

    </b-card>
  </div>
</template>

<script>

  export default {
    props: {
      title: {
        type: String
      },
      url: {
        type: String
      },
      alt: {
        type: String
      },
      initSize: {
        type: String
      },
      initClass: {
        type: String
      }
    },
    data: function() {
      return {
        image: {
          url: null
        },
        size: 'col-12 col-md-6',
        parsedTitle: null
      }
    },
    mounted() {
      this.getThumbnailUrl()
      this.shortenTitle(this.title)

      //Set col size
      if(this.initClass != undefined && this.initClass != '') {
        this.size = this.initClass
      } else if(this.initSize != undefined) {
        switch(this.initSize) {
          case 'small':
            this.size = 'col-12 col-md-4'
              break
          case 'medium':
            this.size = 'col-12 col-md-6'
            break
          case 'large':
            this.size = 'col-12 col-md-12'
            break
          default:
            this.size = 'col-12 col-md-6'
        }
      }
    },
    methods: {
      getThumbnailUrl() {
        let url

        // Split url in pieces on '/'
        url = this.url.split('/')

        // Loop through array and remove any empty array items
        for(let i = 0; i < url.length; i++) {
          if(url[i] == '') {
            url.splice(i, 1)
          }
        }

        // Build new thumbnail url based on the first 4 array items
        this.image.url = url[0] + '//' + url[1] + '/' + url[2] + '/' + url[3] + '/media/?size=l'
      },
      shortenTitle(title) {
        let newTitle = title.substring(0, 24)

        if(title.length > 25) {
          newTitle = newTitle + '...'
        }

        this.parsedTitle = newTitle
      },
      goToCardUrl() {
        let cardUrl = this.url
        let win = window.open(cardUrl, '_blank')
        win.focus()
      }
    }
  }
</script>
