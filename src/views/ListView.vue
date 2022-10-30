<template>
  <v-row>
    <v-col cols="12">
      <h3 class="text-h3">Pokemons</h3>
    </v-col>
  </v-row>

  <ItemsList :items="formatedList" />
  <v-col cols="12" sm="8" lg="6" class="mx-auto">
    <BasePagination
      v-if="totalListPages > 1"
      :length="totalListPages"
      v-model.sync="pageCurrent"
    />
  </v-col>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex';
  const { mapGetters, mapActions, mapMutations } =
    createNamespacedHelpers('pokemons');
  // Utils
  import { extractPokemonIdFromUrl, createPokemonSrcFromUrl } from '@/utils';
  // Components
  import BasePagination from '@/components/BasePagination.vue';
  import ItemsList from '@/components/ItemsList.vue';

  export default {
    components: {
      ItemsList,
      BasePagination,
    },
    data: () => ({
      pageCurrent: null,
      itemsPerListPage: 16,
    }),
    computed: {
      ...mapGetters(['list', 'countPokemonsInDB', 'spritesUrl']),
      formatedList() {
        return [...this.list].map((i) => ({
          ...i,
          id: extractPokemonIdFromUrl(i.url),
          src: createPokemonSrcFromUrl(this.spritesUrl, i.url),
        }));
      },
      totalListPages() {
        return Math.ceil(this.countPokemonsInDB / this.itemsPerListPage);
      },
    },
    methods: {
      ...mapActions(['fetchList']),
      ...mapMutations(['setList']),
      async updateListData() {
        let offset = this.itemsPerListPage * (this.pageCurrent - 1);
        const data = await this.fetchList({
          limit: this.itemsPerListPage,
          offset,
        });
        this.$router.replace({ query: { page: this.pageCurrent } });
        this.setList(data);
      },
      setActivePage() {
        let queryPage = this.$route.query?.page;
        if (queryPage != undefined) {
          this.pageCurrent = parseInt(queryPage);
        } else {
          this.pageCurrent = 1;
        }
      },
    },
    beforeMount() {
      this.setActivePage();
    },
    watch: {
      pageCurrent() {
        this.updateListData();
      },
    },
  };
</script>
