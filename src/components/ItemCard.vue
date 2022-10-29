<template>
  <v-hover v-slot="{ isHovering, props }">
    <router-link :to="`/pokemons/${item.name}`">
      <v-card v-bind="props" :elevation="isHovering ? 4 : 1" class="bg-gray">
        <v-card-text>
          <v-img
            contain
            :height="imageSize"
            :src="item?.src || imageDefaultSrc"
          >
          </v-img>
        </v-card-text>
        <v-card-title v-text="item.name"></v-card-title>
        <v-overlay
          :model-value="!isHovering"
          contained
          scrim="rgba(136,136,136,.7)"
          class="align-center justify-center"
        >
        </v-overlay>
      </v-card>
    </router-link>
  </v-hover>
</template>

<script>
  export default {
    name: 'ItemCard',
    props: {
      item: {
        type: Object,
        required: true,
      },
      imageSize: {
        type: Number,
        default: 200,
      },
    },
    computed: {
      imageDefaultSrc() {
        return `https://via.placeholder.com/${this.imageDefaultSrc}`;
      },
    },
  };
</script>
