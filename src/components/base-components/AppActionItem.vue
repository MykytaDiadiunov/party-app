<template>
  <div class="action__item" @click="clickHendler">
    <div class="action__wrapper">
      <div class="item__wrapper">
        <div class="action__icon">
          <img :src="icon" alt="icon">
        </div>
        <div class="action__title">{{ title }}</div>
      </div>
      <div class="action__arrow">
        <img src="../../../public/icons/arrow2.png" alt="arrow">
      </div>
    </div>
  </div>
  <div v-if="$slots.custom" class="custom__action">
    <slot name="custom"></slot>
  </div>
  <ion-modal v-if="$slots.default" :is-open="modalIsOpen" @onDidDismiss="modalIsOpen = false">
    <app-header @back-button-click="toggleModal" :back-button="true" :text="modalTitle ? modalTitle : ''"/>
    <ion-content>
      <slot></slot>
    </ion-content>
  </ion-modal>
</template>

<script setup lang="ts">
import AppHeader from './AppHeader.vue';
import { computed, ref, useSlots } from 'vue';
import { IonModal, IonContent } from '@ionic/vue'

const slots = useSlots();
const hasDefaultSlot = computed(() => !!slots.default);
const hasCustomSlot = computed(() => !!slots.custom);

const modalIsOpen = ref<boolean>(false)

const props = defineProps<{
  icon: string,
  title: string,
  modalTitle?: string
}>()

const emit = defineEmits<{
  (e: 'onClick'): void
}>()

function clickHendler() {
  if (hasDefaultSlot.value && !hasCustomSlot.value) {
    toggleModal()
  }
  else {
    emit('onClick')
  }
}

function toggleModal() {
  modalIsOpen.value = !modalIsOpen.value
}

</script>

<style lang="scss">
.action {

  &__item {
    padding: 15px 10px;
  }

  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__icon {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }

  &__title {
    font-size: 18px;
    font-family: var(--montserat-font);
    font-weight: 500;
  }

  &__arrow {
    width: 20px;
    height: 20px;
  }
}

.item {
  &__wrapper {
    display: flex;
    align-items: center
  }
}

</style>