<template>
  <div class="row p-5">
    <div class="col-12" v-for="(item, index) in allCalendars">
      <div class="card mb-5">
        <div class="row m-0">
          <div class="col-md-4 card-body bg-primary">
            <!-- template for single date calendar items -->
            <template v-if="item.dateStart != item.dateEnd">
              <h1 class="text-center"><font-awesome-icon icon="calendar-day" /></h1>
              <h4 class="text-center">{{dateToDay(item.dateStart)}}</h4>
              <h4 class="text-center">{{dateToMonth(item.dateStart)}}</h4>
            </template>

            <!-- template for multiple dates calendar items -->
            <template v-else>
              <h1 class="text-center"><font-awesome-icon icon="calendar-day" /></h1>
              <h4 class="text-center">{{dateToDay(item.dateStart)}} - {{dateToDay(item.dateEnd)}}</h4>
              <h4 class="text-center">{{dateToMonth(item.dateStart)}} - {{dateToMonth(item.dateEnd)}}</h4>
            </template>
          </div>
          <div class="col-md-8 card-body">
            <p class="text-muted">
              <span>
                <font-awesome-icon icon="calendar-alt" />
                {{item.dateStart}}
              </span>
              <span v-if="item.dateStart != item.dateEnd">- {{item.dateEnd}}</span>
            </p>
            <h4>{{item.title}}</h4>
            <div v-if="item.note" v-html="item.note"></div>
            <button v-if="item.link" class="btn btn-primary">View event</button>
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
            eventType: { eq: "event" }
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
    },
    methods: {
      dateToMonth(date) {
        let newDate = new Date(date)
        let month = newDate.toLocaleString('en-GB', { month: 'short'})

        return month

      },

      dateToDay(date) {
        let newDate = new Date(date)
        let day = (newDate.getDate() < 10 ? '0' : '') + newDate.getDate()

        return day
      }
    }
  }
</script>
