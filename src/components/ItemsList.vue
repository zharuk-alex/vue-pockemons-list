<template>
  <v-card style="background: rgba(255, 255, 255, 0.6)" class="w-100 h-100">
    <v-card-text>
      <v-row>
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
  };
</script>
