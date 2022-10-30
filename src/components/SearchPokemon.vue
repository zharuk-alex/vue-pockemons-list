<template>
  <v-text-field
    ref="search-input"
    v-model.trim="searchVal"
    type="text"
    variant="solo"
    clearable
    placeholder="Find pokemon by {name} or {id}"
    class="base-search-input"
    :class="{ 'input-empty': emptyVal }"
    @click:clear="clearValue"
    @keypress.enter.stop="SearchPokemon"
  >
    <!-- append-inner-icon="mdi-magnify" -->
    <!-- @click:append-inner="SearchPokemon" -->
    <template v-slot:append-inner>
      <v-btn
        icon="mdi-magnify"
        color="primary"
        size="small"
        :disabled="emptyVal"
        class="ml-2"
        @click="SearchPokemon"
      ></v-btn>
    </template>
  </v-text-field>
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

        this.blurInput();
        this.clearValue();
      },
      clearValue() {
        this.searchVal = '';
        this.searchError = false;
      },
      blurInput() {
        const searchEl = this.$refs['search-input']?.$el;
        const searchInput = searchEl.querySelector('.v-field__input');
        searchInput.blur();
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

  .v-field__append-inner {
    align-items: center !important;
    padding-top: 0 !important;
  }

  /* .base-search-input .v-field__append-inner i[role='button'] {
    color: blue;
  }

  .base-search-input.input-empty .v-field__append-inner i[role='button'] {
    opacity: 0.7;
    color: rgba(0, 0, 0, 0.5);
    pointer-events: none;
  }

  .base-search-input.input-empty .v-field__append-inner:hover {
    cursor: not-allowed !important;
  } */
</style>
