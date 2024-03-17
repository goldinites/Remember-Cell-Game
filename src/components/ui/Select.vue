<template>
  <div class="select" v-click-outside="() => toggleSelectHandler(false)">
    <div class="select__label">
      <span>{{ label }}</span>
    </div>
    <div class="select__current" @click="toggleSelectHandler">
      <span>{{ currentItem.title }}</span>
    </div>
    <TransitionFade>
      <ul v-show="isOpen" class="select__items">
        <li
            v-for="(item, index) in items"
            :key="index"
            class="select__item"
            @click="selectItemHandler(item)"
        >
          <span>{{ item.title }}</span>
        </li>
      </ul>
    </TransitionFade>
  </div>
</template>

<script setup>
import {ref} from "vue";
import TransitionFade from "@/components/ui/TransitionFade.vue";

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  items: {
    type: Array,
    default: () => ([])
  },
  initialItem: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['select'])

const currentItem = ref(props.initialItem);
const isOpen = ref(false);

const selectItemHandler = (item) => {
  if (currentItem.value !== item) {
    currentItem.value = item;
    emit('select', item);
  }
  toggleSelectHandler();
}

const toggleSelectHandler = (value) => {
  isOpen.value = typeof value === 'boolean' ? value : !isOpen.value;
}
</script>

<style scoped lang="scss">
.select {
  position: relative;
  min-width: 240px;

  &__label {
    position: absolute;
    top: -10px;
    left: 10px;
    background-color: #112435;
    padding: 0 5px;
  }

  &__current {
    border: 1px solid #fff;
    padding: 15px 15px 10px;
    border-radius: 6px;
    cursor: pointer;
    transition: 0.2s;
  }

  &__items {
    position: absolute;
    top: calc(100% + 5px);
    left: 0;
    right: 0;
    z-index: 5;
    border: 1px solid #fff;
    background-color: #112435;
    border-radius: 6px;
    overflow: hidden;
  }

  &__item {
    padding: 10px 15px;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      background-color: #fff3;
    }
  }
}
</style>
