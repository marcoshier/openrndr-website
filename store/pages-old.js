// import getLandingQuery from "~/apollo/queries/landing/landing.gql";
//
// export const state = () => ({
//   list: [],
//   menuItems: [],
//   landing: {},
//   current: {}
// })
//
// export const getters = {
//   allPages: state => {
//   return state.list
//   },
//   allMenuItems: state => {
//     return state.menuItems
//   },
//   landingPage: state => {
//     return state.landing
//   },
//   currentPage: state => {
//     return state.current
//   }
// }
//
// export const mutations = {
//   set_landing: function(state, landing) {
//     state.landing = landing
//   }
// }
//
// export const actions = {
//   nuxtServerInit({ commit }, { error }) {
//    const clientApollo = this.app.apolloProvider.defaultClient
//    return new Promise((resolve, reject) => {
//      clientApollo
//        .query({
//          query: getLandingQuery
//        })
//        .then(resp => {
//          console.log(resp)
//          commit("set_landing", resp.data.landing)
//          resolve(resp)
//        })
//        .catch(err => {
//          resolve(err)
//        })
//    })
//  },
//   async getAllPages({commit}) {
//     await this.$axios.get('cars')
//       .then((res) => {
//         if (res.status === 200) {
//           commit('set', res.data)
//         }
//       })
//   },
//   async getLanding({commit}) {
//     await this.$axios.get('cars')
//       .then((res) => {
//         if (res.status === 200) {
//           commit('set', res.data)
//         }
//       })
//   },
//   async getAllMenuItems({commit}) {
//     await this.$axios.get('cars')
//       .then((res) => {
//         if (res.status === 200) {
//           commit('set', res.data)
//         }
//       })
//   },
// }
