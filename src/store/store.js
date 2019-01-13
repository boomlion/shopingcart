import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    allnum: JSON.parse(localStorage.getItem('have')) || []
  },
  mutations: {
    addValue (state, itemid) {
      if (state.allnum.some(ele => ele.id === itemid.id)) {
        state.allnum.filter(ele => ele.id === itemid.id)[0].count = itemid.count
      } else {
        state.allnum.push(itemid)
      }
      state.allnum = state.allnum.filter(res => res.count > 0)
      localStorage.setItem('have', JSON.stringify(state.allnum))
    }
  },
  getters: {
    ids (state) {
      return state.allnum.map(item => item.id).join(',')
    },
    giveCount (state) {
      return state.allnum
    }
  }
})
