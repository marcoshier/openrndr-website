<template lang="html">
  <div>
    <b-nav-item-dropdown v-if="type == 'dropdown'" :text="title" :key="index">
      <template v-for="(item, index) in items">
        <b-dropdown-item v-if="item.linkType == 'intern'" :key="index" :to="item.internLink.slug">
          {{item.title}}
        </b-dropdown-item>

        <a v-else :key="index" :href="'//' + item.value" class="dropdown-item" target="_blank">
          {{item.title}}
        </a>
      </template>
    </b-nav-item-dropdown>

    <b-nav-item v-if="type == 'normal'" :key="index" :to="intern.slug">
      {{ title }}
    </b-nav-item>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    type: {
      type: String
    },
    intern: {
      type: Object,
      default: undefined
    },
    value: {
      type: String,
      default: undefined
    },
    items: {
      type: Array,
      default: undefined
    }
  }
}
</script>

<style lang="css" scoped>
</style>
