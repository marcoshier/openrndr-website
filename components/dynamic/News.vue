<template>
  <div>
    <div class="row row-eq-height">
      <template v-for="(item, index) in items">
        <news-item
        :title="item.title" :description="item.description" :url="item.url" :image="item.image" :category="item.category.title"
        />
      </template>
    </div>
  </div>
</template>

<script>
  import NewsItem from '~/components/dynamic/NewsItem.vue'

  export default {
    components: {
      NewsItem
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
