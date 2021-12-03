<template>
  <field-select
    :options="hooks"
    ket-text="name"
    key-value="id"
    :disabled="loading.list"
  />
</template>

<script>
import useHooksStore from '@/store/useHooksStore.js';

import fieldSelect from '@/components/ui/field-select.vue';

export default {
  components: {
    fieldSelect
  },
  setup() {
    const { loading, list: hooks, loadList: loadHooks } = useHooksStore;

    loadHooks().catch(error => {
      alert(error.message);
    });

    return {
      loading,
      hooks
    };
  }
};
</script>

<style></style>
