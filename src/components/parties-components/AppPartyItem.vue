<template>
  <div class="party__item">
    <div class="item__img">
      <img :src="IMG_BASE_URL + data.image" alt="item_img">
    </div>
    <div class="item__info">
      <div class="item__title">{{ data.title }}</div>
      <div v-if="formattedStartTime" class="item__description">
        {{ getFormatedDate(formattedStartTime) }},
        {{ getFormatedTime(formattedStartTime) }} 
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IMG_BASE_URL } from '@/constants';
import { Party } from '@/models';
import { getFormatedDate, getFormatedTime } from '@/services';
import { defineProps, onMounted, ref } from 'vue';

const formattedStartTime = ref<Date>()

const props = defineProps<{
  data: Party
}>()

onMounted(() => {
  formattedStartTime.value = new Date(props.data.startDate)
})

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