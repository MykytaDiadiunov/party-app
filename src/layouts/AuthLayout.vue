<template>  
  <ion-page>
    <app-header :text="headerText"/>
    <ion-content :fullscreen="true">
      <div ref="bgRef" class="background__img">
        <div class="img_color">
          <h1>Party App</h1>
        </div>
        <img src="../../public/bgs/pexels-wendywei-1190298.jpg" alt="bg">
      </div>
      <div ref="perentContent" class="slot__wrapper">
        <slot></slot>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
// @ts-nocheck
import AppHeader from '@/components/base-components/AppHeader.vue';
import { IonPage, IonContent } from '@ionic/vue'
import { defineProps, onMounted, ref } from 'vue';

const bgRef = ref<HTMLElement>()
const perentContent = ref<HTMLElement>()

const props = defineProps<{
  headerText: string
}>()

onMounted(() => {
  setTimeout(() => {
    const contentHeight = perentContent.value?.children.item(0)?.children.item(0)?.clientHeight
    bgRef.value?.style.setProperty("height", `calc(100% - ${contentHeight}px)`)
  }, 0)
})

</script>

<style scoped lang="scss">
.background__img {
  width: 100%;
  height: 100%;
  position: relative;
  .img_color {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(37, 37, 37, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    h1 {
      color: #fff;
      font-size: 60px;
      font-weight: bold;
    }
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>