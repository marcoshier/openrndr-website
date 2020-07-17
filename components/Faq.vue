<template>
  <div role="tablist">
    <div v-for="(question, index) in faq" :key="index">
      <div role="tab">
        <a v-b-toggle :href="'#accordion-'+index"><h5>{{question.question}}</h5></a>
      </div>
      <b-collapse :id="'accordion-'+index" accordion="faq">
        <div v-html="question.answer">
        </div>
      </b-collapse>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      faq: {
        type: Array
      }
    }
  }
</script>
