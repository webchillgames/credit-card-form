<template>
  <div class="credit-card">
    <div class="credit-card__wrapper" ref="wrapperRef" :style="styles"></div>

    <div v-if="visibleSide === 'front'" class="credit-card__front-side">
      <div class="credit-card__top">
        <img src="/chip.png" />
        <img v-if="bankImg" :src="'/' + bankImg" />
      </div>

      <div class="credit-card__center" ref="cardNumberRef">
        <p>{{ formattedCardNumber }}</p>
      </div>

      <ul class="credit-card__bottom">
        <li ref="cardHolderRef">
          <p>Card Holder</p>
          <p>{{ formattedCardHolder }}</p>
        </li>

        <li ref="expiresRef">
          <p>Expires</p>
          <p :style="{ 'font-size': size }">
            {{ formattedMonth }}/{{ formattedYear }}
          </p>
        </li>
      </ul>
    </div>

    <div v-else class="credit-card__back-side">
      <div class="credit-card__cvv">
        <p>CVV</p>
        <p><span v-for="s in stars" :key="s">*</span></p>
        <div class="credit-card__img">
          <img v-if="bankImg" :src="'/' + bankImg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { CardOrganizationData, CreditCardInputs, InputName } from '@/types'
import {
  defineProps,
  computed,
  nextTick,
  ref,
  watchEffect,
  type CSSProperties,
} from 'vue'

import { useFormatting } from '@/formatting'

const {
  showFormattedCardHolder,
  showFormattedCardNumber,
  showFormattedYear,
  showFormattedMonth,
} = useFormatting()

type Props = {
  visibleSide: string
  focusedElName?: InputName
  data: CreditCardInputs
  cardOrganization?: CardOrganizationData
}

const props = defineProps<Props>()

const cardNumberRef = ref<HTMLElement>()
const cardHolderRef = ref<HTMLElement>()
const expiresRef = ref<HTMLElement>()
const wrapperRef = ref<HTMLElement>()
const styles = ref<CSSProperties>({})

type ImgType = {
  [k: string]: string
}

const bankImg = computed((): string => {
  if (!props.cardOrganization) {
    return ''
  }

  const dict: ImgType = {
    visa: 'visa.png',
    'american Express': 'american-express.png',
    'diners club': 'diners-club.png',
    jcb: 'jcb.png',
    masterCard: 'mastercard.png',
    discover: 'discover.png',
  }

  return dict[props.cardOrganization.title]
})

const stars = computed(() => props.data.cvv.length)

const size = computed(() => {
  const regExp = /[1-9]/gm
  const res = `${props.data.month}${props.data.year}`.match(regExp)
  return res && res.length > 0 ? '21px' : 'inherit'
})

const formattedCardNumber = computed(() =>
  showFormattedCardNumber(props.data.cardNumber),
)
const formattedYear = computed(() => showFormattedYear(props.data.year))
const formattedMonth = computed(() => showFormattedMonth(props.data.month))
const formattedCardHolder = computed(() =>
  showFormattedCardHolder(props.data.name),
)

watchEffect(() => replaceWrapper(props.focusedElName))

async function replaceWrapper(name?: InputName) {
  if (!name || !wrapperRef.value) {
    return
  }

  const OFFSET = 8

  if (props.visibleSide === 'back') {
    wrapperRef.value.style.display = 'none'
    return
  }

  await nextTick()

  const htmlElement = setElement(name)

  function setElement(el: InputName): HTMLElement | undefined {
    const dict = {
      'card-number': cardNumberRef.value,
      'card-holder': cardHolderRef.value,
      'expiration-date': expiresRef.value,
      cvv: undefined,
    }

    return dict[el]
  }

  if (htmlElement === undefined) {
    return
  }

  styles.value = {
    display: 'block',
    width: htmlElement.clientWidth + OFFSET + 'px',
    height: htmlElement.clientHeight + 'px',
    top: htmlElement.offsetTop + 'px',
    left: htmlElement.offsetLeft - OFFSET + 'px',
  }
}
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
  }
}
</style>
