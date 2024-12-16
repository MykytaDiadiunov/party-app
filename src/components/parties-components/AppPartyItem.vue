<template>
  <div class="party__item" @click="clickHandler">
    <div class="item__img">
      <img v-if="data.image" :src="IMG_BASE_URL + data.image" alt="item_img">
      <img v-else src="../../../public/icons/image.png" alt="item_img">
    </div>
    <div class="item__info">
      <div class="item__title">{{ data.title }}</div>
      <div v-if="formattedStartTime" class="item__description">
        {{ getFormatedDate(formattedStartTime) }},
        {{ getFormatedTime(formattedStartTime) }} 
      </div>
    </div>
    <app-party-info-modal @modal-close="closePartyModal" :current-user-is-owner="userIsPartyOwner" :party="data" :is-open="partyModalIsOpen"/>
  </div>
</template>

<script setup lang="ts">
import AppPartyInfoModal from '@/components/parties-components/AppPartyInfoModal.vue';
import { IMG_BASE_URL } from '@/constants';
import { CurrentUser, Party } from '@/models';
import { getFormatedDate, getFormatedTime } from '@/services';
import { useUserStore } from '@/stores';
import { defineProps, defineEmits, onMounted, ref } from 'vue';

const { getCurrentUserData } = useUserStore()

const formattedStartTime = ref<Date>()
const partyModalIsOpen = ref<boolean>(false)
const userIsPartyOwner = ref<boolean>(false)

const props = defineProps<{
  data: Party,
  notDefaultClick?: boolean
}>()

const emit = defineEmits<{
  (e: 'onClick'): void
}>()

onMounted(() => {
  formattedStartTime.value = new Date(props.data.startDate)
  if (!props.notDefaultClick) {
    const currentUser: CurrentUser | null = getCurrentUserData()
    userIsPartyOwner.value = currentUser?.id === props.data.creatorId.id
  }
})



function clickHandler() {
  if (props.notDefaultClick) {
    emit('onClick')
  } else {
    openPartyModal()
  }
} 

function openPartyModal() {
  partyModalIsOpen.value = true
}

function closePartyModal() {
  partyModalIsOpen.value = false
}
</script>

<style scoped lang="scss">
.party {
		&__item {
      width: 100%;
      background-color: var(--app-white);
      padding: 10px;
      border-radius: 8px;
      display: flex;
		}
}
.item {
		&__img {
      width: 80px;
      min-width: 80px;
      height: 80px;
      margin-right: 10px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 8px;
      }
		}

		&__info {
      * {
        font-family: var(--montserat-font);
      }
		}

		&__title {
      width: 235px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 3px;
		}

		&__description {
      font-size: 16px;
		}
}
</style>