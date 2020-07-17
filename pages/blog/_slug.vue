<template>
  <div>
    <h1 v-if="page">{{page.title}}</h1>
  </div>
</template>

<script>
  import gql from 'graphql-tag'

  export default {
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
