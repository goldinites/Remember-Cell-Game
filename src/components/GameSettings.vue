<template>
  <div class="settings">
    <Select
        :label="langSettings.label"
        :items="langSettings.list"
        :initial-item="lang"
        @select="selectLangHandler"
    />
    <Select
        :label="difficultSettings.label"
        :items="difficultSettings.list"
        :initial-item="difficult"
        @select="selectDifficultHandler"
    />

    <Button @click="applySettingsHandler">
      {{ $t('settings.apply') }}
    </Button>
  </div>
</template>
<script setup>
import {ref} from "vue";
import {useI18n} from "vue-i18n";
import Select from "@/components/ui/Select.vue";
import Button from "@/components/ui/Button.vue";
const { messages, locale } = useI18n({ useScope: "global" });
const emit = defineEmits(['apply'])

const props = defineProps({
  difficult: {
    type: String,
    default: 'normal'
  }
})

const currentSettingsLocale = messages.value[locale.value].settings;

const difficultSettings = {
  label: currentSettingsLocale.difficult.label,
  list: []
};

const langSettings = {
  label: currentSettingsLocale.language.label,
  list: []
};

Object.entries(currentSettingsLocale.difficult.list).forEach(([value, title]) => {
  difficultSettings.list.push({
    title,
    value
  })
});

Object.entries(currentSettingsLocale.language.list).forEach(([value, title]) => {
  langSettings.list.push({
    title,
    value
  })
});

const currentLangIndex = langSettings.list.findIndex(lang => lang.value === locale.value);
const currentDifficultIndex = difficultSettings.list.findIndex(difficult => difficult.value === props.difficult);
const lang = ref(langSettings.list[currentLangIndex]);
const difficult = ref(difficultSettings.list[currentDifficultIndex]);

const selectLangHandler = (selectedLang) => {
  lang.value = selectedLang;
}

const selectDifficultHandler = (selectedDifficult) => {
  difficult.value = selectedDifficult;
}

const applySettingsHandler = () => {
  emit('apply', {
    lang: lang.value,
    difficult: difficult.value,
  })
}
</script>

<style scoped lang="scss">
.settings {
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin-top: 30px;
}
</style>
