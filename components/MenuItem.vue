<template lang="html">
  <div>
    <b-nav-item-dropdown v-if="type == 'dropdown'" :text="title" :class="itemClass">
      <template v-for="(item, index) in items">
        <b-dropdown-item v-if="item.linkType == 'intern'" :to="item.internLink.slug">
          {{item.title}}
        </b-dropdown-item>

        <a v-else :href="'//' + item.value" class="dropdown-item" target="_blank">
          {{item.title}}
        </a>
      </template>
    </b-nav-item-dropdown>

    <b-nav-item v-if="type == 'intern'" :to="intern.slug" :class="itemClass">
      {{ title }}
    </b-nav-item>

    <a v-else-if="type == 'extern'" :href="'//' + value" target="_blank" :class="itemClass">
      {{title}}
    </a>
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
    },
    itemClass: {
      type: String,
      default: undefined
    }
  }
}
</script>

<style lang="css" scoped>
</style>
