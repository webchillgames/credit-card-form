<template>
  <div class="credit-card">
    <HighlightWrapper
      ref="wrapperRef"
      :highlightWrapperStyles="highlightWrapperStyles"
    />

    <div v-if="visibleSide === 'front'" class="credit-card__front-side">
      <div class="credit-card__top">
        <img src="/chip.png" />
        <BankImg :cardOrganization="cardOrganization" />
      </div>

      <div class="credit-card__center" ref="cardNumberRef">
        <span v-for="(c, i) in formattedCardNumber" :key="i">
          <Transition name="char">
            <span v-if="c === '#'">#</span>
            <span v-else> {{ c }}</span>
          </Transition>
        </span>
      </div>

      <ul class="credit-card__bottom">
        <li ref="cardHolderRef">
          <p>Card Holder</p>
          <p>{{ formattedCardHolder }}</p>
        </li>

        <li ref="expiresRef" class="credit-card__expires">
          <p>Expires</p>
          <p>
            <span>{{ formattedMonth }}</span>
            <span>/</span>
            <span>{{ formattedYear }}</span>
          </p>
        </li>
      </ul>
    </div>

    <div v-else class="credit-card__back-side">
      <div class="credit-card__cvv">
        <p>CVV</p>
        <p>{{ cvvStars }}</p>
        <div class="credit-card__img">
          <BankImg :cardOrganization="cardOrganization" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type {
  CardOrganizationData,
  CreditCardInputs,
  InputName,
  SideName,
} from '@/types'

import { defineProps, computed, watchEffect } from 'vue'
import { useHighlights } from '@/highlits'
import { useFormatting } from '@/formatting'

import BankImg from '@/elements/BankImg.vue'
import HighlightWrapper from '@/elements/HighlightWrapper.vue'

const {
  showFormattedCardHolder,
  showFormattedCardNumber,
  showFormattedYear,
  showFormattedMonth,
} = useFormatting()

const {
  highlightWrapperStyles,
  replaceWrapper,
  cardNumberRef,
  cardHolderRef,
  expiresRef,
  wrapperRef,
} = useHighlights()

type Props = {
  visibleSide: SideName
  focusedElName?: InputName
  data: CreditCardInputs
  cardOrganization?: CardOrganizationData
}

const props = defineProps<Props>()

const cvvStars = computed(() => {
  let i = 0

  return props.data.cvv.replace(/[1-9]/g, () => {
    return '***'[i++] || '*'
  })
})

const formattedCardNumber = computed(() => {
  return showFormattedCardNumber(props.data.cardNumber).split('')
})
const formattedYear = computed(() => showFormattedYear(props.data.year))
const formattedMonth = computed(() => showFormattedMonth(props.data.month))
const formattedCardHolder = computed(() =>
  showFormattedCardHolder(props.data.name),
)

watchEffect(() => replaceWrapper(props.focusedElName))
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
  background-image: linear-gradient(
    to right top,
    #3f51b5,
    #565eb7,
    #696bb9,
    #7979ba,
    #8987bc
  );
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
    grid-template-rows: 1fr max-content 1fr;
    height: 100%;
  }

  &__top {
    display: flex;
    justify-content: space-between;
  }

  &__center {
    display: flex;
    justify-content: center;

    > span {
      white-space: break-spaces;
      position: relative;
      display: flex;
      font-size: 25px;
      line-height: 27px;
    }
  }

  &__bottom {
    display: grid;
    grid-template-columns: 1fr max-content;
    grid-gap: $step;
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
      overflow: hidden;
      white-space: nowrap;
    }
  }

  &__expires {
    width: 60px;

    p {
      display: flex;
      justify-content: space-between;
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

  @media (max-width: 321px) {
    width: 100%;

    &__center {
      p {
        font-size: 20px;
        line-height: 24px;
      }
    }
  }
}

.char-enter-active,
.char-leave-active {
  transition: all 0.5s;
}

.char-enter-active {
  position: absolute;
}

.char-enter-from {
  transform: translateY(5px);
  opacity: 0;
}

.char-leave-to {
  transform: translateY(-5px);
  opacity: 0;
}
</style>
