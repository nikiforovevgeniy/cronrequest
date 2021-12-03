<template>
  <div class="flex flex-col bg-white p-4 gap-3">
    <div class="flex flex-col">
      <div>Название</div>
      <field-text v-model="hook.name" :disabled="loading.item" />
    </div>

    <div class="flex flex-col">
      <div>Метод</div>
      <field-select
        v-model="hook.method"
        :disabled="loading.item"
        :options="methodsOptionList"
      />
    </div>

    <div class="flex flex-col">
      <div>URL</div>
      <field-text v-model="hook.url" :disabled="loading.item" />
    </div>

    <div class="flex flex-col">
      <div>Headers</div>
      <field-textarea v-model="hook.headers" :disabled="loading.item" />
    </div>

    <div class="flex flex-col">
      <div>Body</div>
      <field-textarea v-model="hook.body" :disabled="loading.item" />
    </div>

    <div class="flex flex-col">
      <div>Query params</div>
      <field-textarea v-model="hook.query" :disabled="loading.item" />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

import useHooksStore from '@/store/useHooksStore.js';

import fieldText from '@/components/ui/field-text.vue';
import fieldTextarea from '@/components/ui/field-textarea.vue';
import fieldSelect from '@/components/ui/field-select.vue';

export default {
  components: {
    fieldText,
    fieldTextarea,
    fieldSelect
  },
  props: {
    id: {
      type: String
    }
  },
  setup(props) {
    const { loading, loadItem: loadHook, item, setItem } = useHooksStore;

    const hook = computed({
      get() {
        return item.value;
      },
      set(data) {
        setItem(data);
      }
    });

    if (props.id) {
      loadHook(props.id).catch(error => {
        alert(error.message);
      });
    } else {
      hook.value = {};
    }

    const methodsOptionList = [
      { text: 'GET', value: 'get' },
      { text: 'POST', value: 'post' }
    ];

    return {
      loading,
      hook,
      methodsOptionList
    };
  }
};
</script>

<style></style>
