<template>
  <div class="flex flex-col gap-3">
    <template v-for="task in tasks" :key="task.id">
      <div class="cursor-pointer bg-white p-4" @click="onClickTask(task)">
        <div>{{ task.name }}</div>
        <div class="text-xs text-gray-400">
          {{ moment(task.start_at).format('DD.MM.YYYY HH:mm') }}
        </div>
        <div class="text-xs text-gray-400">{{ task.hook.name }}</div>
      </div>
    </template>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import useTasksStore from '@/store/useTasksStore.js';

export default {
  setup() {
    const router = useRouter();

    const { loading, list: tasks, loadList: loadTasks } = useTasksStore;

    loadTasks().catch(error => {
      alert(error.message);
    });

    const onClickTask = task => {
      const id = task.id;
      router.push({
        path: `/tasks/${id}`
      });
    };

    return {
      loading,
      tasks,
      onClickTask
    };
  }
};
</script>

<style></style>
