<template>
  <base-layout :header-text="translate('TABS.PROFILE')">
    <app-user-data v-if="currentUser" :user-data="currentUser"/>
    <app-action-list class="ma-20">
      <div class="user__balance">
        <div class="balance__title">{{ translate('USER.BALANCE') }}: </div>
        <div class="balance__value">{{ currentUser?.points }}</div>
      </div>
    </app-action-list>
    <app-action-list class="ma-20">
      <app-action-item :title="translate('TABS.FAVORITES')" :modal-title="translate('TABS.FAVORITES')" :icon="heartIcon">
        <div v-if="favoritesUsers && favoritesUsers.users.length > 0" class="members__wrapper">
          <app-user-item class="party__item" @press="closeAllModals" v-for="user in favoritesUsers.users" :user="user" background-color="#F8F8F8"/>
        </div>
        <app-no-items v-else class="ma-20">
          {{ translate('NO_ITEMS_TEXTS.NO_FAVORITES') }}
        </app-no-items>
      </app-action-item>
      <app-action-item :title="translate('ACTIONS.SUBSCRIBERS')" :modal-title="translate('ACTIONS.SUBSCRIBERS')" :icon="peopleIcon">
        <div v-if="subscribers && subscribers.users.length > 0" class="members__wrapper">
          <app-user-item class="party__item" @press="closeAllModals" v-for="user in subscribers.users" :user="user" background-color="#F8F8F8"/>
        </div>
        <app-no-items v-else class="ma-20">
          {{ translate('NO_ITEMS_TEXTS.NO_FAVORITES') }}
        </app-no-items>
      </app-action-item>
      <app-action-item :title="translate('ACTIONS.LANGUAGES')" :modal-title="translate('ACTIONS.LANGUAGES')" :icon="langIcon">
        <div class="radio-group__wrapper">
          <ion-radio-group :value="currentLang">
            <ion-item v-for="lang in langs">
              <ion-radio @ion-focus="changeLang(lang.lang)" :value="lang.lang">{{ lang.name }}</ion-radio>
            </ion-item>
          </ion-radio-group>
        </div>
      </app-action-item>
      <app-action-item  @on-click="toggleDeleteAlertIsOpen" :title="translate('ACTIONS.LOGOUT')" :icon="logoutIcon">
        <template v-slot:custom>
          <ion-alert 
            :is-open="logoutAlertIsOpen" 
            :header="translate('ALERTS.YOU_SURE')" 
            :buttons="alertButtons"
            @didDismiss="toggleDeleteAlertIsOpen"
          ></ion-alert>
        </template>
      </app-action-item>
    </app-action-list>
  </base-layout>
</template>

<script setup lang="ts">
import BaseLayout from '@/layouts/BaseLayout.vue';
import AppUserData from '@/components/users-components/AppUserData.vue';
import AppActionList from '@/components/base-components/AppActionList.vue';
import AppActionItem from '@/components/base-components/AppActionItem.vue';
import AppNoItems from '@/components/base-components/AppNoItems.vue';
import AppUserItem from '@/components/users-components/AppUserItem.vue';
import logoutIcon from '@/../public/icons/ion-icons/log-out-outline.svg'
import heartIcon from '@/../public/icons/ion-icons/heart-outline.svg'
import peopleIcon from '@/../public/icons/ion-icons/people-outline.svg'
import langIcon from '@/../public/icons/ion-icons/language-outline.svg'
import { useAppI18n, Lang, LangInfo } from '@/i18n'; 
import { useUserStore } from '@/stores';
import { CurrentUser, FavoritesResponse } from '@/models';
import { closeAllModals, requestService } from '@/services'
import { onIonViewWillEnter, AlertButton, IonRadioGroup, IonRadio, IonItem } from '@ionic/vue';
import { ref } from 'vue';

const request = requestService()

const { getCurrentUserData, logout } = useUserStore()
const { translate, locale, getLangsInfo, changeLang, } = useAppI18n()
const langs = ref<LangInfo[]>(getLangsInfo())
const currentLang = ref<Lang>(locale.value as Lang)


const alertButtons: AlertButton[] = [
  {
    text: translate('BTNS.NO'),
  },
  {
    text: translate('BTNS.YES'),
    handler: async () => {
      logout()
    },
  },
]

const currentUser = ref<CurrentUser | null>(null)
const favoritesUsers = ref<FavoritesResponse>()
const subscribers = ref<FavoritesResponse>()
const logoutAlertIsOpen = ref<boolean>(false)

onIonViewWillEnter(async () => {
  currentUser.value = getCurrentUserData()
  if (currentUser.value) {
    favoritesUsers.value = await request.getFavoriteUsers()
    subscribers.value = await request.getUsersByLikedId(currentUser.value?.id)
  }
})

async function handleChangeLanguages(event: any) {
  
}

function toggleDeleteAlertIsOpen() {
  logoutAlertIsOpen.value = !logoutAlertIsOpen.value
}
</script>

<style scoped lang="scss">
.user {
  &__balance {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
}
.balance {
  &__title {
    font-size: 24px;
  }

  &__value {
    font-size: 22px;
    font-weight: bold;
  }
}

.radio-group {
  &__wrapper {
    margin: 20px;
    border-radius: 8px;
  }
}

ion-item {
  --background: var(--app-white)
}

</style>