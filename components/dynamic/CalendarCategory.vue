<template>
  <div class="row m-0 px-4 px-lg-5 pt-4 pt-lg-5">
    <div class="col-12 px-0 mb-4 mb-lg-5" v-if="hasPastItems == false">
      <div class="card p-3 p-lg-5 d-block d-lg-flex flex-row align-items-center">
        <div>
          <h2 class="">No upcoming {{type}}</h2>
          <p class="mb-0">We're sorry there are currently no upcoming {{type}} planned.</p>
        </div>
      </div>
    </div>

    <div class="col-12 px-0" v-for="(item, index) in sortedCalendarItems" v-if="index < maxItems">
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
        <button class="btn btn-lg" @click="togglePastItems()">{{buttonText}} {{type}}</button>
      </div>
    </template>

  </div>
</template>

<script>
  import { mapState } from "vuex"
  import CalendarItem from '~/components/dynamic/CalendarItem.vue'

  export default {
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
        showPastItems: true,
        buttonText: 'View more',
        expanded: true,
        maxItems: 2
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
        //this.showPastItems = !this.showPastItems
        this.expanded = !this.expanded
        if(this.expanded == false) {
          this.buttonText = "View less"
          this.maxItems = this.calendarItems.length
        } else {
          this.maxItems = 2
          this.buttonText = "View more"
        }
      },
      sortCalendarItems() {
        let now = new Date()
        let self = this


        this.allCalendars.forEach(function(item, index) {
          if(self.calendarType == item.eventType) {
            let date = new Date(item.dateStart)

            if(date < now) {
              item.type = 'past'
              self.hasPastItems = true
            } else {
              item.type = 'current'
              self.hasCurrentItems = true
            }
            self.calendarItems.push(item)
          }
        })

        console.log(this.calendarItems)
        // Sort the calendarItems array
        //this.calendarItems.sort((a, b))
        //this.calendarItems.reverse()
      }
    },
    watch: {
      showPastItems: function() {
        if(this.showPastItems) {
          this.buttonText = 'Hide '
        } else {
          this.buttonText = 'View '
        }
      }
    },
    computed: {
      ...mapState({
        allCalendars: (state) => state.dynamic.allCalendars
      }),
      
      sortedCalendarItems: function() {
        let sortedItems = this.calendarItems.sort((a, b) => new Date(a.dateStart) - new Date(b.dateStart))
        return sortedItems.reverse()
      }
    },
    mounted() {
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

      this.sortCalendarItems()
    }
  }
</script>

<style>
  .calendar-card .calendar-icon-lg {
    font-size: 3.5rem;
  }

  .calendar-card .date-day {
    font-size: 2rem;
  }

  .calendar-card .date-month {
    font-size: 1.4rem;
  }

  .calendar-card .date-top {
    font-size: 1.1rem;
  }
</style>
