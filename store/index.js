import getLandingQuery from "~/apollo/queries/landing/landing.gql"
import getFeaturesQuery from "~/apollo/queries/landing/keyFeatures.gql"
import getEcosystemsQuery from "~/apollo/queries/landing/ecosystems.gql"
import getFaqsQuery from "~/apollo/queries/landing/faqs.gql"

export const state = () => ({
  landingPage: {
    content: {},
    allKeyFeatures: {},
    allEcosystems: {},
    allFaqs: {}
  }
})

export const getters = {
  landingPage: state => {
    return state.landing
  }
}

export const mutations = {
  set_landing_page: function(state, content) {
    state.landingPage.content = content
  },
  set_landing_features: function(state, features) {
    state.landingPage.allKeyFeatures = features
  },
  set_landing_ecosystems: function(state, ecosystems) {
    state.landingPage.allEcosystems = ecosystems
  },
  set_landing_faqs: function(state, faqs) {
    state.landingPage.allFaqs = faqs
  },
}


export const actions = {
  nuxtServerInit({ commit }, { error }) {
   const clientApollo = this.app.apolloProvider.defaultClient
   const obj = {}
   obj.landing =  new Promise((resolve, reject) => {
     clientApollo
       .query({
         query: getLandingQuery
       })
       .then(resp => {
         commit("set_landing_page", resp.data.landing)
         resolve(resp)
       })
       .catch(err => {
         resolve(err)
       })
   })

   obj.allFeatures =  new Promise((resolve, reject) => {
     clientApollo
       .query({
         query: getFeaturesQuery
       })
       .then(resp => {
         commit("set_landing_features", resp.data.allFeatures)
         resolve(resp)
       })
       .catch(err => {
         resolve(err)
       })
   })

   obj.allEcosystems =  new Promise((resolve, reject) => {
     clientApollo
       .query({
         query: getEcosystemsQuery
       })
       .then(resp => {
         commit("set_landing_ecosystems", resp.data.allEcosystems)
         resolve(resp)
       })
       .catch(err => {
         resolve(err)
       })
   })

   obj.allFaqs =  new Promise((resolve, reject) => {
     clientApollo
       .query({
         query: getFaqsQuery
       })
       .then(resp => {
         commit("set_landing_faqs", resp.data.allFaqs)
         resolve(resp)
       })
       .catch(err => {
         resolve(err)
       })
   })

   return obj.landing

 }
}
