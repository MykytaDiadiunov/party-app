<template>
  <div class="modal__wrapper">
    <ion-modal  @ionModalWillPresent="onPartyBeforeModelIsOpen" :is-open="isOpen">
      <app-header @back-button-click="emit('modalClose')" :back-button="true" :text="translate('HEADER.NEW_PARTY')"/>
      <ion-content>
        <app-create-update-party-form @submit="submit"/>
      </ion-content>
    </ion-modal> 
  </div>
</template>

<script setup lang="ts">
import AppHeader from '../base-components/AppHeader.vue';
import AppCreateUpdatePartyForm from './AppCreateUpdatePartyForm.vue';
import { defineProps, defineEmits, ref } from 'vue';
import { IonContent, IonModal } from '@ionic/vue';
import { useAppI18n } from '@/i18n';
import { requestService } from '@/services';
import { CreateParty } from '@/models';

const { translate } = useAppI18n()

const request = requestService()

const props = defineProps<{
  isOpen: boolean,
}>()

const emit = defineEmits<{
  (e: 'modalClose'): void
  (e: 'partyCreated'): void
}>()

function onPartyBeforeModelIsOpen() {
}

async function submit(newPartyBody: CreateParty) {
  await request.craeteParty(newPartyBody)
  emit('partyCreated')
}
</script>

<style scoped lang="scss">


</style>