import Vue from 'vue'
import Vuex from 'vuex'

import bliss from './bliss'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    // example
    bliss
  }
})

export default store
