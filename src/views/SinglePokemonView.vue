<template>
  <v-card style="background: rgba(255, 255, 255, 0.8)">
    <v-card-text :key="name">
      <h3
        v-if="error"
        class="text-h3 my-10 text-center text-error"
        v-text="`'${name}' - ${error}`"
      ></h3>

      <v-row v-else>
        <v-col cols="12" md="3">
          <v-card elevation="4" class="mx-center">
            <v-card-text>
              <h4 class="text-h4 my-5 text-center" v-text="pokemon?.name"></h4>
              <v-img
                class="mx-auto"
                contain
                height="270"
                :src="pokemon?.src || imageDefaultSrc"
              >
              </v-img>
              <v-card-title>#{{ pokemon?.id }}</v-card-title>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col
          v-for="feature in pokemonFeatureList"
          :key="feature?.title"
          cols="12"
          sm="4"
          md="3"
        >
          <v-card-title v-text="feature?.title"></v-card-title>
          <v-list density="compact" elevation="1" class="rounded">
            <v-list-item v-for="item in feature.data.slice(0, 7)" :key="item">
              <v-list-item-title v-text="item?.name"></v-list-item-title>
              <template v-slot:append>
                <v-chip size="x-small" v-if="item?.value">
                  {{ item.value }}
                </v-chip>
              </template>
            </v-list-item>
            <div v-if="feature.data.length > 7">
              <v-list-item>...</v-list-item>
              <v-btn
                class="mx-auto"
                color="primary"
                variant="text"
                @click="showDialog(feature)"
                v-text="`Show all ${feature?.title}`"
              ></v-btn>
            </div>
          </v-list>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn
        class="mx-auto"
        color="primary"
        variant="text"
        to="/pokemons"
        v-text="'Show all pokemons'"
      >
      </v-btn>
    </v-card-actions>
  </v-card>
  <v-dialog v-model="dialog" scrollable>
    <v-card style="max-width: 600px; width: auto" v-if="!!dialogItem">
      <v-card-title class="d-flex align-center">
        <span>{{ dialogItem?.title }}</span>
        <v-spacer></v-spacer>
        <v-icon
          large
          color="primary"
          @click.stop="closeDialog"
          icon="mdi-close-circle"
        >
        </v-icon>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text style="max-height: calc(100vh - 200px)">
        <v-chip v-for="item in dialogItem.data" :key="item" class="ma-2">
          {{ item?.name }}
        </v-chip>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex';
  const { mapGetters, mapActions, mapMutations } =
    createNamespacedHelpers('pokemons');

  export default {
    name: 'SinglePokemonView',
    data: () => ({
      name: '',
      dialog: false,
      dialogItem: {},
    }),
    computed: {
      ...mapGetters(['pokemonDetail']),
      error() {
        return this.$store.getters.error;
      },

      pokemon() {
        return this.pokemonDetail(this.name);
      },
      imageDefaultSrc() {
        return `https://via.placeholder.com/200`;
      },
      AbilitiesList() {
        let abilities = this.pokemon?.abilities || [];
        return {
          title: 'Abilities',
          data: abilities.map((a) => ({ name: a.ability?.name })),
        };
      },
      StatsList() {
        let stats = this.pokemon?.stats || [];
        return {
          title: 'Stats',
          data: stats.map((a) => ({ name: a.stat?.name, value: a.base_stat })),
        };
      },
      MovesList() {
        let moves = this.pokemon?.moves || [];
        return {
          title: 'Moves',
          data: moves.map((a) => ({ name: a.move?.name })),
        };
      },
      pokemonFeatureList() {
        return [this.AbilitiesList, this.StatsList, this.MovesList];
      },
    },
    beforeMount() {
      this.name = this.$route.params.name;
    },
    methods: {
      ...mapMutations(['setPokemonDetail']),
      ...mapActions(['fetchSinglePokemon']),
      showDialog(item) {
        this.dialog = true;
        this.dialogItem = item;
      },
      closeDialog() {
        this.dialog = false;
        setTimeout(() => {
          this.dialogItem = {};
        }, 1000);
      },
      async onRouteParamChange(name) {
        if (!name) {
          return;
        }

        let pokemon = this.pokemonDetail(name);
        const nameIsID = /^-?\d+$/.test(name);
        if (!pokemon) {
          await this.fetchSinglePokemon(name);
          pokemon = this.pokemonDetail(name);
        }

        if (nameIsID) {
          this.$router.replace({ params: { name: pokemon?.name } });
        }

        this.name = name;
      },
    },
    watch: {
      '$route.params.name'(name) {
        this.onRouteParamChange(name);
      },
    },
  };
</script>
