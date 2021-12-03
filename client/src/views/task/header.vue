<template>
  <div class="flex gap-3">
    <div class="flex-grow font-semibold truncate">
      <div v-if="loading.item">Загрузка...</div>
      <div v-else>{{ helpers.capitalize(title) }}</div>
    </div>
    <popover ref="popover" class="bg-white shadow rounded-sm px-2">
      <button class="button-icon">
        <i class="icon-more"></i>
      </button>
      <template #popover>
        <div class="flex flex-col divide-y">
          <button class="button px-4 py-2" @click="onSave">Сохранить</button>
          <button class="button px-4 py-2 text-red-500" @click="onRemove">
            Удалить
          </button>
        </div>
      </template>
    </popover>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

import useTasksStore from '@/store/useTasksStore.js';

import popover from '@/components/ui/popover.vue';

export default {
  components: {
    popover
  },
  setup() {
    const router = useRouter();
    const {
      loading,
      item: task,
      saveItem: save,
      removeItem: remove
    } = useTasksStore;

    const title = computed(() => task.value.name);

    const popover = ref(null);

    const onSave = () => {
      popover.value.close();

      save()
        .then(() => {
          alert('Сохранено');
          return router.replace(`/tasks/${task.value.id}`);
        })
        .catch(error => {
          alert(error.message);
        });
    };

    const onRemove = () => {
      popover.value.close();

      if (!confirm('Удалить?')) return;

      remove()
        .then(() => {
          alert('Удалено');
          return router.replace('/tasks');
        })
        .catch(error => {
          alert(error.message);
        });
    };

    return {
      popover,
      loading,
      title,
      onSave,
      onRemove
    };
  }
};
</script>

<style></style>
