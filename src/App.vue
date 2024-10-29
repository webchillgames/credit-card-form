<template>
  <div class="credit-card-form">
    <form @submit.prevent="onSubmit" @click="onFormClick">
      <CreditCard
        :visibleSide="visibleSide"
        :focusedElName="focusedElName"
        :data="data"
        :cardOrganization="cardOrganization"
      />

      <div class="credit-card-form__item">
        <label>Card number</label>

        <input
          v-maska:unmaskedCardNumber.unmasked="cardOrganization?.mask"
          v-model="maskedCardNumber"
          type="text"
          data-focused="card-number"
        />
      </div>

      <div class="credit-card-form__item">
        <label>Card holder</label>
        <input data-focused="card-holder" type="text" v-model="name" />
      </div>

      <div class="credit-card-form__item credit-card-form__item--bottom">
        <div data-focused="expiration-date">
          <label>Expiration Date</label>

          <div class="credit-card-form__selects">
            <select
              v-model="month"
              class="credit-card-form__item"
              data-focused="expiration-date"
            >
              <option disabled value="">Month</option>
              <option v-for="m in monthOptions" :key="m" :value="m">
                {{ m }}
              </option>
            </select>

            <select
              v-model="year"
              class="credit-card-form__item"
              data-focused="expiration-date"
            >
              <option disabled value="">Year</option>
              <option v-for="y in yearOptions" :key="y" :value="y">
                {{ y }}
              </option>
            </select>
          </div>
        </div>

        <div>
          <label>CVV</label>
          <input
            type="text"
            v-model="cvv"
            :maxlength="CVV_MAX_LENGHT"
            data-focused="cvv"
          />
        </div>
      </div>

      <button
        type="submit"
        class="credit-card-form__submit"
        :disabled="!isValid"
      >
        <span>Submit</span>
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { vMaska } from 'maska/vue'
import { computed, ref } from 'vue'
import type { CreditCardInputs, SideName } from './types'
import { generateMonthOptions, generateYearsOptions } from './components/utils'

import { useHighlights } from './highlits'

import CreditCard from '@/components/CreditCard.vue'
import { getCardOrganizationData } from './formatting'
const { focusedElName, togglefocusedElName } = useHighlights()
const CVV_MAX_LENGHT = 3

const monthOptions = generateMonthOptions()
const yearOptions = generateYearsOptions()

const name = ref('')
const cvv = ref('')
const month = ref('')
const year = ref('')
const visibleSide = ref<SideName>('front')

const maskedCardNumber = ref('')
const unmaskedCardNumber = ref('')

defineExpose({ unmaskedCardNumber })

const cardOrganization = computed(() =>
  getCardOrganizationData(unmaskedCardNumber.value),
)

const data = computed(
  (): CreditCardInputs => ({
    month: month.value,
    year: year.value,
    cardNumber: unmaskedCardNumber.value,
    name: name.value,
    cvv: cvv.value,
  }),
)

const isValid = computed(
  () =>
    maskedCardNumber.value.length === cardOrganization.value?.mask.length &&
    name.value.length &&
    cvv.value.length === 3 &&
    month.value &&
    year.value,
)

function onFormClick(event: Event) {
  toggleVisibleSide(event)
  togglefocusedElName(event)
}

function toggleVisibleSide(event: Event) {
  const el = event.target as HTMLInputElement

  if (!el.dataset || !el.dataset.focused) {
    return
  }

  visibleSide.value = el.dataset.focused === 'cvv' ? 'back' : 'front'
}

function onSubmit() {
  if (!isValid.value) {
    console.log('Форма не отправлена')
  }

  console.log('Форма отправлена')
}
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
