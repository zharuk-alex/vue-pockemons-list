<template>
  <v-row>
    <v-col v-for="item in items" :key="item?.id" class="pa-5">
      <router-link :to="`/pokemons/${item?.name}`">
        <v-hover v-slot="{ isHovering, props }">
          <v-card
            class="top-item pa-2 rounded-xl"
            :class="[`elevation-${isHovering ? 4 : 1}`]"
            v-bind="props"
          >
            <v-img :src="item?.src" height="200">
              <v-card-title
                class="pa-1 bg-white rounded-xl"
                v-text="item?.name"
              ></v-card-title>
            </v-img>
            <v-overlay
              :model-value="!isHovering"
              contained
              scrim="rgba(136,136,136,.7)"
              class="align-center justify-center"
            >
            </v-overlay>
          </v-card>
        </v-hover>
      </router-link>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    name: 'TopItems',
    props: {
      items: Array,
      default: () => [],
    },
  };
</script>
<style>
  .top-item .v-card-title {
    position: absolute;
    bottom: 0;
    z-index: 1;
  }
</style>
