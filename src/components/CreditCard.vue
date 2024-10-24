<template>
  <div class="credit-card">
    <div v-if="visibleSide === 'front'" class="credit-card__front-side">
      <div class="credit-card__top">
        <img src="/chip.png" />
        <img src="/visa.png" />
      </div>

      <div class="credit-card__center">
        <p>{{ cardNumber }}</p>
      </div>

      <ul class="credit-card__bottom">
        <li>
          <p>Card Holder</p>
          <p>{{ name }}</p>
        </li>

        <li>
          <p>Expires</p>
          <p>{{ month }}/{{ year }}</p>
        </li>
      </ul>
    </div>
    <div v-else class="credit-card__back-side">
      <div class="credit-card__cvv">
        <p>CVV</p>
        <p><span v-for="s in stars" :key="s">*</span></p>
        <div class="credit-card__img">
          <img src="/visa.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCardStore } from '@/store/card'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
const { month, year, cardNumber, name, cvv } = storeToRefs(useCardStore())

defineProps({
  visibleSide: { type: String, required: true },
})

const stars = computed(() => cvv.value.length)
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
    p {
      text-align: center;
      font-size: 26px;
      letter-spacing: 1px;
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
}
</style>
