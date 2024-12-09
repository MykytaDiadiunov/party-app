<template>
  <auth-layout header-text="Sign Up">
    <main class="main">
      <div class="content__wrapper">
        <my-input v-model="nameInputModel" class="mb-15" :placeholder="translate('PLACEHOLDERS.NAME')"/>
        <my-input v-model="emailInputModel" class="mb-15" :placeholder="translate('PLACEHOLDERS.EMAIL')"/>
        <my-input v-model="passwordInputModel" class="mb-15" :placeholder="translate('PLACEHOLDERS.PASSWORD')" type="password"/>
        <my-input v-model="repeatPasswordInputModel" class="mb-15" :placeholder="translate('PLACEHOLDERS.REPEAT_PASSWORD')" type="password"/>
        <div class="help-text">Already have an account? <a @click="routing.toSignIn">{{ translate('BTNS.LOGIN') }}!</a></div>
        <my-button class="px-30" @click="submit" :title="translate('BTNS.SIGN_UP')"/>
      </div>
    </main>
  </auth-layout>
</template>

<script setup lang="ts">
import AuthLayout from '@/layouts/AuthLayout.vue'; 
import { CurrentSessionUser, RegisterRequest } from '@/models';
import { requestService, routingService } from '@/services';
import { useTokenStore, useUserStore } from '@/stores';
import { ref } from 'vue';
import { useAppI18n } from '@/i18n';
const { translate } = useAppI18n() 

const routing = routingService()
const requests = requestService() 

const userStore = useUserStore()
const { setCurrentUserData } = userStore

const tokenStore = useTokenStore()
const { setToken } = tokenStore

const nameInputModel = ref<string>('')
const emailInputModel = ref<string>('')
const passwordInputModel = ref<string>('')
const repeatPasswordInputModel = ref<string>('')

async function submit() {
  try {
    if (!nameInputModel.value || !emailInputModel.value || !passwordInputModel.value || !repeatPasswordInputModel.value) {
      console.log("All fields are required!") //Rework!
      return
    }

    if(passwordInputModel.value !== repeatPasswordInputModel.value) {
      console.log("Passwords do not match!") //Rework!
      return
    }

    const requestModel: RegisterRequest = {
      name: nameInputModel.value,
      email: emailInputModel.value,
      password: passwordInputModel.value
    }

    const currentSessionUser: CurrentSessionUser = await requests.register(requestModel)

    setCurrentUserData(currentSessionUser.user)
    setToken(currentSessionUser.token)

    routing.toParties()

    setDefaultValuesForFields()
  } catch(e: any) {
    console.error(e)
  }
}

function setDefaultValuesForFields() {
  nameInputModel.value = ''
  emailInputModel.value = ''
  passwordInputModel.value = ''
  repeatPasswordInputModel.value = ''
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