<template>
  <div class="no-items">
    <div class="no-items__wrapper"><span><slot/></span></div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.no-items {
  background-color: var(--app-white);
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  &__wrapper {
    text-align: center;
    padding: 30px 40px;
    font-family: var(--montserat-font);
    font-weight: bold;
    font-size: 20px;
  }
}
</style>