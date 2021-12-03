<template>
  <popover
    ref="popover"
    set-target-width
    class="border bg-white shadow rounded-sm"
  >
    <div class="field">
      <div class="h-6">{{ text }}</div>
    </div>
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

import popover from '@/components/ui/popover.vue';

export default {
  components: {
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

    const text = computed(() => {
      const option = props.options.find(option => {
        return option[props.keyValue] === model.value;
      });

      return option?.[props.ketText] ?? '';
    });

    const onSelect = value => {
      model.value = value;
      popover.value.close();
    };

    return {
      popover,
      model,
      text,
      onSelect
    };
  }
};
</script>

<style lang="postcss" scoped>
.field {
  @apply disabled:opacity-50 border rounded-sm w-full p-2;
}
.selected {
  @apply bg-gray-300;
}
</style>
