<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { onMounted } from 'vue';
import { useUserStore } from './stores';
import { useAppI18n } from '@/i18n';
import { toastService } from '@/services';
import { useToast } from 'vue-toastification';

const userStore = useUserStore()
const { populateUser } = userStore

const appI18n = useAppI18n()
const toast = toastService()
const toastV = useToast()

onMounted(async () => {
  appI18n.init()
  await populateUser()
})
</script>
