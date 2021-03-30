<template>
  <div v-if="allNews">
    <div v-if="allNews.length > 0" class="row row-eq-height px-4 py-4">
      <template v-for="(item, index) in allNews">
        <news-item
        :title="item.title" :description="item.description" :url="item.url" :image="item.image" :category="item.category.title"
        />
      </template>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex"
  import NewsItem from '~/components/dynamic/NewsItem.vue'

  export default {
    components: {
      NewsItem
    },
    props: {
      name: {
        type: String
      },
      page: {
        type: Object
      }
    },
    computed: {
      ...mapState({
        allNews: (state) => state.dynamic.allNews
      })
    }
  }
</script>
