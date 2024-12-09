<template>
  <base-layout :header-text="translate('TABS.FAVORITES')">
    <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
      <ion-refresher-content></ion-refresher-content>
    </ion-refresher>
    <div v-if="favUsers?.users && favUsers.users.length > 0" class="users__wrapper">
      <app-user-item @click="routToCreatorProfile(user.id)" class="item" v-for="user in favUsers?.users" background-color="#F8F8F8" :user="user" :key="user.id"/>
    </div>
    <app-no-items v-else>
      {{ translate('NO_ITEMS_TEXTS.NO_FAVORITES') }}
    </app-no-items>
  </base-layout>
</template>

<script setup lang="ts">
import BaseLayout from '@/layouts/BaseLayout.vue';
import AppUserItem from '@/components/users-components/AppUserItem.vue';
import AppNoItems from '@/components/base-components/AppNoItems.vue';
import { useAppI18n } from '@/i18n'; 
import { onIonViewWillEnter, IonRefresher, IonRefresherContent } from '@ionic/vue';
import { requestService, routingService } from '@/services';
import { FavoritesResponse } from '@/models';
import { ref } from 'vue';
const { translate } = useAppI18n()

const requests = requestService()
const routing = routingService()

const favUsers = ref<FavoritesResponse>()

onIonViewWillEnter(async () => {
  favUsers.value = await requests.getFavorites()
})

async function handleRefresh(event: any) {
  try {
    favUsers.value = await requests.getFavorites()
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
.item  {
  margin-bottom: 15px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>