<template>
  <div v-if="page">
    <div class="jumbotron jumbotron-fluid">
      <div class="container text-center">
        <h1 class="display-4">{{page.title}}</h1>
        <p class="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
      </div>
    </div>
  </div>

  <div v-else>
  </div>
</template>

<script>
  import gql from 'graphql-tag'
  import ContentBlock from '~/components/ContentBlock.vue'

  export default {
    layout: 'sidebar',
    components: {
      ContentBlock,
    },
    apollo: {
      page: {
        query: gql`query Page($slug: String!){
                page(filter: {
                   slug: {
                      eq: $slug
                }}) {
                    title
                }
            }`,
        prefetch({route}) {
            return {
                slug: route.params.slug
            }
        },
        variables() {
            return {
                slug: this.$route.params.slug
            }
        }
      }
    }
  }
</script>
