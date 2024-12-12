<template>
  <base-layout :header-text="translate('TABS.MY_PARTIES')">
    <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
      <ion-refresher-content></ion-refresher-content>
    </ion-refresher>

    <div v-if="myParties && (myParties.total > 0)"  class="items__wrapper">
      <app-party-item class="party__item" v-for="item in myParties.items" :data="item" :key="item.id"/>
    </div>

    <app-no-items v-else>
      <div class="mb-10">
        {{ translate('NO_ITEMS_TEXTS.NO_PARTIES') }}
      </div>
      <div class="btn__container">
        <div class="btn__wrapper">
          <my-button @click="openCreatePartyModal" :title="translate('BTNS.CREATE')"/>
        </div>
      </div>
    </app-no-items>

    <app-create-party-modal @modal-close="closeCreatePartyModal" @party-created="onPartyCreated" :is-open="createPartyModalIsOpen"/>

    <ion-fab slot="fixed" vertical="bottom" horizontal="end">
      <ion-fab-button @click="openCreatePartyModal">
        <ion-icon size="large" :icon="add" color="white"></ion-icon>
      </ion-fab-button>
    </ion-fab>
  </base-layout>
</template>

<script setup lang="ts">
import AppCreatePartyModal from '@/components/my-parties-components/AppCreatePartyModal.vue';
import BaseLayout from '@/layouts/BaseLayout.vue';
import AppNoItems from '@/components/base-components/AppNoItems.vue';
import AppPartyItem from '@/components/parties-components/AppPartyItem.vue';
import { useAppI18n } from '@/i18n'; 
import { ref } from 'vue';
import { CurrentUser, PartiesResponse } from '@/models';
import { onIonViewWillEnter, IonRefresher, IonRefresherContent, IonFab, IonFabButton, IonIcon } from '@ionic/vue';
import { add } from 'ionicons/icons';
import { requestService } from '@/services';
import { useUserStore } from '@/stores';

const { translate } = useAppI18n()

const request = requestService()

const userStore = useUserStore()
const { getCurrentUserData, populateUser } = userStore

const myParties = ref<PartiesResponse>()
const currentUser = ref<CurrentUser | null>(null)

const createPartyModalIsOpen = ref<boolean>(false)

onIonViewWillEnter(async () => {
  try {
    currentUser.value = getCurrentUserData()
    if (currentUser.value) {
      myParties.value = await request.getPartiesByCreatorId(currentUser.value.id, 1)
    }

  } catch(e: any) {
    console.log(e)
  }
})

async function handleRefresh(event: any) {
  try {
    if (currentUser.value) {
      myParties.value = await request.getPartiesByCreatorId(currentUser.value.id, 1)
    }
  } catch(e: any) {
    console.log(e)
  }
  
  setTimeout(() => {
    event.target.complete();
  }, 500);
}

async function onPartyCreated() {
  await populateUser()
  createPartyModalIsOpen.value = false
}

function openCreatePartyModal() {
  createPartyModalIsOpen.value = true
}

function closeCreatePartyModal() {
  createPartyModalIsOpen.value = false
}

</script>

<style scoped lang="scss">
.btn {

  &__container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__wrapper {  
    width: 195px;
  }
}

.no-items {
  display: flex;
  justify-content: center;
  align-items: center;
}

ion-fab-button {
  --background: var(--app-red);
  margin-bottom: 15px;
  margin-right: 5px;
}
</style>