<template>
  <div :class="this.size +  ' mb-5'" v-if="image.url">
    <a :href="url" target="_blank">
      <b-card
      no-body
      :img-src="image.url"
      :img-alt="alt"
      img-top
      tag="article"
      class="instagram-card"
      >
        <b-card-header class="border-0">
          <h4 class="mb-0">{{title}}</h4>
        </b-card-header>

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
      url: {
        type: String
      },
      alt: {
        type: String
      },
      initSize: {
        type: String
      }
    },
    data: function() {
      return {
        image: {
          url: null
        },
        size: 'col-12 col-md-6'
      }
    },
    mounted() {
      this.getThumbnailUrl()

      //Set col size
      if(this.initSize != null) {
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
        this.image.url = url[0] + '/' + url[1] + '/' + url[2] + '/' + url[3] + '/media/?size=l'
      }
    }
  }
</script>
