<template>
  <input type="number" class="field" v-model="model" />
</template>

<script>
import { computed } from 'vue';
import { isEmptyValue } from '@/helpers.js';

export default {
  props: {
    modelValue: {
      type: Number
    }
  },
  setup(props, { emit }) {
    const model = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        value = isEmptyValue(value) ? null : value;
        emit('update:modelValue', value);
      }
    });

    return {
      model
    };
  }
};
</script>

<style lang="postcss" scoped>
.field {
  @apply block outline-none disabled:opacity-50 border rounded-sm w-full p-2;
}
</style>
