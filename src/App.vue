<template>
  <div class="credit-card-form">
    <form @submit="checkForm">
      <CreditCard />

      <div class="credit-card-form__item">
        <label>Card number</label>
        <input
          type="text"
          :value="cardNumber"
          @input="onNumberChange"
          :maxlength="LENGTH_WITH_SPACES"
        />
        <p>{{ cardNumber }}</p>
      </div>

      <div class="credit-card-form__item">
        <label>Card holder</label>
        <input type="text" v-model="name" />
      </div>

      <div class="credit-card-form__item credit-card-form__item--bottom">
        <div>
          <label>Expiration Date</label>

          <div class="credit-card-form__selects">
            <select class="credit-card-form__item">
              <option value="">Month</option>
              <option v-for="m in monthOptions" :key="m" :value="m">
                {{ m }}
              </option>
            </select>

            <select class="credit-card-form__item">
              <option value="">Year</option>
              <option v-for="y in yearOptions" :key="y" :value="y">
                {{ y }}
              </option>
            </select>
          </div>
        </div>

        <div>
          <label>CVV</label>
          <input type="text" v-model="cvv" :maxlength="CVV_LENGTH" />
        </div>
      </div>

      <button
        type="submit"
        class="credit-card-form__submit"
        :disabled="isDisabled"
      >
        <span>Submit</span>
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useCardStore } from './store/card'

import CreditCard from '@/components/CreditCard.vue'

const { changeNumber, changeName } = useCardStore()

const LENGTH_WITH_SPACES = 19
const MASK = '#### #### #### ####'.split('')
const CVV_LENGTH = 3

const monthOptions = (() => {
  const res = []
  for (let i = 1; i <= 12; i++) {
    res.push(`${i > 9 ? i : '0' + i}`)
  }
  return res
})()

const yearOptions = (() => {
  const res = []

  const d = new Date()
  const y = d.getFullYear()

  for (let i = y; i <= y + 10; i++) {
    res.push(i)
  }
  return res
})()

const cardNumber = ref('')
const name = ref('')
const cvv = ref('')
const month = ref(null)
const year = ref(null)

const isDisabled = computed(() => {
  return (
    !cardNumber.value.length ||
    !name.value.length ||
    !cvv.value.length ||
    !month.value ||
    !year.value
  )
})

watch(cardNumber, (n, oldV) => addSpace(n, oldV))
watch(name, n => changeName(n))

function addSpace(v: string, oldV: string) {
  const LENGHT_DICT = [4, 9, 14]
  const isExisted = LENGHT_DICT.indexOf(v.length) >= 0
  const increase = v.length > oldV.length

  if (increase && isExisted) {
    const arr = cardNumber.value.split('')
    arr.push(' ')
    cardNumber.value = arr.join('')
  }

  const res = [
    ...cardNumber.value.split(''),
    ...MASK.slice(cardNumber.value.length),
  ].join('')

  changeNumber(res)
}

function onNumberChange(event: Event) {
  const targetEl = event.target as HTMLInputElement
  const v = Number(targetEl.value)

  if (Number.isNaN(v)) {
    targetEl.value = cardNumber.value
    return
  }

  const input = targetEl.value
  cardNumber.value = input
}

function checkForm() {}
</script>

<style lang="scss">
.credit-card-form {
  padding: $step * 2;

  form {
    max-width: 570px;
    background-color: #fff;
    padding: $step * 2;
    border-radius: $step;
    margin: auto;
    box-shadow: $shadow;
    position: relative;
    padding-top: 100px + $step * 4;
    margin-top: 100px;
  }

  button[type='submit'] {
    background-color: $primary;
    border: none;
    color: #fff;
    padding: $step;
    border-radius: $step;
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: $step * 4;
    box-shadow: $shadow;
    font-size: 20px;

    &:disabled {
      background-color: rgba($primary, 0.1);
      box-shadow: none;
    }
  }

  &__item {
    margin-bottom: $step * 2;

    label,
    input[type='text'] {
      display: flex;
    }

    label {
      margin-bottom: 4px;
    }

    input[type='text'] {
      width: 100%;
    }

    &--bottom {
      display: grid;
      grid-template-columns: 1fr max-content;

      input[type='text'] {
        display: inline-block;
        width: auto;
      }
    }
  }

  &__selects {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: $step;
    margin-right: $step * 2;
  }

  select {
    appearance: none;
    background-image: url('@/assets/arrow.png');
    background-position: 90% center;
    background-size: 16px;
    background-repeat: no-repeat;
  }

  input[type='text'],
  select {
    height: 50px;
    font-size: inherit;
    padding: $step;
    box-sizing: border-box;
    border-radius: $step;
    border: 1px solid $divider;
  }
}
</style>
