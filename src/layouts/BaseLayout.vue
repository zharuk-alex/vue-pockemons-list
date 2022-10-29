<template>
  <div class="container-wrapper">
    <v-overlay
      contained
      :model-value="loader"
      class="align-center justify-center"
    >
      <v-progress-circular
        indeterminate
        size="64"
        color="primary"
      ></v-progress-circular>
    </v-overlay>
    <v-container>
      <v-row>
        <v-col cols="12" md="10" lg="8" class="mx-auto">
          <BaseBreadcrumbs />
        </v-col>
        <v-col cols="12" md="10" lg="8" class="mx-auto d-flex justify-center">
          <SearchPokemon />
        </v-col>
      </v-row>
      <div class="py-10">
        <router-view></router-view>
      </div>
    </v-container>
  </div>
</template>

<script>
  import BaseBreadcrumbs from '@/components/BaseBreadcrumbs.vue';
  import SearchPokemon from '@/components/SearchPokemon.vue';
  export default {
    name: 'BaseLayout',
    components: {
      SearchPokemon,
      BaseBreadcrumbs,
    },
    props: {
      loader: {
        type: Boolean,
        default: false,
      },
    },
  };
</script>
<style>
  .container-wrapper {
    height: 100%;
    width: 100%;
    background-color: #1e88e5;
  }
</style>
