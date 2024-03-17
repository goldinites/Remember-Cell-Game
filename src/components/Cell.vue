<template>
  <div
      class="cell"
      :class="{
      'cell--target': (cell.target && isOpenCell) || (cell.target && usingPrompt) || initialShow,
      'cell--wrong': !cell.target && isOpenCell,
    }"
      :style="`--cell-transition: ${CELL_TRANSITION}ms`"
      @click="selectCellHandler"
  />
</template>

<script setup>
import {onMounted, ref} from "vue";

const props = defineProps({
  cell: {
    type: Object,
    default: () => ({})
  },
  usingPrompt: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['select-cell']);

const isOpenCell = ref(false);
const initialShow = ref(false);
const CELL_TRANSITION = 300;
const INITIAL_SHOW_DURATION = 1000;

const selectCellHandler = () => {
  if (!isOpenCell.value && !initialShow.value) {
    isOpenCell.value = true;
    setTimeout(() => {
      emit('select-cell', props.cell);
    }, CELL_TRANSITION)
  }
}

onMounted(() => {
  if (props.cell.target) {
    initialShow.value = true;

    setTimeout(() => {
      initialShow.value = false;
    }, INITIAL_SHOW_DURATION);
  }
});
</script>

<style scoped lang="scss">
.cell {
  $cell: &;
  background-color: #fff1;
  box-shadow: 0 0 0 1px #fff3;
  border-radius: 3px;
  cursor: pointer;
  transition: var(--cell-transition);
  animation: displayCell 0.4s;

  &:not(#{$cell}--target, #{$cell}--wrong) {
    &:hover {
      background-color: #fff3;
    }
  }

  &--target, &--wrong {
    transform: rotateY(180deg);
  }

  &--target {
    background-color: #42b983;
    box-shadow: 0 0 10px 2px #01ed75, inset 0 0 20px 1px #94e1be99;
  }

  &--wrong {
    background-color: #b10000;
    box-shadow: 0 0 10px 2px #e30606, inset 0 0 20px 1px #761414;
  }
}

@keyframes displayCell {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
