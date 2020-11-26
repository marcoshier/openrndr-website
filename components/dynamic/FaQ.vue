<template lang="html">
  <div v-if="allFaqs" role="tablist" class="px-4 px-lg-5 pt-4 pt-lg-5 faq">
    <div v-for="(question, index) in allFaqs" :key="index" class="mb-5">
      <div role="tab">
        <a class="question" v-b-toggle :href="'#accordion-'+index" @click.prevent><h4 class="mb-2">{{question.question}}</h4></a>
      </div>
      <b-collapse :id="'accordion-'+index" accordion="faq">
        <div v-html="question.answer">
        </div>
      </b-collapse>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  apollo: {
    allFaqs: gql`{
      allFaqs {
        question
        answer
      }
    }`
  },
  props: {
    name: {
      type: String
    },
    page: {
      type: Object
    }
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
