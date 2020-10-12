<template>
  <div class="row m-0 px-4 px-lg-5 pt-4 pt-lg-5">
    <div class="col-12 px-0 mb-4 mb-lg-5" v-if="!hasCurrentItems">
      <div class="card p-3 p-lg-5 d-block d-lg-flex flex-row align-items-center">
        <h1 class="display-1 text-center text-lg-left mb-3 mb-lg-0 mr-0 mr-lg-5">
          <font-awesome-icon icon="calendar-times" />
        </h1>
        <div>
          <h2 class="">No upcoming {{type}}</h2>
          <p class="mb-0">We're sorry there are currently no upcoming {{type}} planned.</p>
        </div>
      </div>
    </div>

    <div class="col-12 px-0" v-for="(item, index) in calendarItems">
      <calendar-item
        :type="item.type"
        :dateStart="item.dateStart"
        :dateEnd="item.dateEnd"
        :title="item.title"
        :link="item.link"
        :description="item.note"
        :address="item.address"
        :showPastItems="showPastItems"
       />
    </div>

    <template v-if="hasPastItems">
      <div class="mb-4 mb-lg-5 mt-2">
        <button class="btn btn-primary btn-lg" @click="togglePastItems()">{{buttonText}} past {{type}}</button>
      </div>
    </template>

  </div>
</template>

<script>
  import gql from 'graphql-tag'
  import CalendarItem from '~/components/dynamic/CalendarItem.vue'

  export default {
    apollo: {
      allCalendars: {
        query: gql`query AllCalendars($newType: String!){
          allCalendars(
            filter: {
              eventType: { eq: $newType }
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
        }`,
       variables: function() {
         switch(this.type) {
           case 'events':
             this.calendarType = "event"
             break

           case 'workshops':
             this.calendarType = "workshop"
             break

           case 'exhibitions':
             this.calendarType = "exhibition"
             break
           default:
             this.calendarType = "event"
         }

         return {
           newType: this.calendarType
         }
       }
      }
    },
    components: {
      CalendarItem
    },
    props: {
      page: {
        type: Object
      },
      name: {
        type: String
      },
      type: {
        type: String
      }
    },
    data: function() {
      return {
        calendarType: null,
        calendarItems: [],
        hasPastItems: false,
        hasCurrentItems: false,
        showPastItems: false,
        buttonText: 'View '
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
      },
      dateToReadable(date) {
        let newDate = new Date(date)
        newDate = newDate.toDateString().split(' ').slice(1).join(' ')

        return newDate
      },
      goToCardUrl(cardUrl) {
        if(cardUrl) {
          let win = window.open(cardUrl, '_blank');
          win.focus();
        }
      },
      togglePastItems: function() {
        this.showPastItems = !this.showPastItems
        console.log(this.showPastItems)
      }
    },
    watch: {
      allCalendars: function() {
        if(this.allCalendars) {
          let now = new Date()
          let self = this

          this.allCalendars.forEach(function(item, index) {
            let date = new Date(item.dateStart)

            if(date < now) {
              item.type = 'past'
              self.hasPastItems = true
            } else {
              item.type = 'current'
              self.hasCurrentItems = true
            }
            self.calendarItems.push(item)
          })

          // Sort the calendarItems array
          this.calendarItems.sort()
          this.calendarItems.reverse()
        }
      },
      showPastItems: function() {
        if(this.showPastItems) {
          this.buttonText = 'Hide '
        } else {
          this.buttonText = 'View '
        }
      }
    }
  }
</script>

<style>
  .calendar-card .calendar-icon-lg {
    font-size: 4rem;
  }

  .calendar-card .date-day {
    font-size: 2.4rem;
  }

  .calendar-card .date-month {
    font-size: 1.6rem;
  }

  .calendar-card .date-top {
    font-size: 1.1rem;
  }
</style>
