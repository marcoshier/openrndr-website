import landingQuery from "~/apollo/queries/landingData.gql"
import navigationQuery from "~/apollo/queries/navigationData.gql"
import pageQuery from "~/apollo/queries/pageData.gql"
import dynamicQuery from "~/apollo/queries/dynamicData.gql"

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
    },
    currentBlock: "",
    borderStatus: 0
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
    },

    // Scroll event
    set_current_block: function(state, block) {
        state.currentBlock = block
    },
    toggle_border: function(state, videoY) {
        state.borderStatus = videoY
    }
}


export const actions = {
    async nuxtServerInit({ commit }, { error }) {
        const clientApollo = this.app.apolloProvider.defaultClient
        const obj = {}

        console.log('Loading vuex state')
        obj.landing = await new Promise((resolve, reject) => {
            clientApollo
                .query({
                    query: landingQuery
                })
                .then(resp => {
                    // Landing
                    commit("set_landing_page", resp.data.landing)
                    commit("set_landing_features", resp.data.allFeatures)
                    commit("set_landing_ecosystems", resp.data.allEcosystems)
                    commit("set_landing_faqs", resp.data.allFaqs)

                    resolve(resp)
                })
                .catch(err => {
                    console.log(err)
                    resolve(err)
                })
        })

        obj.navigation = await new Promise((resolve, reject) => {
            clientApollo
                .query({
                    query: navigationQuery
                })
                .then(resp => {
                    // Navigation
                    commit("set_main_nav", resp.data.allMainNavigations)
                    commit("set_footer_nav", resp.data.allFooterNavigations)

                    resolve(resp)
                })
                .catch(err => {
                    console.log(err)
                    resolve(err)
                })
        })

        obj.pages = await new Promise((resolve, reject) => {
            clientApollo
                .query({
                    query: pageQuery
                })
                .then(resp => {
                    // Pages
                    commit("set_pages_all", resp.data.allPages)
                    commit("set_pages_children", resp.data.allPageChildren)

                    resolve(resp)
                })
                .catch(err => {
                    console.log(err)
                    resolve(err)
                })
        })

        obj.dynamic = await new Promise((resolve, reject) => {
            clientApollo
                .query({
                    query: dynamicQuery
                })
                .then(resp => {
                    // Dynamic
                    commit("set_guides", resp.data.allGuides)
                    commit("set_tutorials", resp.data.allTutorials)
                    commit("set_news", resp.data.allNews)
                    commit("set_projects", resp.data.allProjects)
                    commit("set_calendars", resp.data.allCalendars)

                    resolve(resp)
                })
                .catch(err => {
                    console.log(err)
                    resolve(err)
                })
        })

        return obj

    },

    // Scroll event
    blockChange(state, block) {
        state.commit("set_current_block", block)
    },

    toggleBorder(state, videoY) {
        state.commit("toggle_border", videoY)
    }

}