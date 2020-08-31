<template>
  <div class="row p-5">
    <div class="col-12" v-for="(item, index) in allCalendars">
      <div class="card mb-5">
        <div class="row m-0">
          <div class="col-md-4 card-body bg-primary">
            <h4></h4>
          </div>
          <div class="col-md-8 card-body">
            <p class="text-muted">
              <span>{{item.dateStart}}</span>
              <span v-if="item.dateStart != item.dateEnd">- {{item.dateEnd}}</span>
            </p>
            <h4>{{item.title}}</h4>
            <div v-if="item.note" v-html="item.note"></div>
            <button v-if="item.link" class="btn btn-primary">View workshop</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import gql from 'graphql-tag'

  export default {
    apollo: {
      allCalendars: gql`{
        allCalendars(
          filter: {
            eventType: { eq: "workshop" }
          },
          orderBy: [dateStart_ASC]
        ) {
          dateStart
          dateEnd
          link
          note
          title
          address
        }
      }`
    },
    props: {
      items: {
        type: Array
      },
      page: {
        type: Object
      },
      name: {
        type: String
      }
    }
  }
</script>
