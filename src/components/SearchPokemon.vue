<template>
  <v-text-field
    v-model.trim="searchVal"
    type="text"
    variant="solo"
    clearable
    placeholder="Find pokemon by {name} or {id}"
    append-inner-icon="mdi-magnify"
    class="base-search-input"
    :class="{ 'input-empty': emptyVal }"
    @click:clear="clearValue"
    @click:append-inner="SearchPokemon"
    @keypress.enter.stop="SearchPokemon"
  ></v-text-field>
  <span v-show="errorMsg" class="text-error" v-text="errorMsg"></span>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex';
  const { mapGetters } = createNamespacedHelpers('pokemons');

  export default {
    name: 'BaseSearch',
    data: () => ({
      searchVal: '',
      searchError: false,
    }),
    computed: {
      ...mapGetters(['pokemonDetail']),
      emptyVal() {
        return !this.searchVal?.length;
      },
      errorMsg() {
        return this.searchError ? `"${this.searchVal}" not found` : '';
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

        this.$router.push({
          name: 'pokemon:detail',
          params: { name: searchVal },
        });
      },
      clearValue() {
        this.searchVal = '';
        this.searchError = false;
      },
    },
  };
</script>
<style>
  .base-search-input {
    max-width: 380px;
    width: auto;
  }

  .base-search-input .v-field {
    border-radius: 30px !important;
  }

  .base-search-input .v-field__append-inner i[role='button'] {
    color: blue;
  }

  .base-search-input.input-empty .v-field__append-inner i[role='button'] {
    opacity: 0.7;
    color: rgba(0, 0, 0, 0.5);
    pointer-events: none;
  }

  .base-search-input.input-empty .v-field__append-inner:hover {
    cursor: not-allowed !important;
  }
</style>
