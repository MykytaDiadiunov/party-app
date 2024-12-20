<template>
  <base-layout :header-text="translate('TABS.FAVORITES')">
    <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
      <ion-refresher-content></ion-refresher-content>
    </ion-refresher>
    <div v-if="parties?.items && parties.items.length > 0" class="users__wrapper">
      <app-party-item class="party__item" v-for="item in parties.items" :data="item" :key="item.id"/>
    </div>
    <app-no-items v-else>
      {{ translate('NO_ITEMS_TEXTS.NO_FAVORITES') }}
    </app-no-items>
  </base-layout>
</template>

<script setup lang="ts">
import BaseLayout from '@/layouts/BaseLayout.vue';
import AppPartyItem from '@/components/parties-components/AppPartyItem.vue';
import AppNoItems from '@/components/base-components/AppNoItems.vue';
import { useAppI18n } from '@/i18n'; 
import { onIonViewWillEnter, IonRefresher, IonRefresherContent } from '@ionic/vue';
import { requestService, routingService } from '@/services';
import { FavoritesResponse, PartiesResponse } from '@/models';
import { ref } from 'vue';
const { translate } = useAppI18n()

const requests = requestService()
const routing = routingService()

const parties = ref<PartiesResponse>()

onIonViewWillEnter(async () => {
  parties.value = await requests.getFavoriteUsersParty(1, 10)
})

async function handleRefresh(event: any) {
  try {
    parties.value = await requests.getFavoriteUsersParty(1, 10)
  } catch(e: any) {
    console.log(e)
  }
  
  setTimeout(() => {
    event.target.complete();
  }, 500);
}

function routToCreatorProfile(id: number) {
  routing.toUserProfile(id)
}

</script>

<style scoped lang="scss">
</style>