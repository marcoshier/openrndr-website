import getLandingQuery from "~/apollo/queries/landing/landing.gql"
import getFeaturesQuery from "~/apollo/queries/landing/keyFeatures.gql"
import getEcosystemsQuery from "~/apollo/queries/landing/ecosystems.gql"
import getFaqsQuery from "~/apollo/queries/landing/faqs.gql"

import getMainNavigationsQuery from "~/apollo/queries/navigation/allMainNavigations.gql"
import getFooterNavigationsQuery from "~/apollo/queries/navigation/allFooterNavigations.gql"

import getAllPagesQuery from "~/apollo/queries/pages/allPages.gql"
import getAllPageChildren from "~/apollo/queries/pages/allPageChildren.gql"

import getAllGuides from "~/apollo/queries/dynamic/allGuides.gql"
import getAllTutorials from "~/apollo/queries/dynamic/allTutorials.gql"
import getAllNews from "~/apollo/queries/dynamic/allNews.gql"
import getAllProjects from "~/apollo/queries/dynamic/allProjects.gql"
import getAllCalendars from "~/apollo/queries/dynamic/allCalendars.gql"

export const state = () => ({
  landingPage: {
    content: {},
    allKeyFeatures: {},
    allEcosystems: {},
    allFaqs: {}
  },
  navigation: {
    allMainNavigations: [],
    allFooterNavigations: []
  },
  pages: {
    allPages: [],
    allPageChildren: [],
    current: {}
  },
  dynamic: {
    allGuides: [],
    allTutorials: [],
    allNews: [],
    allProjects: [],
    allCalendars: [],
  }
})

export const getters = {
  landingPage: state => {
    return state.landing
  },
  currentPage: (state) => (slug) => {
    return state.pages.allPages.find(page => page.slug === slug)
  },
  currentPageChild: (state) => (slug) => {
    return state.pages.allPageChildren.find(page => page.slug === slug)
  }
}

export const mutations = {
  // Landing
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

  // Navigation
  set_main_nav: function(state, items) {
    state.navigation.allMainNavigations = items
  },
  set_footer_nav: function(state, items) {
    state.navigation.allFooterNavigations = items
  },

  // Pages
  set_pages_all: function(state, pages) {
    state.pages.allPages = pages
  },
  set_pages_children: function(state, pages) {
    state.pages.allPageChildren = pages
  },

  // Dynamic
  set_guides: function(state, items) {
    state.dynamic.allGuides = items
  },
  set_tutorials: function(state, items) {
    state.dynamic.allTutorials = items
  },
  set_news: function(state, items) {
    state.dynamic.allNews = items
  },
  set_projects: function(state, items) {
    state.dynamic.allProjects = items
  },
  set_calendars: function(state, items) {
    state.dynamic.allCalendars = items
  }
}


export const actions = {
  nuxtServerInit({ commit }, { error }) {
   const clientApollo = this.app.apolloProvider.defaultClient
   const obj = {}

   // Landing
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

   // Navigation
   obj.allMainNavigations =  new Promise((resolve, reject) => {
     clientApollo
       .query({
         query: getMainNavigationsQuery
       })
       .then(resp => {
         commit("set_main_nav", resp.data.allMainNavigations)
         resolve(resp)
       })
       .catch(err => {
         resolve(err)
       })
   })
   obj.allFooterNavigations =  new Promise((resolve, reject) => {
     clientApollo
       .query({
         query: getFooterNavigationsQuery
       })
       .then(resp => {
         commit("set_footer_nav", resp.data.allFooterNavigations)
         resolve(resp)
       })
       .catch(err => {
         resolve(err)
       })
   })

   // Pages
   obj.allPages =  new Promise((resolve, reject) => {
     clientApollo
       .query({
         query: getAllPagesQuery
       })
       .then(resp => {
         commit("set_pages_all", resp.data.allPages)
         resolve(resp)
       })
       .catch(err => {
         resolve(err)
       })
   })
   obj.allPageChildren =  new Promise((resolve, reject) => {
     clientApollo
       .query({
         query: getAllPageChildren
       })
       .then(resp => {
         commit("set_pages_children", resp.data.allPageChildren)
         resolve(resp)
       })
       .catch(err => {
         resolve(err)
       })
   })

   // Dynamic
   obj.allGuides =  new Promise((resolve, reject) => {
     clientApollo
       .query({
         query: getAllGuides
       })
       .then(resp => {
         commit("set_guides", resp.data.allGuides)
         resolve(resp)
       })
       .catch(err => {
         resolve(err)
       })
   })
   obj.allTutorials =  new Promise((resolve, reject) => {
     clientApollo
       .query({
         query: getAllTutorials
       })
       .then(resp => {
         commit("set_tutorials", resp.data.allTutorials)
         resolve(resp)
       })
       .catch(err => {
         resolve(err)
       })
   })
   obj.allNews =  new Promise((resolve, reject) => {
     clientApollo
       .query({
         query: getAllNews
       })
       .then(resp => {
         commit("set_news", resp.data.allNews)
         resolve(resp)
       })
       .catch(err => {
         resolve(err)
       })
   })
   obj.allProjects =  new Promise((resolve, reject) => {
     clientApollo
       .query({
         query: getAllProjects
       })
       .then(resp => {
         commit("set_projects", resp.data.allProjects)
         resolve(resp)
       })
       .catch(err => {
         resolve(err)
       })
   })
   obj.allCalendars =  new Promise((resolve, reject) => {
     clientApollo
       .query({
         query: getAllCalendars
       })
       .then(resp => {
         commit("set_calendars", resp.data.allCalendars)
         resolve(resp)
       })
       .catch(err => {
         resolve(err)
       })
   })

   return obj.landing

 }
}
