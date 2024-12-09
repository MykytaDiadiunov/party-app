<template>
  <base-layout :header-text="translate('TABS.PARTIES')">
    <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
      <ion-refresher-content></ion-refresher-content>
    </ion-refresher>

    <div v-if="parties && parties?.items.length > 0" class="items__wrapper">
      <app-party-item @click="openPartyModal(item)" class="item" v-for="item in parties?.items" :key="item.id" :data="item"/>
    </div>
    
    <app-no-items v-else >{{ translate('NO_ITEMS_TEXTS.NO_PARTIES') }}</app-no-items>

    <app-party-info-modal @modal-close="closePartyModal" :party="selectedParty" :is-open="partyModalIsOpen"/>

  </base-layout>
</template>

<script setup lang="ts">
import BaseLayout from '@/layouts/BaseLayout.vue';
import AppPartyItem from '@/components/parties-components/AppPartyItem.vue';
import AppPartyInfoModal from '@/components/parties-components/AppPartyInfoModal.vue';
import AppNoItems from '@/components/base-components/AppNoItems.vue';
import { onIonViewDidEnter, IonRefresher, IonRefresherContent } from '@ionic/vue';
import { PartiesResponse, Party } from '@/models';
import { requestService } from '@/services';
import { useAppI18n } from '@/i18n'
import { ref } from 'vue';


const { translate } = useAppI18n()

const requests = requestService()

const parties = ref<PartiesResponse>()

const selectedParty = ref<Party>()


const partyModalIsOpen = ref<boolean>(false)

onIonViewDidEnter(async () => {
  parties.value = await requests.getParties(1)
  // parties.value.items = []
})

async function handleRefresh(event: any) {
  try {
    parties.value = await requests.getParties(1)

  } catch(e: any) {
    console.log(e)
  }
  
  setTimeout(() => {
    event.target.complete();
  }, 500);
}

function openPartyModal(party: Party) {
  selectedParty.value = party
  partyModalIsOpen.value = true
}

function closePartyModal() {
  partyModalIsOpen.value = false
}
</script>

<style scoped lang="scss">
.item {
  margin-bottom: 15px;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>