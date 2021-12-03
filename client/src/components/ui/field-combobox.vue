<template>
  <popover
    ref="popover"
    set-target-width
    class="border bg-white shadow rounded-sm"
  >
    <field-text v-model="model" />
    <template #popover>
      <div
        v-for="(option, i) in options"
        :key="i"
        class="px-2"
        :class="{ selected: option[keyValue] === model }"
        @click="onSelect(option[keyValue])"
      >
        {{ option[ketText] }}
      </div>
    </template>
  </popover>
</template>

<script>
import { ref, computed } from 'vue';

import fieldText from '@/components/ui/field-text.vue';
import popover from '@/components/ui/popover.vue';

export default {
  components: {
    fieldText,
    popover
  },
  props: {
    modelValue: {
      type: [String, Number, Boolean]
    },
    options: {
      type: Array,
      default: () => []
    },
    ketText: {
      type: String,
      default: 'text'
    },
    keyValue: {
      type: String,
      default: 'value'
    }
  },
  setup(props, { emit }) {
    const popover = ref(null);

    const model = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit('update:modelValue', value);
      }
    });

    const onSelect = value => {
      model.value = value;
      popover.value.close();
    };

    return {
      popover,
      model,
      onSelect
    };
  }
};
</script>

<style lang="postcss" scoped>
.selected {
  @apply bg-gray-300;
}
</style>
