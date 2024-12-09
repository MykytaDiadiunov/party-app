<template>
  <div class="modal__wrapper">
    <ion-modal  @ionModalWillPresent="onPartyBeforeModelIsOpen" @ionModalDidPresent="onPartyModalIsOpen" :is-open="isOpen">
      <app-header @back-button-click="emit('modalClose')" :back-button="true" :text="translate('HEADER.NEW_PARTY')"/>
      <ion-content>
        <form class="form" onsubmit="return false">
          <div class="party__title">
            <label>
              {{ translate('LABELS.TITLE') }}
              <my-input :placeholder="translate('LABELS.TITLE')"/>
            </label>
          </div>
          <div class="party__description">
            {{ translate('LABELS.DESCRIPTION') }}
            <my-input :placeholder="translate('LABELS.DESCRIPTION')"/>
          </div>
          <div class="party__start-time">
            <label>{{ translate('LABELS.START_DATE') }}</label> 
             <my-button @click="openDatetimeInput" title="tExt"/>
            <div v-if="partyStartTimeDateObject" class="party__start-date">
              <div>{{ getFormatedDate(partyStartTimeDateObject) }}, {{ getFormatedTime(partyStartTimeDateObject) }}</div>
              <input ref="datetimeInputRef" type="datetime-local" class="display-none">
            </div>
          </div>
          <div class="party__image">
            <label>{{ translate('LABELS.IMAGE') }}</label>
            <div class="file__input">
              <div class="preview__img">
                <img :src="imagePreview ? imagePreview : '../../../public/icons/no-image.png'" alt="preview"/>
              </div>
              <my-button @click="openFileInput" :title="translate('BTNS.UPLOAD_IMG')"/>
            </div>
            <input @change="uploadImage" ref="imageInputRef" type="file" class="display-none" />
          </div>
          <div class="party__creating-cost tac">
            <span>{{ translate('INFO.CREATING_COST') }}: {{ PARTY_CREATING_COST }} ({{ translate('USER.BALANCE') }}: {{ currentUser?.points }})</span>
          </div>
          <div class="party__submit">
            <div class="submit__wrapper">
              <my-button paddingY="15" :title="translate('BTNS.CREATE')"/>
            </div>
          </div>
        </form>
      </ion-content>
    </ion-modal> 
  </div>
</template>

<script setup lang="ts">
import AppHeader from '../base-components/AppHeader.vue';
import { defineProps, defineEmits, ref, nextTick, onMounted } from 'vue';
import { IonContent, IonModal, IonDatetime, IonDatetimeButton } from '@ionic/vue';
import { useAppI18n } from '@/i18n';
import { convertImgToBase64String, getFormatedDate, getFormatedTime } from '@/services';
import { ConvertedToBase64Image, CreateParty, CurrentUser } from '@/models';
import { useUserStore } from '@/stores';
import { PARTY_CREATING_COST } from '@/constants';

const { translate } = useAppI18n()

const userStore = useUserStore()

const imageInputRef = ref<HTMLInputElement | null>(null)
const datetimeInputRef = ref<HTMLInputElement | null>(null)

const imagePreview = ref<string | null>(null)

const currentUser = ref<CurrentUser | null>(null)

const createPartyBody = ref<CreateParty>()
const partyTitle = ref<string>('')
const partyDescription = ref<string>('')
const partyStartTime = ref<string>()
const partyStartTimeDateObject = ref<Date>(new Date())

interface DatetimeFormatOption { 
  date?: Intl.DateTimeFormatOptions; 
  time: Intl.DateTimeFormatOptions; 
}

const formatOptions: DatetimeFormatOption = {
  date: {
    month: 'long',
    day: '2-digit',
  },  
  time: {
    hour: '2-digit',
    minute: '2-digit',
  },
}

const props = defineProps<{
  isOpen: boolean,
}>()

const emit = defineEmits<{
  (e: 'modalClose'): void
  (e: 'partyCreated'): void
}>()

function onPartyBeforeModelIsOpen() {
  currentUser.value = userStore.getCurrentUserData()
}

function onPartyModalIsOpen() {
  console.log(datetimeInputRef.value)
  if (datetimeInputRef.value) {
    // datetimeInputRef.value.valueAsDate = partyStartTimeDateObject.value
  } 
}

function openFileInput() {
  imageInputRef.value?.click()
}

function openDatetimeInput() {
  console.log(1)
  datetimeInputRef.value?.showPicker()
}

async function uploadImage() {
  if (imageInputRef.value?.files && imageInputRef.value.files?.length > 0) {
    const file: File = imageInputRef.value?.files[0]
    const convertedImg: ConvertedToBase64Image = await convertImgToBase64String(file)
    imagePreview.value = convertedImg.image
  }
}
</script>

<style scoped lang="scss">
$marginBottom: 15px;

.base-text {
  background-color: #fff;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 15px;
}

.form {
  padding: 20px;
}

.party {
  &__title {
    margin-bottom: $marginBottom;
  }

  &__description {
    margin-bottom: $marginBottom;
  }

  &__start-time {
    margin-bottom: $marginBottom;
  }

  &__start-date {
    @extend .base-text;
  }

  &__image {
    margin-bottom: 20px;
  }

  &__creating-cost {
    margin: $marginBottom + 10px 0px;
    span {
      font-size: 18px;
      font-weight: bold;
      background-color: #fff;
      padding: 10px;
      border-radius: 8px;
    }
  }

  &__submit {
    display: flex;
    justify-content: center;
  }
}

.submit {
  &__wrapper {
    width: 280px;

  }
}

.file {
  &__input {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border-radius: 8px;
    padding: 10px 0px;
  }
}

.preview {
  &__img {
    width: 85px;
    height: 85px;
    margin-right: 10px; 

    img {
      border-radius: 8px;
    }
  }
}

ion-datetime-button {
  justify-content: left ;
}

ion-datetime-button::part(native) {
  background-color: #fff;
}

</style>