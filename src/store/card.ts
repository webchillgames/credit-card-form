import {
  CARD_NUMBER_PLACEHOLDER,
  NAME_PLACEHOLDER,
  YEAR_PLACEHOLDER,
  MONTH_PLACEHOLDER,
} from '@/placeholders'

import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCardStore = defineStore('card', () => {
  const cardNumber = ref(CARD_NUMBER_PLACEHOLDER)
  const name = ref(NAME_PLACEHOLDER)
  const year = ref<string | number>(YEAR_PLACEHOLDER)
  const month = ref<string | number>(MONTH_PLACEHOLDER)
  const cvv = ref('')

  function changeCardNumber(n: string) {
    cardNumber.value = n
  }

  function changeYear(y: number | string) {
    if (!y) {
      year.value = YEAR_PLACEHOLDER
      return
    }
    year.value = `${y}`.split('').slice(2).join('')
  }

  function changeMonth(m: number | string) {
    if (!m) {
      month.value = MONTH_PLACEHOLDER
      return
    }
    month.value = m
  }

  function changeName(n: string) {
    if (n.length === 0) {
      name.value = NAME_PLACEHOLDER
      return
    }

    name.value = n
  }

  function changeCvv(c: string) {
    cvv.value = c
  }

  return {
    cvv,
    month,
    year,
    name,
    cardNumber,
    changeCardNumber,
    changeName,
    changeYear,
    changeMonth,
    changeCvv,
  }
})
