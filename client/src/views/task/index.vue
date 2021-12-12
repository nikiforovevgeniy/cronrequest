<template>
  <div class="bg-white divide-y">
    <div class="flex flex-col p-4 gap-3">
      <div class="flex flex-col">
        <div>Название</div>
        <field-text v-model="task.name" :disabled="loading.item" />
      </div>

      <div class="flex flex-col">
        <div>Хук</div>
        <field-select-hook v-model="task.hook_id" :disabled="loading.item" />
      </div>

      <div class="flex flex-col">
        <div>Дата и время выполения</div>
        <field-datetime v-model="startAt" :disabled="loading.item" />
      </div>

      <div class="flex flex-col">
        <div>Часовой пояс</div>
        <field-number v-model="task.timezone" :disabled="loading.item" />
      </div>

      <field-checkbox v-model="isRepeat">Повторяющаяся</field-checkbox>

      <div v-if="isRepeat" class="flex flex-col">
        <div>Количество повторений</div>
        <field-number v-model="task.repeat_cnt" :disabled="loading.item" />
        <div class="text-sm text-gray-400">-1 для бесконечного цикла</div>
      </div>

      <div v-if="isRepeat" class="flex flex-col">
        <div>Периодичность (cron)</div>
        <field-combobox
          v-model="task.crontime"
          :options="intervalOptionList"
          :disabled="loading.item"
        />
      </div>
    </div>
    <div class="flex flex-col p-4 gap-3">
      <div class="font-semibold">Переменные хука</div>

      <div
        class="flex flex-col"
        v-for="variable in availableVariables"
        :key="variable"
      >
        <div>${{ variable }}</div>
        <field-textarea
          v-model="task.variables[variable]"
          :disabled="loading.item"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import moment from 'moment';

import useTasksStore from '@/store/useTasksStore.js';
import useHooksStore from '@/store/useHooksStore.js';

import fieldText from '@/components/ui/field-text.vue';
import fieldTextarea from '@/components/ui/field-textarea.vue';
import fieldNumber from '@/components/ui/field-number.vue';
import fieldDatetime from '@/components/ui/field-datetime.vue';
import fieldCheckbox from '@/components/ui/field-checkbox.vue';
import fieldCombobox from '@/components/ui/field-combobox.vue';

import fieldSelectHook from '@/components/field-select-hook.vue';

export default {
  components: {
    fieldText,
    fieldTextarea,
    fieldNumber,
    fieldDatetime,
    fieldCheckbox,
    fieldCombobox,
    fieldSelectHook
  },
  props: {
    id: {
      type: String
    }
  },
  setup(props) {
    const { loading, loadItem: loadTask, item, setItem } = useTasksStore;
    const { list: hooks } = useHooksStore;

    const task = computed({
      get() {
        return item.value;
      },
      set(data) {
        setItem(data);
      }
    });

    const isRepeat = ref(false);

    if (props.id) {
      loadTask(props.id)
        .then(() => {
          if (task.value.repeat_cnt !== 0) {
            isRepeat.value = true;
          }

          watch(startAt, () => {
            task.value.crontime = null;
          });

          watch(isRepeat, value => {
            if (!value) {
              task.value.repeat_cnt = 0;
              task.value.crontime = null;
            } else {
              task.value.repeat_cnt = -1;
            }
          });
        })
        .catch(error => {
          alert(error.message);
        });
    } else {
      task.value = {
        variables: {}
      };
    }

    const startAt = computed({
      get() {
        if (!task.value.start_at) return null;
        return moment(task.value.start_at).format('YYYY-MM-DDTHH:mm');
      },
      set(value) {
        task.value.start_at = value
          ? moment(value).format('YYYY-MM-DD HH:mm')
          : null;
      }
    });

    const intervalOptionList = computed(() => {
      const startTime = moment(task.value.start_at);
      const m = startTime.minute();
      const h = startTime.hour();
      const d = startTime.date();
      const M = startTime.month() + 1;

      return [
        { text: 'Ежеминутно', value: `0 * * * * *` },
        { text: 'Ежечасно', value: `0 ${m} * * * *` },
        { text: 'Ежедневно', value: `0 ${m} ${h} * * *` },
        { text: 'Ежемесячно', value: `0 ${m} ${h} ${d} * *` },
        { text: 'Ежегодно', value: `0 ${m} ${h} ${d} ${M} *` }
      ];
    });

    const availableVariables = computed(() => {
      const hook = hooks.value.find(hook => {
        return hook.id === task.value.hook_id;
      });

      return hook?.variables ?? [];
    });

    return {
      loading,
      task,
      isRepeat,
      startAt,
      intervalOptionList,
      availableVariables
    };
  }
};
</script>

<style></style>
