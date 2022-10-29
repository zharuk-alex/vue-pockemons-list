import { createStore } from 'vuex'
import pokemons from './pokemons'

export default createStore({
  state: {
    error: null,
  },
  mutations: {
    setError: (state, e) => state.error = e,
  },
  getters: {
    error: (state) => state.error
  },
  modules: {
    pokemons
  }
})
