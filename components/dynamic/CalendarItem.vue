<template>
  <div class="card calendar-card mb-5" v-if="isActive">
    <div class="row m-0">
      <div class="col-md-4 card-body bg-primary d-flex justify-content-center align-items-center" v-bind:class="{ clickable: link}" @click="goToCardUrl()">
        <div>
          <!-- template for single date calendar items -->
          <template v-if="dateStart == dateEnd">
            <div class="d-flex">
              <h1 class="calendar-icon-lg text-center mr-3"><font-awesome-icon icon="calendar-day" /></h1>
              <div>
                <h2 class="date-day text-center fw-black mb-0">{{dateToDay(dateStart)}}</h2>
                <h3 class="date-month text-center text-uppercase mb-0 fw-black">{{dateToMonth(dateStart)}}</h3>
              </div>
            </div>
          </template>

          <!-- template for multiple dates calendar items -->
          <template v-else>
            <div class="d-flex">
              <h1 class="calendar-icon-lg text-center mr-3" style="font-size: 4rem;"><font-awesome-icon icon="calendar-day" /></h1>

              <div class="d-flex">
                <div class="d-inline-block">
                  <h2 class="date-day text-center fw-black mb-0">{{dateToDay(dateStart)}}</h2>
                  <h3 class="date-month text-center text-uppercase mb-0 fw-black">{{dateToMonth(dateStart)}}</h3>
                </div>

                <h1 class="mx-2 mb-0">-</h1>

                <div>
                  <h2 class="date-day text-center fw-black mb-0" style="font-size: 2.4rem">{{dateToDay(dateEnd)}}</h2>
                  <h3 class="date-month text-center text-uppercase mb-0 fw-black">{{dateToMonth(dateEnd)}}</h3>
                </div>
              </div>
            </div>

          </template>
        </div>
      </div>
      <div class="col-md-8 card-body">
        <p class="date-top mb-2">
          <span>
            <font-awesome-icon icon="calendar-alt" />
            {{dateToReadable(dateStart)}}
          </span>
          <span v-if="dateStart != dateEnd">- {{dateToReadable(dateEnd)}}</span>
        </p>
        <h4 class="card-title">{{title}}</h4>
        <div class="card-text" v-if="description" v-html="description"></div>
        <div v-if="address" class="mt-2 mb-3">
          <h5 class="mr-2"><font-awesome-icon icon="map-marker-alt" /> Location</h5>
          <div class="card-text m-p-0" v-html="address"></div>
        </div>
        <button v-if="link" class="btn btn-primary" @click="goToCardUrl()">View event</button>
      </div>
    </div>
  </div>
</template>

<script>
 export default {
   props: {
     type: {
       type: String
     },
     dateStart: {
       type: String
     },
     dateEnd: {
       type: String,
       default: null
     },
     title: {
       type: String
     },
     link: {
       type: String,
       default: null
     },
     description: {
       type: String,
       default: null
     },
     address: {
       type: String,
       default: null
     },
     showPastItems: {
       type: Boolean
     }
   },
   data: function() {
     return {
        isActive: true
     }
   },
   watch: {
     showPastItems: function() {
       this.checkIfActive()
     }
   },
   methods: {
     checkIfActive() {
       if(this.type == 'past' && !this.showPastItems) {
         this.isActive = false
       } else {
         this.isActive = true
       }
     },
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
     goToCardUrl() {
       if(this.link) {
         let cardUrl = this.link
         let win = window.open(cardUrl, '_blank');
         win.focus();
       }
     }
   },
   mounted() {
     this.checkIfActive()
   }
 }
 </script>
