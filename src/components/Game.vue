<template>
  <div v-if="!isWin && !isLoss" class="game">
    <GameControls
        :prompts-left="prompts"
        @prompt="usePromptHandler"
        @restart="initGame"
        @quit="$emit('quit')"
    />
    <div class="board" :style="`--rows: ${Math.sqrt(cells.length)}`">
      <Cell
          v-for="cell in cells"
          :key="cell.id"
          :cell="cell"
          :using-prompt="usingPrompt"
          @select-cell="selectCellHandler"
      />
    </div>
    <GameStats
        :level="level"
        :last-level="difficultLevel.lastLevel"
        :fails-left="failsLeft"
    />
  </div>
  <template v-else>
    <WinScreen v-if="isWin" />
    <LossScreen v-if="isLoss" />
  </template>
</template>

<script setup>
import {computed, ref, watch} from "vue";
import {createID, random} from "@/helpers/utils.js";
import difficultyLevels from "@/helpers/difficulty-levels.js";
import Cell from "@/components/Cell.vue";
import GameStats from "@/components/GameStats.vue";
import GameControls from "@/components/GameControls.vue";
import WinScreen from "@/components/WinScreen.vue";
import LossScreen from "@/components/LossScreen.vue";

const props = defineProps({
  difficult: {
    type: String,
    default: 'normal'
  }
})

defineEmits(['quit'])

const difficultLevel = ref(difficultyLevels.get(props.difficult))
const cells = ref([]);
const selectedCells = ref([]);
const level = ref(1);
const fails = ref(0);
const prompts = ref(difficultLevel.value.prompts);
const usingPrompt = ref(false);
const PROMPT_DURATION = 1000;

const initGame = () => {
  level.value = 1;
  fails.value = 0;
  prompts.value = difficultLevel.value.prompts;

  getCells();
}

const getCells = () => {
  cells.value = [];

  for (let i = 0; i < difficultLevel.value.cells; i++) {
    cells.value.push({
      target: false,
      id: createID(),
    })
  }

  for (let i = 0; i < level.value; i++) {
    let randomCellIndex = random(0, cells.value.length - 1);

    if (!cells.value[randomCellIndex].target) {
      cells.value[randomCellIndex].target = true;
    } else {
      i--;
    }
  }
}

const setNextLevel = () => {
  if (!isWin.value) {
    level.value = level.value + 1;
    selectedCells.value = [];
    getCells();
  }
}

const selectCellHandler = (cell) => {
  if (cell.target) {
    selectedCells.value.push(cell);
  } else {
    fails.value = fails.value + 1;
  }
}

const usePromptHandler = () => {
  if (prompts.value && !usingPrompt.value) {
    prompts.value = prompts.value - 1;
    usingPrompt.value = true;

    setTimeout(() => {
      usingPrompt.value = false;
    }, PROMPT_DURATION);
  }
}

const failsLeft = computed(() => {
  return difficultLevel.value.fails - fails.value;
});

const isWin = computed(() => {
  return level.value - 1 === difficultLevel.value.lastLevel;
})

const isLoss = computed(() => {
  return fails.value === difficultLevel.value.fails;
})

watch(selectedCells, () => {
  if (selectedCells.value.length === level.value) {
    setNextLevel();
  }
}, {deep: true})

initGame();
</script>

<style scoped lang="scss">
.game {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  max-width: 680px;
  width: 100%;
}

.board {
  display: grid;
  grid-template-columns: repeat(var(--rows), 1fr);
  gap: 4px;
  width: min(80vw, 80vh);
  height: min(80vw, 80vh);
  background-color: #fff1;
  box-shadow: inset 0 0 3px 1px #fff5;
  border-radius: 8px;
  padding: 10px;
  animation: displayBoard 0.75s;

  @media screen and (max-width: 430px) {
    padding: 5px;
  }
}

@keyframes displayBoard {
  0% {
    opacity: 0.5;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
