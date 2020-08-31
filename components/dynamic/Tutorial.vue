<template>
  <div class="p-5">
    <div class="row row-eq-height">
      <template v-for="(item, index) in items">
        <tutorial-item
        :title="item.title" :description="item.description" :url="item.url" :time="item.estimatedTime" :image="item.image"
        />
      </template>
    </div>
  </div>
</template>

<script>
  import TutorialItem from '~/components/dynamic/TutorialItem.vue'

  export default {
    components: {
      TutorialItem
    },
    props: {
      name: {
        type: String
      },
      items: {
        type: Array
      },
      page: {
        type: Object
      }
    }
  }
</script>
