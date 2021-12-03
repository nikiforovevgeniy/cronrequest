<template>
  <div class="flex gap-3">
    <div class="flex-grow">
      <input
        v-if="searchMode"
        ref="searchInput"
        type="text"
        placeholder="Поиск..."
        class="search"
        v-model="searchText"
        @blur="onBlurSearchInput"
      />
      <span v-else class="font-semibold">Hooks</span>
    </div>
    <button class="button-icon" @click="toggleSearchMode">
      <i class="icon-search"></i>
    </button>
    <button class="button-icon text-xl" @click="$router.push('/hooks/add')">
      <i class="icon-add"></i>
    </button>
  </div>
</template>

<script>
import { ref, computed, nextTick } from 'vue';
import useHooksStore from '@/store/useHooksStore.js';

export default {
  setup() {
    const { search, setSearch } = useHooksStore;

    const searchText = computed({
      get() {
        return search.value;
      },
      set(value) {
        setSearch(value);
      }
    });

    const searchInput = ref(null);
    const searchMode = ref(false);
    const toggleSearchMode = () => {
      searchMode.value = !searchMode.value;

      if (searchMode.value) {
        nextTick(() => {
          searchInput.value.focus();
        });
      } else {
        searchText.value = '';
      }
    };

    const onBlurSearchInput = () => {
      if (!searchText.value) {
        searchMode.value = false;
      }
    };

    return {
      searchInput,
      searchText,
      searchMode,
      toggleSearchMode,
      onBlurSearchInput
    };
  }
};
</script>

<style lang="postcss" scoped>
.search {
  @apply outline-none bg-transparent border-b border-white placeholder-white placeholder-opacity-50 w-full py-1;
}
</style>
