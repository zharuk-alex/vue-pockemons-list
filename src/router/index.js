import { createRouter, createWebHistory } from 'vue-router'
const webHistoryPath = import.meta.env.BASE_URL // if will deploy to github:pages
import HomeView from "@/views/HomeView.vue";
import store from "@/store"

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    alias: '/home',
  },
  {
    path: "/pokemons",
    name: "pokemons:list",
    component: () => import('@/views/ListView.vue'),
    meta: {
      breadCrumb: [
        {
          text: 'Home',
          to: { name: 'home' }
        },
        {
          text: "Pokemons",
          to: {},
        }
      ]
    }
  },
  {
    path: "/pokemons/:name",
    name: "pokemon:detail",
    component: () => import('@/views/SinglePokemonView.vue'),
    beforeEnter: (async (to, from, next) => {
      const { name } = to.params
      store.commit('setError', null)
      !!store.getters['pokemons/pokemonDetail'](name) || (await store.dispatch('pokemons/fetchSinglePokemon', name));
      next()
    }),
    meta: {
      breadCrumb(route) {
        return [
          {
            text: 'Home',
            to: { name: 'home' }
          },
          {
            text: 'Pokemons',
            to: { name: 'pokemons:list' }
          },
          {
            text: route.params.name,
            to: {},
          }
        ]
      }
    }
  },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: () => import('@/views/NotFoundView.vue') },
]

const router = createRouter({
  history: createWebHistory(webHistoryPath),
  routes,
  scrollBehavior(to, from, savedPosition) {

    if (savedPosition) {
      return savedPosition
    }

    if (to.hash) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ el: to.hash, behavior: 'smooth' })
        }, 300)
      })
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ top: 0, behavior: 'smooth' })
      }, 300)
    })
  }
})

export default router