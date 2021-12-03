<template>
  <div class="checkbox">
    <input
      type="checkbox"
      :id="id"
      class="hidden"
      v-bind="$attrs"
      v-model="model"
    />
    <label :for="id" @click.stop>
      <div class="label-text">
        <slot></slot>
      </div>
    </label>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  props: {
    modelValue: {
      type: Boolean
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
      id: `checkbox-${Math.random().toString().substr(2)}`,
      model
    };
  }
};
</script>

<style lang="scss" scoped>
.checkbox {
  display: flex;

  label {
    cursor: pointer;
    display: flex;
    // align-items: center;
    align-items: flex-start;

    &::before {
      content: '';
      font-family: 'icomoon';
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
      width: 23px;
      height: 23px;
      border-radius: 4px;
      border: 1px solid #d1d2d3;
    }

    .label-text:not(:empty) {
      margin-left: 10px;
      word-break: break-word;
    }
  }

  input:not(:checked):not(:disabled) + label:hover::before {
    border: 1px solid #3c98fe;
  }

  input:checked + label::before {
    content: '\e906';
    font-size: 13px;
    border: 1px solid #3c98fe;
    color: #3c98fe;
  }

  input:disabled + label::before {
    opacity: 0.5;
  }
}
</style>
