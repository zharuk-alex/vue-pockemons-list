<template>
  <v-card style="background: rgba(255, 255, 255, 0.6)">
    <v-card-text>
      <v-row>
        <template v-if="!items.length && appLoader">
          <v-col v-for="n in 4" :key="n" cols="6" sm="4" md="3">
            <v-sheet
              elevation="4"
              height="280"
              color="grey lighten-4"
              class="pa-3"
            >
            </v-sheet>
          </v-col>
        </template>
        <template v-else-if="items.length">
          <v-col
            cols="6"
            sm="4"
            md="3"
            v-for="(item, index) in items"
            :key="item.id"
            :class="{ 'mx-auto': index == items.length - 1 }"
          >
            <ItemCard :item="item" />
          </v-col>
        </template>
      </v-row>
    </v-card-text>
    <v-card-actions v-if="!!$slots['card-actions']">
      <slot name="card-actions"></slot>
    </v-card-actions>
  </v-card>
</template>

<script>
  import ItemCard from '@/components/ItemCard.vue';

  export default {
    name: 'ItemsList',
    props: {
      items: {
        type: Array,
        required: true,
      },
    },
    components: {
      ItemCard,
    },
    computed: {
      appLoader() {
        return this.$store.getters['pokemons/appLoader'];
      },
    },
  };
</script>
