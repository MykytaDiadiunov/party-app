<template>
  <div class="button__wrapper">
    <button ref="buttonRef">{{ title }}</button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref } from 'vue';

const buttonRef = ref<HTMLButtonElement>()

const props = defineProps<{
  title: string,
  fontSize?: number,
  color?: string,
  backgroundColor?: string,
  paddingY?: number,
  paddingX?: number,
}>()

onMounted(() => {
  if (props.fontSize) {
    buttonRef.value?.style.setProperty("font-size", `${props.fontSize}px`)
  }

  if (props.backgroundColor) {
    buttonRef.value?.style.setProperty("background-color", props.backgroundColor)
  }

  if (props.color) {
    buttonRef.value?.style.setProperty("color", props.color)
  }

  if (props.paddingX) {
    buttonRef.value?.style.setProperty("padding-right", `${props.paddingX}px`)
    buttonRef.value?.style.setProperty("padding-left", `${props.paddingX}px`)
  }

  if (props.paddingY) {
    buttonRef.value?.style.setProperty("padding-top", `${props.paddingY}px`)
    buttonRef.value?.style.setProperty("padding-bottom", `${props.paddingY}px`)
  }
})

</script>

<style scoped lang="scss">
.button__wrapper {
  button {
    background-color: var(--app-red);
    color: #fff;
    font-weight: 600;
    font-size: 16px;
    border-radius: 8px;
    padding: 10px 50px;
    width: 100%;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);

    &:active {
      background-color: var(--app-pressed-red);
      box-shadow: 0;
      transform: translateY(1px);
    }
  }
}

</style>