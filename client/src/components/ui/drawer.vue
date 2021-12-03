<template>
  <teleport v-if="isOpen" to="#overlays">
    <div v-if="overlay" class="fixed top-0 left-0 h-full w-full">
      <div
        class="fixed bg-black bg-opacity-50 w-full h-full"
        @click="closeOnOverlayClick ? close() : void 0"
      ></div>
      <div class="fixed overflow-auto h-full bg-white" v-bind="$attrs">
        <slot></slot>
      </div>
    </div>
    <div
      v-else
      class="fixed overflow-auto top-0 left-0 h-full bg-white"
      v-bind="$attrs"
    >
      <slot></slot>
    </div>
  </teleport>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    modelValue: {
      type: Boolean
    },
    overlay: {
      type: Boolean,
      default: true
    },
    closeOnOverlayClick: {
      type: Boolean,
      default: true
    }
  },
  emits: {
    'update:modelValue': null
  },
  computed: {
    isOpen: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      }
    }
  },
  methods: {
    open() {
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
    }
  }
};
</script>

<style></style>
