<template>
  <v-card style="background: rgba(255, 255, 255, 0.8)">
    <v-card-text>
      <div class="d-flex flex-column">
        <h3 class="text-h3 my-10 text-center text-error" v-text="msg"></h3>

        <v-btn
          class="mx-auto"
          color="primary"
          variant="text"
          to="/pokemons"
          v-text="'Show all pokemons'"
        ></v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
  export default {
    name: 'PageNotFound',
    components: {
      BaseLayout,
    },
    data: () => ({
      msg: `Page Not Found`,
    }),
  };
</script>
