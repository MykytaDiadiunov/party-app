<template>
<ion-header>
  <ion-toolbar>
    <div v-if="backButton" @click="emit('backButtonClick')" class="back-icon">
      <img src="../../../public/icons/white-arrow.png" alt="back_img">
    </div>
    <ion-title>{{ text }}</ion-title>
  </ion-toolbar>
</ion-header>
</template>

<script setup lang="ts">
import { IonHeader, IonToolbar, IonTitle } from '@ionic/vue';
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
  text: string,
  backButton?: boolean
}>()

const emit = defineEmits<{
  (e: 'backButtonClick'): void
}>()
</script>

<style scoped lang="scss">
.back-icon {
  position: absolute;
  left: 0px;
  top: 50%;
  z-index: 999999;
  width: 35px;
  height: 35px;
  padding: 5px;
  transform: scaleX(-1) translateY(-50%);

  img {
    width: 100%;
    height: 100%;
  }
}
</style>

