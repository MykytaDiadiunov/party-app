<template>
  <div class="actions__wrapper">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss">
.actions {
  &__wrapper {
    background-color: var(--app-white);
    box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
  }
}

</style>