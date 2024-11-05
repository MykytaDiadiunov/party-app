<template>
  <label class="custom__input">
    <input
        :placeholder="placeHolder"
        :type="type"
        :value="modelValue"
        @input="hanldeInput"
    />
  </label>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
    placeHolder: string
    type?: string
    modelValue: string
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', data: string): void
}>()

function hanldeInput(event: Event) {
    const target = event.target as HTMLInputElement
    emit('update:modelValue', target.value)
}

</script>

<style scoped lang="scss">
.custom__input {
    width: 100%;
    display: block;

    input {
        width: 100%;
        font-family: var(--montserat-font);
        font-weight: bold;
        font-size: 18px;
        background-color: #fff;
        padding: 10px;
        border: 0; 
        border-radius: 8px;
        box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);

        &::placeholder {
            color: #000;
            font-family: var(--montserat-font);
        }

        &:focus {
            outline: none;
        }
    }   
}
</style>