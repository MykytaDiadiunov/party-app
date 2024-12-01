<template>
  <div class="avatar__wrapper">
    <div class="avatar__bg">
      <img src="../../../public/bgs/bg.jpg" alt="ava_bg">
    </div>
    <div class="user__avatar">
      <img :src="NO_AVATAR" alt="user_vatar">
    </div>
  </div>
</template>

<script setup lang="ts">
import { NO_AVATAR } from '@/constants';


</script>

<style scoped lang="scss">
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