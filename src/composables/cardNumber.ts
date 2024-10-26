import { computed, type Ref } from 'vue'

export function useCardNumber(cardNumber: Ref<string>) {
  const formattedCardNumber = computed(() => {
    let index = 0

    return 'XXXX XXXX XXXX XXXX'
      .replace(/X/g, () => cardNumber.value[index++] || '')
      .trim()
  })

  function onCardNumberChange(e: Event) {
    const targetInput = e.target as HTMLInputElement
    cardNumber.value = targetInput.value.replace(/\D/g, '')
    targetInput.value = formattedCardNumber.value
  }

  return {
    formattedCardNumber,
    onCardNumberChange,
  }
}
