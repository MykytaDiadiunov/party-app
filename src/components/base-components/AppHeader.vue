<template>
<ion-header>
  <ion-toolbar>
    <ion-title>{{ text }}</ion-title>
  </ion-toolbar>
</ion-header>
</template>

<script setup lang="ts">
import { IonHeader } from '@ionic/vue';
import { defineProps } from 'vue';

const props = defineProps<{
  text: string
}>()

</script>

<style scoped lang="scss">

ion-toolbar {
  --background: var(--app-red)
}

ion-title {
  color: white;
  padding: 0;
  text-align: center;
  font-weight: 600;
  font-size: 24px;
}
</style>