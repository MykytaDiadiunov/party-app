<template>
  <base-layout :header-text="translate('TABS.PROFILE')">
    <app-user-avatar/>
  </base-layout>
</template>

<script setup lang="ts">
import BaseLayout from '@/layouts/BaseLayout.vue';
import AppUserAvatar from '@/components/users-components/AppUserAvatar.vue';
import { useAppI18n } from '@/i18n'; 

const { translate } = useAppI18n()
</script>

<style scoped lang="scss">

</style>