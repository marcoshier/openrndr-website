<template lang="html">
  <div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  apollo: {
    allPages: gql`{
      allPages {
        slug
      }
    }`
  },
  mounted() {
    foreach(this.allPages)
    console.log(this.allPages)
  }
}
</script>

<style lang="css" scoped>
</style>
