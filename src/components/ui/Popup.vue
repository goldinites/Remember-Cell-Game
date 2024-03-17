<template>
  <TransitionFade>
    <div v-if="showPopup" class="popup">
      <div class="popup__content">
        <button class="popup__content__button" @click="$emit('close')">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#fff">
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
          </svg>
        </button>
        <slot/>
      </div>
      <div class="popup__overlay" @click="$emit('close')"/>
    </div>
  </TransitionFade>
</template>

<script setup>
import TransitionFade from "@/components/ui/TransitionFade.vue";

defineEmits(['close'])
defineProps({
  showPopup: {
    type: Boolean,
    default: false,
  }
})
</script>

<style scoped lang="scss">
.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;

  &__content {
    position: relative;
    z-index: 2;
    background-color: #112435;
    padding: 40px 20px;
    border-radius: 12px;
    box-shadow: inset 0 0 3px 1px rgba(255, 255, 255, 0.3333333333);
    max-width: 375px;
    width: 100%;

    &__button {
      position: absolute;
      top: 10px;
      right: 10px;
    }
  }

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
