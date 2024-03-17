<template>
  <nav class="menu">
    <Button class="menu__button" @click="$emit('play-game')">
      {{ $t('play') }}
    </Button>
    <Button class="menu__button" @click="$emit('open-settings')">
      {{ $t('settings.settings') }}
    </Button>
  </nav>
</template>

<script setup>
import Button from "@/components/ui/Button.vue";
const emit = defineEmits(['open-settings', 'play-game']);
</script>

<style lang="scss" scoped>
.menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;

  &__button {
    width: 230px;
  }
}
</style>
