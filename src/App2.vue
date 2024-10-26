<template>
  <div class="credit-card-form">
    <form @submit.prevent="onSubmit">
      <CreditCard2
        :visible-side="visibleSide"
        :focused-element="focusedElement"
        :card-data="cardData"
      />

      <div class="credit-card-form__item">
        <label>Card number</label>
        <input
          type="text"
          :value="formattedCardNumber"
          @input="onCardNumberChange"
          :maxlength="CARD_NUMBER_MAX_LENGTH"
          @focus="setCurrentFocusedInput('card-number')"
          @blur="clearFocus"
        />
      </div>

      <div class="credit-card-form__item">
        <label>Card holder</label>
        <input
          @focus="setCurrentFocusedInput('card-holder')"
          @blur="clearFocus"
          type="text"
          v-model="cardHolder"
        />
      </div>

      <div class="credit-card-form__item credit-card-form__item--bottom">
        <div>
          <label>Expiration Date</label>

          <div class="credit-card-form__selects">
            <select
              v-model="month"
              class="credit-card-form__item"
              @focus="setCurrentFocusedInput('expiration-date')"
              @blur="clearFocus"
            >
              <option disabled value="">Month</option>
              <option v-for="m in monthOptions" :key="m" :value="m">
                {{ m }}
              </option>
            </select>

            <select
              v-model="year"
              class="credit-card-form__item"
              @focus="setCurrentFocusedInput('expiration-date')"
              @blur="clearFocus"
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
            :maxlength="CVV_MAX_LENGTH"
            @focus="setCurrentFocusedInput('cvv')"
            @blur="clearFocus"
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
import { computed, ref } from 'vue'
import CreditCard2 from '@/components/CreditCard2.vue'
import { useFocusedInput } from './composables/focusedInput'
import { generateAvailableMonths, generateAvailableYears } from './utils'
import { useCardNumber } from './composables/cardNumber'

const CVV_MAX_LENGTH = 3
const CARD_NUMBER_MAX_LENGTH = 19

const monthOptions = generateAvailableMonths()
const yearOptions = generateAvailableYears()

const cvv = ref('')
const cardNumber = ref('')
const cardHolder = ref('')
const month = ref('')
const year = ref('')

const cardData = computed(() => ({
  cvv: cvv.value,
  cardNumber: cardNumber.value,
  cardHolder: cardHolder.value,
  month: month.value,
  year: year.value,
}))

const isValid = computed(() =>
  Boolean(
    cvv.value &&
      cardNumber.value &&
      cardHolder.value &&
      month.value &&
      year.value,
  ),
)

function onSubmit() {
  console.log('onSubmit', cardData.value)
}

const { formattedCardNumber, onCardNumberChange } = useCardNumber(cardNumber)
const { visibleSide, focusedElement, setCurrentFocusedInput, clearFocus } =
  useFocusedInput()
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
