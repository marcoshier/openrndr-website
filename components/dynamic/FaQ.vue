<template lang="html">
  <div v-if="allFaqs" role="tablist" class="px-4 px-lg-5 pt-4 pt-lg-5 faq">
    <div v-for="(question, index) in allFaqs" :key="index" class="mb-5">
      <div role="tab">
        <a class="question" v-b-toggle :href="'#accordion-'+index" @click.prevent><h4 class="mb-2">{{question.question}}</h4></a>
      </div>
      <b-collapse :id="'accordion-'+index" accordion="faq" class="ml-2">
        <div v-html="question.answer">
        </div>
      </b-collapse>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"

export default {
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
     allFaqs: (state) => state.landingPage.allFaqs
   })
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

 .faq {
    .question:hover, a.not-collapsed {
     color: $primary !important;
     text-decoration: underline;
   }
 }
</style>
