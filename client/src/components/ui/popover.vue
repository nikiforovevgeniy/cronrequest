<template>
  <div ref="target" :class="className" @click="toggleOpen">
    <slot></slot>
  </div>
  <teleport v-if="isOpen" to="#overlays">
    <div ref="popover" class="absolute" :class="className" v-bind="$attrs">
      <slot name="popover"></slot>
    </div>
  </teleport>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    setTargetWidth: {
      type: Boolean,
      default: false
    },
    align: {
      type: String,
      validator(value) {
        return ['left', 'right'].includes(value);
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    noCloseSelectors: {
      type: Array,
      default: () => []
    }
  },
  emits: {
    close: null,
    open: null
  },
  data() {
    return {
      className: `popover-${Math.random().toString().substr(2)}`,
      isOpen: false
    };
  },
  watch: {
    isOpen(value) {
      if (value) {
        this.setListeners();
        this.$nextTick(() => {
          this.position();
          this.$emit('open');
        });
      } else {
        this.removeListeners();
        this.$emit('close');
      }
    }
  },
  methods: {
    toggleOpen() {
      if (!this.disabled) {
        this.isOpen = !this.isOpen;
      }
    },
    close(event) {
      const isNoCloseSelector = [
        ...this.noCloseSelectors,
        `.${this.className}`
      ].some(selector => {
        return event?.target?.closest && event?.target?.closest(selector);
      });
      if (isNoCloseSelector) return;
      this.isOpen = false;
    },
    position() {
      const $target = this.$refs.target;
      const $popover = this.$refs.popover;
      const $overlays = document.querySelector('#overlays');

      const targetRect = $target.getBoundingClientRect();

      if (this.setTargetWidth) $popover.style.width = `${targetRect.width}px`;
      $popover.style.overflow = 'auto';

      const popoverRect = $popover.getBoundingClientRect();
      const overlayRect = $overlays.getBoundingClientRect();

      const rightSpace = overlayRect.width - targetRect.left;
      const leftSpace = targetRect.right;

      const toLeftSide = () => {
        if (popoverRect.width >= rightSpace)
          $popover.style.width = `${rightSpace}px`;
        $popover.style.left = `${targetRect.left}px`;
      };

      const toRightSide = () => {
        if (popoverRect.width >= leftSpace)
          $popover.style.width = `${leftSpace}px`;
        $popover.style.left = `${
          targetRect.right -
          (parseFloat($popover.style.width) || popoverRect.width)
        }px`;
      };

      if (this.align === 'left') {
        toLeftSide();
      } else if (this.align === 'right') {
        toRightSide();
      } else if (rightSpace >= leftSpace) {
        toLeftSide();
      } else {
        toRightSide();
      }

      const bottomSpace = overlayRect.height - targetRect.bottom;
      const topSpace = targetRect.top;

      if (bottomSpace > topSpace) {
        if (popoverRect.height >= bottomSpace)
          $popover.style.height = `${bottomSpace}px`;
        $popover.style.top = `${targetRect.bottom}px`;
      } else {
        if (popoverRect.height >= topSpace)
          $popover.style.height = `${topSpace}px`;
        $popover.style.top = `${
          targetRect.top -
          (parseFloat($popover.style.height) || popoverRect.height)
        }px`;
      }
    },
    setListeners() {
      window.addEventListener('click', this.close);
      window.addEventListener('wheel', this.close);
      window.addEventListener('touchmove', this.close);
      window.addEventListener('resize', this.close);
    },
    removeListeners() {
      window.removeEventListener('click', this.close);
      window.removeEventListener('wheel', this.close);
      window.removeEventListener('touchmove', this.close);
      window.removeEventListener('resize', this.close);
    }
  },
  beforeUnmount() {
    this.removeListeners();
  }
};
</script>

<style></style>
