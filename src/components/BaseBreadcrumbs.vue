<template>
  <div style="height: 54px">
    <v-sheet v-show="breadCrumbs.length">
      <v-breadcrumbs v-if="breadCrumbs.length" :items="breadCrumbs">
        <template v-slot:prepend>
          <v-icon size="small" icon="mdi-pokeball"></v-icon>
        </template>
      </v-breadcrumbs>
    </v-sheet>
  </div>
</template>

<script>
  export default {
    name: 'BaseBreadcrumbs',
    computed: {
      breadCrumbs() {
        if (typeof this.$route.meta.breadCrumb === 'function') {
          return this.$route.meta.breadCrumb.call(this, this.$route);
        }
        return this.$route.meta.breadCrumb || [];
      },
    },
  };
</script>
