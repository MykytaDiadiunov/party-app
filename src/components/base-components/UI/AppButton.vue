<template>
  <div class="button__wrapper">
    <button>{{ title }}</button>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
    title: string
}>()

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