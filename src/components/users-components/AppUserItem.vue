<template>
  <div @click="routToUserProfile" ref="userConteiner" class="creator__container">
    <div class="data__wrapper">
      <div class="creator__avatar">
        <img :src="NO_AVATAR" alt="ava_img">
      </div>
      <div class="creator__name">{{ user.username }}</div>
    </div>
    <my-button v-if="!userIsFavorite?.isLiked" @click.stop="followUser" font-size="14" :title="translate('BTNS.FOLLOW')"/>
    <my-button v-else @click.stop="unfollowUser" background-color="var(--app-pressed-btn)" font-size="14" :title="translate('BTNS.UNFOLLOW')"/>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, onMounted, ref } from 'vue';
import { NO_AVATAR } from '@/constants';
import { requestService, routingService } from '@/services';
import { CurrentUser, ExistsInFavoritesResponse, User } from '@/models';
import { useAppI18n } from '@/i18n'; 
const { translate } = useAppI18n()

const requests = requestService()
const routing = routingService()

const userIsFavorite = ref<ExistsInFavoritesResponse>()

const userConteiner = ref<HTMLDivElement | null>(null)

const props = defineProps<{
  user: CurrentUser | User,
  backgroundColor?: string
}>()

const emit = defineEmits<{
  (e: 'press'): void,
  (e: 'followed'): void,
  (e: 'unfollowed'): void
}>()

onMounted(async () => {
  userIsFavorite.value = await requests.checkExistsInFavorites(props.user.id)
  
  if (props.backgroundColor && userConteiner.value) {
    userConteiner.value.style.setProperty('background-color', props.backgroundColor)
  }
})

async function followUser() {
  if (props.user) {
    await requests.addToFavorites(props.user.id)
    userIsFavorite.value = await requests.checkExistsInFavorites(props.user.id)
    emit('followed')
  }
}

async function unfollowUser() {
  if (props.user) {
    await requests.removeFromFavorites(props.user.id)
    userIsFavorite.value = await requests.checkExistsInFavorites(props.user.id)
    emit('unfollowed')
  }
}

function routToUserProfile() {
  if (props.user) {
    emit('press')
    routing.toUserProfile(props.user.id)
  }
}
</script>

<style scoped lang="scss">
.creator {

  &__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-radius: 8px;
    background-color: #ebe7e7;
  }

  &__avatar {
    width: 50px;
    height: 50px;
    margin-right: 10px;

    img {
      border: 3px solid var(--app-red);
      border-radius: 50%;
      background-color: #fff;
    }
  }

  &__name {
    font-size: 20px;
    font-weight: 500;
  }
}

.data__wrapper {
  display: flex;
  align-items: center 
}
</style>