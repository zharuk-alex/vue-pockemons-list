<template>
  <v-text-field
    ref="search-input"
    v-model.trim="searchVal"
    type="text"
    variant="solo"
    :rules="rules"
    clearable
    placeholder="Find pokemon by {name} or {id}"
    class="base-search-input"
    :class="{ 'input-empty': emptyVal }"
    @click:clear="clearValue"
    @keypress.enter="SearchPokemon"
  >
    <template v-slot:append-inner>
      <v-btn
        icon="mdi-magnify"
        color="primary"
        size="small"
        :disabled="emptyVal || !!inputErrors.length"
        @click="SearchPokemon"
        class="ml-2"
      ></v-btn>
    </template>
  </v-text-field>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex';
  const { mapGetters } = createNamespacedHelpers('pokemons');

  export default {
    name: 'BaseSearch',
    data: () => ({
      searchVal: '',
      inputErrors: [],
    }),
    computed: {
      ...mapGetters(['pokemonDetail']),
      emptyVal() {
        return !this.searchVal?.length;
      },
      rules() {
        const rules = [];
        const rule = (v) =>
          /^[A-Za-z0-9]*$/.test(v) || `Special characters is not allowed`;

        rules.push(rule);
        return rules;
      },
    },
    methods: {
      async SearchPokemon() {
        let searchVal = this.searchVal.toString().toLowerCase();
        let currentPokemon;
        let routeNameParam = this.$route.params?.name;
        if (routeNameParam) {
          currentPokemon = this.pokemonDetail(routeNameParam);
        }
        const theSame =
          currentPokemon?.name == searchVal || currentPokemon?.id == searchVal;

        if (this.emptyVal || theSame) {
          return false;
        }

        this.$store.commit('setError', null);
        console.log('router push');
        this.$router.push({
          name: 'pokemon:detail',
          params: { name: searchVal },
        });

        this.blurInput();
        this.clearValue();
      },
      clearValue() {
        this.searchVal = '';
        this.inputErrors = [];
      },
      blurInput() {
        const searchEl = this.$refs['search-input']?.$el;
        const searchInput = searchEl.querySelector('.v-field__input');
        searchInput.blur();
      },
    },
    watch: {
      searchVal(newVal) {
        this.inputErrors = this.rules.filter((r) => r(newVal)?.length);
      },
    },
  };
</script>
<style>
  .base-search-input {
    max-width: 380px;
  }

  .base-search-input .v-field {
    border-radius: 30px !important;
  }

  .v-field__append-inner {
    align-items: center !important;
    padding-top: 0 !important;
  }
</style>
