<template>
  <auth-layout header-text="Sign Up">
    <main class="main">
      <div class="content__wrapper">
        <my-input v-model="nameInputModel" class="mb-15" place-holder="Name"/>
        <my-input v-model="emailInputModel" class="mb-15" place-holder="Email"/>
        <my-input v-model="passwordInputModel" class="mb-15" place-holder="Password" type="password"/>
        <my-input v-model="repeatPasswordInputModel" class="mb-30" place-holder="Repeat Password" type="password"/>
        <my-button class="px-30" @click="submit" title="Sign Up"/>
      </div>
    </main>
  </auth-layout>
</template>

<script setup lang="ts">
// @ts-ignore
import AuthLayout from '@/layouts/AuthLayout.vue'; 
import { ref } from 'vue';

const nameInputModel = ref<string>('')
const emailInputModel = ref<string>('')
const passwordInputModel = ref<string>('')
const repeatPasswordInputModel = ref<string>('')

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