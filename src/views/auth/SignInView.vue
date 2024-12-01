<template>
  <auth-layout header-text="Sign In">
    <main class="main">
      <div class="content__wrapper">
        <my-input v-model="emailInputModel" class="mb-15" place-holder="Email"/>
        <my-input v-model="passwordInputModel" class="mb-15" place-holder="Password" type="password"/>
        <div class="help-text">Don't have an account? <a @click="routing.toSignUp">Sign up!</a></div>
        <my-button class="px-30" @click="submit" title="Login"/>
      </div>
    </main>
  </auth-layout>
</template>

<script setup lang="ts">
// @ts-ignore
import AuthLayout from '@/layouts/AuthLayout.vue'; 
import { CurrentSessionUser, LoginRequest } from '@/models';
import { requestService, routingService } from '@/services';
import { useTokenStore, useUserStore } from '@/stores';
import { onMounted, ref } from 'vue';

const routing = routingService()
const requests = requestService()

const userStore = useUserStore()
const { setCurrentUserData } = userStore

const tokenStore = useTokenStore()
const { setToken } = tokenStore

const emailInputModel = ref<string>('')
const passwordInputModel = ref<string>('')

onMounted(() => {
  setDefaultValuesForFields()
})

async function submit(): Promise<void> {
  try {
    if (!emailInputModel.value || !passwordInputModel.value) {
      console.log("All fields are required!") //Rework!
      return
    }

    const requestModel: LoginRequest = {
      email: emailInputModel.value,
      password: passwordInputModel.value
    }

    const currentSessionUser: CurrentSessionUser = await requests.login(requestModel)

    setCurrentUserData(currentSessionUser.user)
    setToken(currentSessionUser.token)

    routing.toParties()

    setDefaultValuesForFields()
  } catch(e: any) {
    console.error(e)
  }
}

function setDefaultValuesForFields() {
  emailInputModel.value = 'user@gmail.com'
  passwordInputModel.value = 'password'
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

.help-text {
  width: 100%;
  font-size: 14px;
  text-align: center;
  margin-bottom: 10px;
}

</style>