<template>
  <component :is="layout">
    <template #header>
      <router-view name="header" />
    </template>

    <router-view />
  </component>
</template>

<script>
import mainLayout from '@/layouts/main.vue';
import emptyLayout from '@/layouts/empty.vue';

export default {
  components: {
    mainLayout,
    emptyLayout
  },
  computed: {
    layout() {
      return `${this.$route.meta.layout || 'empty'}Layout`;
    }
  }
};
</script>

<style></style>
