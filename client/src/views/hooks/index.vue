<template>
  <div class="flex flex-col gap-3">
    <template v-for="hook in hooks" :key="hook.id">
      <div class="cursor-pointer bg-white p-4" @click="onClickHook(hook)">
        <div>{{ hook.name }}</div>
        <div class="text-xs text-gray-400">
          [{{ hook.method.toUpperCase() }}] {{ hook.url }}
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import useHooksStore from '@/store/useHooksStore.js';

export default {
  setup() {
    const router = useRouter();

    const { loading, list: hooks, loadList: loadHooks } = useHooksStore;

    loadHooks().catch(error => {
      alert(error.message);
    });

    const onClickHook = hook => {
      const id = hook.id;
      router.push({
        path: `/hooks/${id}`
      });
    };

    return {
      loading,
      hooks,
      onClickHook
    };
  }
};
</script>
