<template>
  <div class="relative">
    <div class="layout">
      {{ `${model}\n` }}
    </div>
    <textarea v-bind="$attrs" v-model="model" class="textarea"></textarea>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  inheritAttrs: false,
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
.layout {
  @apply invisible border whitespace-pre-wrap break-all p-2;
}
.textarea {
  @apply absolute w-full h-full top-0 overflow-hidden border disabled:opacity-50 rounded-sm outline-none p-2 block resize-none;
}
</style>
