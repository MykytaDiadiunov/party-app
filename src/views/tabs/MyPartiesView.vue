<template>
  <base-layout :header-text="translate('TABS.MY_PARTIES')">
    <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
      <ion-refresher-content></ion-refresher-content>
    </ion-refresher>

    <div v-if="myParties && (myParties.total > 0)" class="items__wrapper">

    </div>

    <app-no-items v-else>
      <div class="mb-10">
        {{ translate('NO_ITEMS_TEXTS.NO_PARTIES') }}
      </div>
      <div class="btn__container">
        <div class="btn__wrapper">
          <my-button :title="translate('BTNS.CREATE')"/>
        </div>
      </div>
    </app-no-items>

  </base-layout>
</template>

<script setup lang="ts">
import BaseLayout from '@/layouts/BaseLayout.vue';
import AppNoItems from '@/components/base-components/AppNoItems.vue';
import { useAppI18n } from '@/i18n'; 
import { ref } from 'vue';
import { CurrentUser, PartiesResponse } from '@/models';
import { onIonViewWillEnter } from '@ionic/vue';
import { requestService } from '@/services';
import { useUserStore } from '@/stores';

const { translate } = useAppI18n()

const request = requestService()

const userStore = useUserStore()
const { getCurrentUserData } = userStore

const myParties = ref<PartiesResponse>()

onIonViewWillEnter(async () => {
  try {
    const currentUser: CurrentUser | null = getCurrentUserData()
    if (currentUser) {
      myParties.value = await request.getPartiesByCreatorId(currentUser.id, 1)
      console.log(myParties.value)
    }

  }catch(e: any) {
    console.log(e)
  }
})

async function handleRefresh(event: any) {
  try {
    console.log("Updated!")
  } catch(e: any) {
    console.log(e)
  }
  
  setTimeout(() => {
    event.target.complete();
  }, 500);
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
</style>