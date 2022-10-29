<template>
  <v-app>
    <v-main>
      <component :is="layout" :loader="appLoader"></component>
    </v-main>
  </v-app>
</template>
<script>
  import BaseLayout from '@/layouts/BaseLayout.vue';
  export default {
    name: 'App',
    computed: {
      layout() {
        return !this.$route.meta?.layout && BaseLayout;
      },
      appLoader() {
        return this.$store.getters['pokemons/appLoader'];
      },
    },
  };
</script>
