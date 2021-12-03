<template>
  <input type="text" class="field" v-model="model" />
</template>

<script>
import { computed } from 'vue';

export default {
  props: {
    modelValue: {
      type: String
    }
  },
  setup(props, { emit }) {
    const model = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
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
