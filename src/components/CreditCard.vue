<template>
  <div class="credit-card">
    <div class="credit-card__top">
      <img src="/chip.png" />
      <img src="/visa.png" />
    </div>

    <div class="credit-card__center">
      <p>{{ number }}</p>
    </div>

    <ul class="credit-card__bottom">
      <li>
        <p>Card Holder</p>
        <p>{{ name }}</p>
      </li>

      <li>
        <p>Expires</p>
        <p>MM/YY</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { useCardStore } from '@/store/card'
import { storeToRefs } from 'pinia'
const { number, name } = storeToRefs(useCardStore())
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
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  overflow: hidden;

  &__top {
    display: flex;
    justify-content: space-between;

    img {
      width: auto;
      height: 30px;
    }
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
}
</style>
