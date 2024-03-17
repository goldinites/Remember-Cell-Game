<template>
  <div class="wrapper">
      <Game
          v-if="isPlay"
          :difficult="difficult"
          @quit="quitGameHandler"
      />
      <Menu
          v-else
          @open-settings="toggleSettingsPopupHandler"
          @play-game="playGameHandler"
      />
    <Popup
        :show-popup="showSettings"
        @close="toggleSettingsPopupHandler"
    >
      <GameSettings
          :difficult="difficult"
          @apply="applySettings"
      />
    </Popup>
  </div>
</template>

<script setup>
import {ref} from "vue";
import Menu from "@/components/Menu.vue";
import Game from "@/components/Game.vue";
import Popup from "@/components/ui/Popup.vue";
import GameSettings from "@/components/GameSettings.vue";
import {useI18n} from "vue-i18n";
import TransitionFade from "@/components/ui/TransitionFade.vue";

const isPlay = ref(false);
const showSettings = ref(false);
const difficult = ref('normal');
const {locale} = useI18n({useScope: 'global'})

const playGameHandler = () => {
  isPlay.value = true;
}

const quitGameHandler = () => {
  isPlay.value = false;
}

const toggleSettingsPopupHandler = () => {
  showSettings.value = !showSettings.value;
}

const applySettings = (settings) => {
  difficult.value = settings.difficult.value;
  locale.value = settings.lang.value;
  window.localStorage.setItem('lang', locale.value);
  window.localStorage.setItem('difficult', difficult.value);
  toggleSettingsPopupHandler();
}

const initSettings = () => {
  if (window.localStorage.getItem('lang')) {
    locale.value = window.localStorage.getItem('lang');
  }

  if (window.localStorage.getItem('difficult')) {
    difficult.value = window.localStorage.getItem('difficult');
  }
}

initSettings();
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

</style>
