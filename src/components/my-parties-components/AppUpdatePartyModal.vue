<template>
  <div class="modal__wrapper">
    <ion-modal  @ionModalWillPresent="onPartyBeforeModelIsOpen" :is-open="isOpen" @didDismiss="emit('modalClose')">
      <app-header @back-button-click="emit('modalClose')" :back-button="true" :text="translate('HEADER.UPDATE_PARTY')"/>
      <ion-content>
        <ion-segment v-model="selectedSegment">
          <ion-segment-button :value="Segments.Details">
            <ion-label>{{ translate('SEGMENTS.DETAILS') }}</ion-label>
          </ion-segment-button>
          <ion-segment-button :value="Segments.Actions">
            <ion-label>{{ translate('SEGMENTS.ACTIONS') }}</ion-label>
          </ion-segment-button>
        </ion-segment>
        <div v-if="selectedSegment === Segments.Details" class="segment__details">
          <app-create-update-party-form @submit="submit" :party-to-update="party" :is-update-form="true"/>
        </div>
        <div v-else-if="selectedSegment === Segments.Actions" class="segment__actions">
          <app-action-list class="ma-20">
            <app-action-item :icon="people" :title="translate('ACTIONS.MEMBERS')" :modal-title="translate('ACTIONS.MEMBERS')">
              <div v-if="partyWithMembers?.members && partyWithMembers.members.length > 0" class="members__wrapper">
                <app-user-item class="party__item" @press="closeAllModals" v-for="user in partyWithMembers?.members" :user="user" background-color="#F8F8F8"/>
              </div>
              <app-no-items v-else class="ma-20">
                {{ translate('NO_ITEMS_TEXTS.NO_MEMBERS') }}
              </app-no-items>
            </app-action-item>
            <app-action-item @on-click="toggleDeleteAlertIsOpen" :icon="trash" :title="translate('BTNS.DELETE')">
              <template v-slot:custom>
                <ion-alert 
                  :is-open="deleteAlertIsOpen" 
                  :header="translate('ALERTS.YOU_SURE')" 
                  :buttons="alertButtons"
                  @didDismiss="toggleDeleteAlertIsOpen"
                ></ion-alert>
              </template>           
            </app-action-item>
          </app-action-list>
        </div>   
      </ion-content>
    </ion-modal>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '../base-components/AppHeader.vue';
import AppCreateUpdatePartyForm from './AppCreateUpdatePartyForm.vue';
import AppActionList from '../base-components/AppActionList.vue';
import AppActionItem from '../base-components/AppActionItem.vue';
import AppUserItem from '../users-components/AppUserItem.vue';
import AppNoItems from '../base-components/AppNoItems.vue';
import { useAppI18n } from '@/i18n';
import { trash, people } from 'ionicons/icons';
import { CreateParty, Party, PartyWithMembers } from '@/models';
import { createPartyModelToUpdatePartyModel, requestService, closeAllModals } from '@/services';
import { IonContent, IonModal, IonLabel, IonSegment, IonSegmentButton, IonAlert, AlertButton } from '@ionic/vue';
import { defineEmits, defineProps, ref } from 'vue'

const { translate } = useAppI18n()

const request = requestService()

enum Segments {
  Details = 'details',
  Actions = 'actions'
}

const alertButtons: AlertButton[] = [
  {
    text: translate('BTNS.NO'),
  },
  {
    text: translate('BTNS.YES'),
    handler: async () => {
      await request.deleteParty(props.party.id)
      emit('modalClose')
      emit('partyUpdated')
    },
  },
]

const selectedSegment = ref<string>(Segments.Details)

const deleteAlertIsOpen = ref<boolean>(false)

const partyWithMembers = ref<PartyWithMembers>()

const props = defineProps<{
  isOpen: boolean,
  party: Party
}>() 

const emit = defineEmits<{
  (e: 'modalClose'): void
  (e: 'partyUpdated'): void
}>()

async function onPartyBeforeModelIsOpen() {
  partyWithMembers.value = await request.getPartyById(props.party.id)
}

async function submit(newPartyBody: CreateParty) {
  const updateModel = createPartyModelToUpdatePartyModel(newPartyBody)
  await request.udapteParty(props.party.id, updateModel)
  emit('partyUpdated')
}

function toggleDeleteAlertIsOpen() {
  deleteAlertIsOpen.value = !deleteAlertIsOpen.value
}
</script>

<style scoped lang="scss">
</style>