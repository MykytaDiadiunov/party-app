<template>
  <base-layout :header-text="translate('TABS.PROFILE')">
    <div>Profile</div>
  </base-layout>
</template>

<script setup lang="ts">
import BaseLayout from '@/layouts/BaseLayout.vue';
import { useAppI18n } from '@/i18n'; 

const { translate } = useAppI18n()
</script>

<style scoped lang="scss">

</style>