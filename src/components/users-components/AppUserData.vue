<template>
  <div class="avatar__wrapper">
    <div class="avatar__bg">
      <img src="../../../public/bgs/bg.jpg" alt="ava_bg">
    </div>
    <div class="user__avatar">
      <img :src="NO_AVATAR" alt="user_vatar">
    </div>
  </div>
  <div class="user__name">{{ userData?.username }}</div>
  <div class="user__email">{{ userData?.email }}</div>
</template>

<script setup lang="ts">
import { NO_AVATAR } from '@/constants';
import { CurrentUser, User } from '@/models';

const props = defineProps<{
  userData: CurrentUser | User
}>()

</script>

<style scoped lang="scss">
.user {
  &__name {
    font-weight: 600;
    font-size: 28px;
    text-align: center;
    margin-bottom: 5px;
  }

  &__email {
    font-weight: 300;
    font-size: 18px;
    text-align: center;
    margin-bottom: 10px;
  }
}
.user__avatar {
  width: 150px;
  height: 150px;
  img {
    border-radius: 50%;
    background-color: #fff;
    border: 8px solid var(--app-red);
  }
}

.avatar{
  &__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
    margin-bottom: 10px;
  }

  &__bg {
    position: absolute;
    top: 0;
    z-index: -1;
    height: 100px;
    width: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>