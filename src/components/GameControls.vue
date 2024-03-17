<template>
  <div class="game-controls">
    <div class="game-controls__item">
      <Button v-if="promptsLeft" @click="$emit('prompt')">
        {{ $t('game.prompt') }} {{ promptsLeft }}
      </Button>
      <span v-else>{{ $t('game.noPrompts') }}</span>
    </div>
    <div class="game-controls__item">
      <Button :transparent="true" @click="$emit('restart')">
        <span>{{ $t('game.restart') }}</span>
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#fff">
          <path d="M440-122q-121-15-200.5-105.5T160-440q0-66 26-126.5T260-672l57 57q-38 34-57.5 79T240-440q0 88 56 155.5T440-202v80Zm80 0v-80q87-16 143.5-83T720-440q0-100-70-170t-170-70h-3l44 44-56 56-140-140 140-140 56 56-44 44h3q134 0 227 93t93 227q0 121-79.5 211.5T520-122Z"/>
        </svg>
      </Button>
    </div>
    <div class="game-controls__item">
      <Button :transparent="true" @click="$emit('quit')">
        <span>{{ $t('game.quit') }}</span>
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#fff">
          <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/>
        </svg>
      </Button>
    </div>
  </div>
</template>

<script setup>
import Button from "@/components/ui/Button.vue";

defineEmits(['prompt', 'restart', 'quit'])

defineProps({
  promptsLeft: {
    type: Number,
    default: 0,
  }
})
</script>

<style scoped lang="scss">
.game-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  width: 100%;
  animation: displayControls 0.75s;

  &__item {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;

    &:deep {
      .button {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        width: 100%;
      }
    }
  }
}

@keyframes displayControls {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
