<template>
  <div>
    <div v-if="visible" class="modal-full animation-pop-open" ref="modal">
      <div class="p-4 container border-right border-left border-primary">
      </div>
      <div class="w-100 border-top border-bottom border-primary">
        <div class="container border-left border-right border-primary p-0">
          <div class="p-5 border-bottom border-primary">
            <h2 class="mb-0">
              <span>{{title}}</span>
              <span @click="close()" class="clickable float-right"><font-awesome-icon :icon="['fas', 'times']" /></span>
            </h2>
          </div>
          <div class="row row-eq-height px-4 pt-5 m-0">
            <template v-for="(item, index) in items">
              <instagram-item
              :title="item.title" :url="item.link" :alt="item.alt" initClass="col-12 col-md-6 col-lg-4 px-3" initSize="small"
              />
            </template>
          </div>
        </div>
      </div>
      <div class="p-4 container border-right border-left border-primary">
      </div>
    </div>

    <button class="btn btn-light btn-lg" @click="open()">
      See all items
    </button>
  </div>
</template>

<script>
  import InstagramItem from '~/components/dynamic/InstagramItem.vue'
  export default {
    components: {
      InstagramItem
    },
    props: {
      items: {
        type: Array
      },
      title: {
        type: String
      }
    },
    data: function() {
      return {
        visible: false
      }
    },
    methods: {
      open() {
        this.visible = true
        this.toggleBodyClass('modal-is-open')
      },
      close() {
        const currentModal = this.$refs.modal
        currentModal.classList.toggle('animation-pop-close')
        this.toggleBodyClass('modal-is-open')

        // Wait for CSS close animation to finish
        setTimeout(() => {
          this.visible = false
          currentModal.classList.toggle('animation-pop-close')
        }, 175)

      },
      toggleBodyClass(className) {
        const body = document.body
        body.classList.toggle(className)
      }
    }
  }
</script>

<style>
  .modal-full {
    position: fixed;
    z-index: 999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: white;
    overflow-y: scroll;
  }

  .modal-is-open {
    overflow-y: hidden;
    padding-right: 15px;
  }

  .animation-pop-open {
    animation: pop-open 0.175s linear 1;
  }

  .animation-pop-close {
    animation: pop-close 0.175s linear 1;
  }

  @keyframes pop-open{
    0%  {
      transform: scale(.1);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes pop-close{
    0% {
      transform: scale(1);
    }
    100%  {
      transform: scale(.1);
    }
  }
</style>
