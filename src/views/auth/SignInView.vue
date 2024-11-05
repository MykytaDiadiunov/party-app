<template>
  <auth-layout header-text="Sign In">
    <main class="main">
      <div class="content__wrapper">
        <my-input v-model="emailInputModel" class="mb-15" place-holder="Email"/>
        <my-input v-model="passwordInputModel" class="mb-30" place-holder="Password" type="password"/>
        <my-button class="px-30" @click="submit" title="Login"/>
      </div>
    </main>
  </auth-layout>
</template>

<script setup lang="ts">
// @ts-ignore
import AuthLayout from '@/layouts/AuthLayout.vue'; 
import { ref } from 'vue';

const emailInputModel = ref<string>('')
const passwordInputModel = ref<string>('')

function submit() {
  console.log("Clicked!")
}

</script>

<style scoped lang="scss">
.main {
  width: 100%;
  height: 100%;
}

.content__wrapper {
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: var(--ion-background-color);
  padding: 60px 45px;
}

</style>