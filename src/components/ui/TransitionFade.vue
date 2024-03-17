<script setup>

</script>

<template>
  <transition
      name="fade"
      enter-active-class="fadeIn"
      leave-active-class="fadeOut"
  >
    <slot />
  </transition>
</template>

<style scoped lang="scss">
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.fadeIn {
  animation-name: fadeIn;
  animation-duration: 300ms;
}
@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.fadeOut {
  animation-name: fadeOut;
  animation-duration: 300ms;
}
</style>
