<template>
  <div class="modal__wrapper">
    <ion-modal  @ionModalWillPresent="onPartyModelIsOpen" :is-open="isOpen"  @didDismiss="emit('modalClose')" >
      <app-header @back-button-click="emit('modalClose')" :back-button="true" :text="party?.title"/>
      <ion-content>
        <div class="modal__content">
          <div class="icon__wrapper">
            <div class="party__icon">
              <img v-if="party.image" :src="IMG_BASE_URL + party.image" alt="item_img">
              <img v-else src="../../../public/icons/image.png" alt="item_img">
            </div>
          </div>
          <div v-if="!currentUserIsOwner" class="party__accept">
            <my-button v-if="!partyIsJoined?.isJoined" @click="joinToParty" font-size="20" :title="translate('BTNS.JOIN')"/>
            <my-button v-else @click="leaveFromParty" background-color="var(--app-pressed-btn)" font-size="20" :title="translate('BTNS.LEAVE')"/>
          </div>
          <div class="party__title">
            <div class="title-label">{{ translate('LABELS.TITLE') }}</div>
            <span>{{ party?.title }}</span>
          </div>
          <div class="party__description">
            <div class="description-label">{{ translate('LABELS.DESCRIPTION') }}</div>
            <span>{{ party?.description }}</span>
          </div>
          <div v-if="partyDate" class="party__start-date">
            <div class="date-label">{{ translate('LABELS.START_DATE') }}</div>
            {{ getFormatedDate(partyDate) }}, {{ getFormatedTime(partyDate) }}
          </div>
          <div class="party__creator">
            <div class="creator-label">{{ translate('LABELS.CREATOR') }}</div>
            <app-user-item :user="party.creatorId" @press="emit('modalClose')" />
          </div>
        </div>
      </ion-content>
    </ion-modal> 
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/base-components/AppHeader.vue';
import AppUserItem from '@/components/users-components/AppUserItem.vue';
import { defineProps, defineEmits, ref } from 'vue'
import { IonModal, IonContent } from '@ionic/vue';
import { useAppI18n } from '@/i18n';
import { ExistsInFavoritesResponse, ExistsInPartyResponse, Party } from '@/models';
import { IMG_BASE_URL } from '@/constants';
import { getFormatedDate, getFormatedTime, requestService } from '@/services';
const { translate } = useAppI18n()

const requests = requestService()

const props = defineProps<{
  isOpen: boolean,
  currentUserIsOwner: boolean
  party: Party,
}>()

const emit = defineEmits<{
  (e: 'modalClose'): void
}>()

const partyDate = ref<Date>()
const partyIsJoined = ref<ExistsInPartyResponse>()
const partyOwnerIsFavorite = ref<ExistsInFavoritesResponse>()

async function onPartyModelIsOpen() {
  if(props.party) {
    partyDate.value = new Date(props.party.startDate)
    partyIsJoined.value = await requests.checkExistsInParty(props.party.id) 
    partyOwnerIsFavorite.value = await requests.checkExistsInFavorites(props.party.creatorId.id)
  }
}

async function joinToParty() {
  if(props.party) {
    await requests.joinToParty(props.party.id)
    partyIsJoined.value = await requests.checkExistsInParty(props.party.id)
  }
}

async function leaveFromParty() {
  if(props.party) {
    await requests.leaveFromParty(props.party.id)
    partyIsJoined.value = await requests.checkExistsInParty(props.party.id)
  }
}

</script>

<style scoped lang="scss">
$labelFontSize: 14px;

.base-text {
  background-color: #fff;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 15px;
}

.base-label {
  font-size: $labelFontSize !important;
}

.modal {
  &__content {
    color: #000;
    padding: 15px;
    * {
      font-size: 22px;
    }
  }
}

.icon__wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.party {

  &__icon {
    width: 180px;
    height: 180px;
    margin-bottom: 15px;

    img {
      background-color: #fff;
      border: 8px solid var(--app-red);
      border-radius: 15px;
    }
  }

  &__title {
    @extend .base-text;
  }

  &__description {
    @extend .base-text;
  }

  &__start-date {
    @extend .base-text;
  }

  &__creator {
    @extend .base-text;
    
  }

  &__accept {
    width: 100%;
    padding: 0px 100px;
    margin-bottom: 20px;
    font-size: 24px;
  }
}

.title-label {
  @extend .base-label;
}

.description-label {
  @extend .base-label;
}

.date-label {
  @extend .base-label;
}

.creator-label {
  @extend .base-label;  
  margin-bottom: 5px;
}
</style>