<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button :class="{ 'selected-tab': selectedTab === 'tab1' }" @click="selectTab('tab1', routing.toParties)">
          <div class="tab-icon">
            <img :src="PartiesIcon" alt="tab-icon">
          </div>
          <ion-label>{{ translate('TABS.PARTIES') }}</ion-label>
        </ion-tab-button>

        <ion-tab-button :class="{ 'selected-tab': selectedTab === 'tab2' }" @click="selectTab('tab2', routing.toProfile)">
          <div class="tab-icon">
            <img :src="ProfileIcon" alt="tab-icon">
          </div>
          <ion-label>{{ translate('TABS.PROFILE') }}</ion-label>
        </ion-tab-button>

        <ion-tab-button :class="{ 'selected-tab': selectedTab === 'tab3' }" @click="selectTab('tab3', routing.toFavorites)">
          <div class="tab-icon">
            <img :src="FavIcon" alt="tab-icon">
          </div>
          <ion-label>{{ translate('TABS.FAVORITES') }}</ion-label>
        </ion-tab-button>

        <ion-tab-button :class="{ 'selected-tab': selectedTab === 'tab4' }" @click="selectTab('tab4', routing.toMyParties)">
          <div class="tab-icon">
            <img :src="MyPartiesIcon" alt="tab-icon">
          </div>
          <ion-label>{{ translate('TABS.MY_PARTIES') }}</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { routingService } from '@/services';
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet, onIonViewWillEnter } from '@ionic/vue';
import PartiesIcon from '@/../public/tabs/party_icon.png'
import ProfileIcon from '@/../public/tabs/profile_icon.png'
import FavIcon from '@/../public/tabs/fav_icon.png'
import MyPartiesIcon from '@/../public/tabs/my_party_icon.png'
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useAppI18n } from '@/i18n'; 

const { translate } = useAppI18n()

const routing = routingService()
const route = useRoute()

const selectedTab = ref<string>('tab1')

watch(() => route.path, () => {
  if(route.path === '/tabs/parties') {
    selectedTab.value = 'tab1'
  }
  else if(route.path === '/tabs/profile') {
    selectedTab.value = 'tab2'
  }
  else if (route.path === '/tabs/fav') {
    selectedTab.value = 'tab3'
  }
  else if (route.path === '/tabs/my-parties') {
    selectedTab.value = 'tab4'
  }
}, { immediate: true })

async function selectTab(tabName: string, routingTo:() => void) {
  selectedTab.value = tabName
  routingTo()
}

</script>

<style scoped lang="scss">
ion-tab-button {
  --background: var(--app-red);
  --ripple-color: var(--app-pressed-red);
  * {
    color: #fff;
    font-size: 10px;
  }
}

.selected-tab {
  background-color: var(--app-pressed-red);
}

.tab-icon {
  width: 30px;
  height: 30px;
  img {
    width: 100%;
    height: 100%;
  }
}

ion-label {
  margin: 0;
}
</style>
