<template>
  <div class="game-stats">
    <span class="game-stats__item game-stats__item--level">
      {{ $t('game.level') }}: <span class="game-stats__item-value">{{ `${level} / ${lastLevel}` }}</span>
    </span>
    <span class="game-stats__item game-stats__item--fails-left">
      {{ $t('game.failsLeft') }}: <span class="game-stats__item-value">{{ failsLeft }}</span>
    </span>
  </div>
</template>

<script setup>
defineProps({
  level: {
    type: Number,
    default: 1
  },
  lastLevel: {
    type: Number,
    default: 1
  },
  failsLeft: {
    type: Number,
    default: 0
  }
})
</script>

<style scoped lang="scss">
.game-stats {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  font-size: 18px;
  line-height: 25px;
  animation: displayStats 0.75s;

  &__item {
    &-value {
      font-weight: 700;
    }

    &--level {
      color: #42b983;
    }

    &--fails-left {
      color: #b10000;
    }
  }
}

@keyframes displayStats {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
