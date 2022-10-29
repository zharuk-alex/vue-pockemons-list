<template>
  <div class="text-center">
    <v-pagination
      :model-value="modelValue"
      :length="length"
      rounded="circle"
      color="white"
      v-bind="$attrs"
    ></v-pagination>
  </div>
</template>
<script>
  export default {
    name: 'BasePagination',
    props: {
      modelValue: {
        type: Number,
        required: true,
      },
      length: {
        type: Number,
        required: true,
      },
    },
  };
</script>
