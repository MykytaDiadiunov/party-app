<template>
  <base-layout :header-text="translate('TABS.PARTIES')">
    <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
      <ion-refresher-content></ion-refresher-content>
    </ion-refresher>

    <div v-if="partiesLoaded && partiesLoaded.length > 0" class="items__wrapper">
      <app-party-item class="party__item" v-for="item in partiesLoaded" :key="item.id" :data="item"/>
    </div>
    <app-no-items v-else >{{ translate('NO_ITEMS_TEXTS.NO_PARTIES') }}</app-no-items>

    <ion-infinite-scroll v-if="parties && parties.lastPage >= nextPageToLoad" @ionInfinite="nextPartiesPage">
      <ion-infinite-scroll-content></ion-infinite-scroll-content>
    </ion-infinite-scroll>
  </base-layout>
</template>

<script setup lang="ts">
import BaseLayout from '@/layouts/BaseLayout.vue';
import AppPartyItem from '@/components/parties-components/AppPartyItem.vue';

import AppNoItems from '@/components/base-components/AppNoItems.vue';
import { onIonViewDidEnter, IonRefresher, IonRefresherContent, IonInfiniteScroll, IonInfiniteScrollContent, InfiniteScrollCustomEvent, onIonViewDidLeave } from '@ionic/vue';
import { PartiesResponse, Party } from '@/models';
import { requestService } from '@/services';
import { useAppI18n } from '@/i18n'
import { ref } from 'vue';

const { translate } = useAppI18n()

const requests = requestService()

const parties = ref<PartiesResponse>()
const partiesLoaded = ref<Party[]>([])
const nextPageToLoad = ref<number>(0)

onIonViewDidEnter(async () => {
  resetPartiesState()
  await loadParties()
})

async function handleRefresh(event: any) {
  try {
    resetPartiesState()
    await loadParties()
  } catch(e: any) {
    console.log(e)
  }
  
  setTimeout(() => {
    event.target.complete();
  }, 500)
}

async function nextPartiesPage(event: InfiniteScrollCustomEvent) {
  try {
    await loadParties()
  } catch(e: any) {
    console.log(e)
  }
  setTimeout(() => {
    event.target.complete()
  }, 500)
}

async function loadParties() {
  parties.value = await requests.getParties(nextPageToLoad.value)
  if (parties.value.lastPage >= nextPageToLoad.value) {
    partiesLoaded.value.push(...parties.value.items)
    nextPageToLoad.value++

  }
}

function resetPartiesState() {
  nextPageToLoad.value = 1
  partiesLoaded.value = []
}
</script>

<style scoped lang="scss">

</style>