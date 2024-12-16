<template>
  <label class="custom__input">
    <input
      :placeholder="placeholder"
      :type="inputType"
      :value="modelValue"
      @input="hanldeInput"
    />
    <div v-if="type && type === 'password'" class="hide">
      <img @click.stop="togglePasswordIsShowed" v-if="isPasswordShowed" src="../../../../public/icons/hide-password.png" alt="hide_password_icon">
      <img @click.stop="togglePasswordIsShowed" v-else src="../../../../public/icons/show-password.png" alt="show_password_icon">
    </div>
  </label>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, onMounted } from 'vue';

const props = defineProps<{
  placeholder: string
  type?: string
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', data: string): void
}>()

const inputType = ref<string>('text')
const isPasswordShowed = ref<boolean>(false)

onMounted(() => {
  if(props.type) {
    inputType.value = props.type
  }
})

function hanldeInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

function togglePasswordIsShowed() {
  isPasswordShowed.value = !isPasswordShowed.value
  inputType.value = !isPasswordShowed.value ? 'password' : 'text'
}

</script>

<style scoped lang="scss">
.custom__input {
  position: relative;
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
        font-weight: normal;
    }

    &:focus {
        outline: none;
    }
  }   
}

.hide {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  width: 25x;
  height: 25px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>