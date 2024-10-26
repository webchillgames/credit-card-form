<template>
  <div class="credit-card">
    <div class="credit-card__wrapper" :style="highlightStyles"></div>
    <div v-if="visibleSide === 'front'" class="credit-card__front-side">
      <div class="credit-card__top">
        <img src="/chip.png" />
        <img src="/visa.png" />
      </div>

      <div class="credit-card__center" ref="cardNumberRef">
        <p>{{ formattedCardNumber }}</p>
      </div>

      <ul class="credit-card__bottom">
        <li ref="cardHolderRef">
          <p>Card Holder</p>
          <p>{{ cardData.cardHolder || NAME_PLACEHOLDER }}</p>
        </li>

        <li ref="expiresRef">
          <p>Expires</p>
          <p :style="{ 'font-size': size }">
            {{ cardData.month || MONTH_PLACEHOLDER }}/{{
              cuttedYear || YEAR_PLACEHOLDER
            }}
          </p>
        </li>
      </ul>
    </div>
    <div v-else class="credit-card__back-side">
      <div class="credit-card__cvv">
        <p>CVV</p>
        <p>{{ hiddenCVV }}</p>
        <div class="credit-card__img">
          <img src="/visa.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { Card, FormSide, InputName } from '@/types'
import {
  CARD_NUMBER_PLACEHOLDER,
  MONTH_PLACEHOLDER,
  NAME_PLACEHOLDER,
  YEAR_PLACEHOLDER,
} from '@/placeholders'
import { useHighlight } from '@/composables/highlight'

// const props = defineProps({
//   visibleSide: { type: String as PropType<FormSide>, required: true },
//   cardData: { type: Object as PropType<Card>, required: true },
//   focusedElement: { type: String as PropType<InputName>, required: false },
// })

export interface CCredictCardProps {
  visibleSide: FormSide
  cardData: Card
  focusedElement?: InputName
}

const props = defineProps<CCredictCardProps>()

const formattedCardNumber = computed(() => {
  let index = 0
  return (
    'XXXX XXXX XXXX XXXX'.replace(
      /X/g,
      () => props.cardData.cardNumber[index++] || '#',
    ) || CARD_NUMBER_PLACEHOLDER
  )
})
const cuttedYear = computed(() => props.cardData.year.slice(-2))
const hiddenCVV = computed(() => '*'.repeat(props.cardData.cvv.length))

const size = computed(() => {
  const regExp = /[1-9]/gm
  const res = `${props.cardData.month}${props.cardData.year}`.match(regExp)
  return res && res.length > 0 ? '21px' : 'inherit'
})

const { cardNumberRef, cardHolderRef, expiresRef, highlightStyles } =
  useHighlight(props)
</script>

<style lang="scss">
.credit-card {
  box-shadow: $shadow;
  width: 321px;
  height: 204px;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: $primary;
  z-index: 2;
  border-radius: $step;
  padding: $step * 2;
  box-sizing: border-box;
  color: #fff;
  overflow: hidden;

  img {
    width: auto;
    height: 30px;
  }

  &__front-side {
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
    height: 100%;
  }

  &__top {
    display: flex;
    justify-content: space-between;
  }

  &__center {
    display: flex;
    align-items: center;

    p {
      text-align: center;
      font-size: 26px;
      letter-spacing: 1px;
      margin: 0;
    }
  }

  &__bottom {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    list-style: none;
    margin: 0;
    padding: 0;

    p {
      margin: 0;
    }

    p:first-child {
      font-size: 14px;
      line-height: 18px;
      color: $divider;
    }

    p:last-child {
      text-transform: uppercase;
    }

    li:first-child {
      max-width: 200px;
      overflow: hidden;
      white-space: nowrap;
    }
  }

  &__back-side {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  &__cvv {
    width: 100%;

    img {
      margin-top: $step;
    }

    p:first-child {
      margin: 0;
      text-align: right;
      color: $divider;
    }

    p:last-of-type {
      background-color: #fff;
      height: 50px;
      width: 100%;
      border-radius: $step;
      margin: 0;
      flex-shrink: 0;
      color: $primaryText;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: $step;
      box-sizing: border-box;
    }
  }

  &__img {
    display: flex;
    justify-content: flex-end;

    img {
      margin-top: $step * 2;
      height: 20px;
    }
  }

  &__wrapper {
    position: absolute;
    border: 2px solid $light-primary;
    z-index: 1;
    border-radius: $step;
    transition: all 0.3s;
  }
}
</style>
