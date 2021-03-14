export const state = () => ({
  list: [],
  menuItems: [],
  landing: {},
  current: {}
})

export const getters = {
  allPages: state => {
  return state.pages.list
  },
  allMenuItems: state => {
    return state.pages.menuItems
  },
  landingPage: state => {
    return state.pages.landing
  },
  currentPage: state => {
    return state.pages.current
  }
}

export const actions = {
  async getAllPages({commit}) {
    await this.$axios.get('cars')
      .then((res) => {
        if (res.status === 200) {
          commit('set', res.data)
        }
      })
  },
  async getLanding({commit}) {
    await this.$axios.get('cars')
      .then((res) => {
        if (res.status === 200) {
          commit('set', res.data)
        }
      })
  },
  async getAllMenuItems({commit}) {
    await this.$axios.get('cars')
      .then((res) => {
        if (res.status === 200) {
          commit('set', res.data)
        }
      })
  },
}
