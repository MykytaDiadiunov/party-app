<template>
  <base-layout @back-button-click="routing.toBack" :back-layout="true" :header-text="userData ? userData.username : ''">
    <div class="content__wrapper">
      <app-user-data v-if="userData" :user-data="userData"/>
      <div class="user__fav-btn">
        <div class="fav__button__wrapper">
          <my-button v-if="!userIsFavorite?.isLiked" @click.stop="followUser" font-size="14" :title="translate('BTNS.FOLLOW')"/>
          <my-button v-else @click.stop="unfollowUser" background-color="var(--app-pressed-btn)" font-size="14" :title="translate('BTNS.UNFOLLOW')"/>
        </div>
      </div>
      <div class="user__parties">
        <div v-if="userParties && userParties?.items.length > 0" class="items__wrapper">
          <app-party-item class="item" @click="setSelectedParty(item)" v-for="item in userParties?.items" :key="item.id" :data="item"/>
        </div>
        <app-no-items v-else >{{ translate('NO_ITEMS_TEXTS.NO_PARTIES') }}</app-no-items>
      </div>
    </div>
  </base-layout>
</template>

<script setup lang="ts">
import BaseLayout from '@/layouts/BaseLayout.vue';
import AppPartyItem from '@/components/parties-components/AppPartyItem.vue';
import AppNoItems from '@/components/base-components/AppNoItems.vue';
import AppUserData from '@/components/users-components/AppUserData.vue';
import { onIonViewWillEnter } from '@ionic/vue';
import { CurrentUser, ExistsInFavoritesResponse, PartiesResponse, Party } from '@/models';
import { requestService, routingService } from '@/services';
import { ref } from 'vue';
import { useRoute } from 'vue-router'; 
import { useAppI18n } from '@/i18n';
const { translate } = useAppI18n()

const requests = requestService()
const routing = routingService()
const route = useRoute()

const userData = ref<CurrentUser>()
const userIsFavorite = ref<ExistsInFavoritesResponse>()

const userParties = ref<PartiesResponse>()

const selectedParty = ref<Party>()

onIonViewWillEnter(async () => {
  if(route.params.id) {
    userData.value = await requests.getUserById(Number(route.params.id))
    userIsFavorite.value = await requests.checkExistsInFavorites(userData.value.id)
    userParties.value = await requests.getPartiesByCreatorId(userData.value.id, 1)
  }
})

async function followUser() {
  if (userData.value) {
    await requests.addToFavorites(userData.value.id)
    userIsFavorite.value = await requests.checkExistsInFavorites(userData.value.id)
  }
}

async function unfollowUser() {
  if (userData.value) {
    await requests.removeFromFavorites(userData.value.id)
    userIsFavorite.value = await requests.checkExistsInFavorites(userData.value.id)
  }
}

function setSelectedParty(party: Party) {
  selectedParty.value = party
}

</script>

<style scoped lang="scss">
* {
  font-family: var(--montserat-font);
}

.content__wrapper {
  width: 100%;
  height: 100%;
}

.item {
  margin-bottom: 15px;
  &:last-child {
    margin-bottom: 0;
  }
}

.items__wrapper {
  height: 450px;
  overflow-y: scroll;
}

.user {
  &__fav-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__parties {
    background-color: #EAEAEA;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);
  }
}

.fav__button__wrapper {
  margin-bottom: 20px;
}
</style>