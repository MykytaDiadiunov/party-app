<template>
  <ion-page>
    <app-header @back-button-click="emit('backButtonClick')" :back-button="backLayout" :text="headerText"/>
    <ion-content>
      <main class="main">
        <slot/>
      </main>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import AppHeader from '@/components/base-components/AppHeader.vue';
import { IonPage, IonContent } from '@ionic/vue';
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
    headerText: string,
    backLayout?: boolean
}>()

const emit = defineEmits<{
  (e: 'backButtonClick'): void
}>()

</script>

<style scoped lang="scss">
.main {
  padding: 10px;
}
</style>