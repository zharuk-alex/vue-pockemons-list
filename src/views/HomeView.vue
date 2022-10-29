<template>
  <div>
    <h3 class="text-h3 my-5">Top Pokemons</h3>
    <TopItems />
    <TopItems :items="topPokemonsData" :key="requiredItemsLoaded" />
    <v-divider class="my-12" color="white"></v-divider>
    <h3 class="text-h3">Pokemons</h3>

    <ItemsList :items="formatedList">
      <template v-slot:card-actions>
        <v-btn
          class="mx-auto"
          color="primary"
          variant="text"
          to="/pokemons"
          v-text="'Show more...'"
        >
        </v-btn>
      </template>
    </ItemsList>
  </div>
</template>

<script>
  import { defineComponent } from 'vue';
  import { createNamespacedHelpers } from 'vuex';
  const { mapGetters, mapActions, mapMutations } =
    createNamespacedHelpers('pokemons');
  // Utils
  import { extractPokemonIdFromUrl, createPokemonSrcFromUrl } from '@/utils';
  // Components
  // import BaseLayout from '@/layouts/BaseLayout.vue';
  import TopItems from '../components/TopItems.vue';
  import ItemsList from '@/components/ItemsList.vue';

  export default defineComponent({
    name: 'HomeView',
    components: {
      ItemsList,
      TopItems,
    },
    data: () => ({
      pokemonsRequiredList: ['charmander', 'pikachu', 'ditto'],
      requiredItemsLoaded: false,
    }),
    computed: {
      ...mapGetters([
        'dashboardList',
        'spritesUrl',
        'pokemonDetail',
        'topPokemons',
      ]),
      formatedList() {
        return [...this.dashboardList].map((i) => ({
          ...i,
          id: extractPokemonIdFromUrl(i.url),
          src: createPokemonSrcFromUrl(this.spritesUrl, i.url),
        }));
      },
      topPokemonsData() {
        let arr = [];
        this.pokemonsRequiredList.forEach((name, index) => {
          let pokemon = this.pokemonDetail(name);
          if (!!pokemon) {
            arr[index] = pokemon;
          }
        });
        return arr;
      },
    },
    methods: {
      ...mapActions(['fetchList', 'fetchSinglePokemon']),
      ...mapMutations([
        'setDashboardList',
        'setPokemonDetail',
        'setTopPokemons',
      ]),
      async getPokemonsListInitialData() {
        if (!this.dashboardList.length) {
          const data = await this.fetchList({ limit: 12 });
          this.setDashboardList(data);
        }
      },
      getTopPokemons() {
        this.pokemonsRequiredList.forEach(async (pokemon) => {
          const data = await this.fetchSinglePokemon(pokemon);
          this.setTopPokemons(name);
        });
        this.requiredItemsLoaded = true;
      },
    },
    mounted() {
      this.getPokemonsListInitialData();
      if (!this.topPokemons.length) {
        this.getTopPokemons();
      }
    },
  });
</script>
