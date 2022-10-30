import axios from 'axios'

const BASE_API_URL = 'https://pokeapi.co/api/v2';
const BASE_SPRITES_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

export default {
  namespaced: true,
  state: {
    pokemons: {}, // pokemons with detail information
    list: [],
    dashboardList: [],
    topPokemons: [],
    countPokemonsInDB: 0,
    appLoader: false,
  },
  getters: {
    list: (state) => state.list,
    dashboardList: (state) => state.dashboardList,
    appLoader: (state) => state.appLoader,
    countPokemonsInDB: (state) => state.countPokemonsInDB,
    spritesUrl: () => BASE_SPRITES_URL,
    pokemonDetail: (state) => (payload) => {
      // get by both: {name} and {id}
      payload = payload.toString().toLowerCase()
      let pokemon = state.pokemons[payload]
      if (!pokemon) {
        pokemon = Object.values(state.pokemons).find(item => item.id == payload)
      }
      return pokemon
    },
    topPokemons: (state) => state.topPokemons || [] // Array of Ids
  },
  mutations: {
    setList: (state, payload) => state.list = payload || [],
    setDashboardList: (state, payload) => state.dashboardList = payload || [],
    setAppLoader: (state, payload) => state.appLoader = payload,
    setCountPokemonsInDB: (state, payload) => state.countPokemonsInDB = +payload,
    setTopPokemons: (state, payload) => state.topPokemons.push(payload),
    setPokemonDetail: (state, { name, data }) => {
      const { id, abilities, stats, moves,
        sprites: { front_default: icon },
        sprites: { other: { dream_world: { front_default: src } } }
      } = data;

      state.pokemons = {
        ...state.pokemons,
        [name]: { id, name, abilities, stats, moves, icon, src }
      }
    }
  },
  actions: {
    async fetchList({ commit }, { limit = 12, offset = 0 }) {
      commit('setAppLoader', true);
      return axios
        .get(`${BASE_API_URL}/pokemon`, {
          params: { limit, offset },
        })
        .then(response => {
          commit("setCountPokemonsInDB", response.data.count);
          return response.data.results;
        })
        .catch(e => {
          console.log(e);
          commit('setError', e.response.data, { root: true })
        })
        .finally(() => {
          setTimeout(() => {
            commit('setAppLoader', false);
          }, 1000)
        });
    },

    async fetchSinglePokemon({ commit }, name) {
      commit('setAppLoader', true);
      commit('setError', null, { root: true })
      return axios
        .get(`${BASE_API_URL}/pokemon/${name}`)
        .then(response => {
          let { name } = response.data
          commit('setPokemonDetail', { name, data: response.data })
          return response
        })
        .catch(e => {
          console.log(e);
          commit('setError', e.response.data, { root: true })
          return e
        })
        .finally(() => {
          setTimeout(() => {
            commit('setAppLoader', false);
          }, 1000)
        });
    }
  },
}