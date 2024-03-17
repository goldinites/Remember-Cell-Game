<template>
  <button
      class="button"
      :class="{
        'button--transparent': transparent,
      }"
      @click="$emit('click')"
  >
    <slot/>
  </button>
</template>

<script setup>
defineEmits(['click']);

defineProps({
  transparent: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped lang="scss">
.button {
  $button: &;
  padding: 10px 25px;
  border-radius: 12px;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  transition: 0.3s;
  background-color: #42b983;

  &:hover {
    background-color: #2dab72;
    box-shadow: inset 0 0 4px #0005;
  }

  &--transparent {
    background-color: transparent;
    border: 1px solid #42b983;

    &:hover {
      background-color: #2dab72;
      color: #ffffff;
      box-shadow: inset 0 0 4px #0005;
    }
  }
}

</style>
