import { ref, watchEffect } from 'vue'
import type { FormSide, InputName } from '@/types'

export function useFocusedInput() {
  const visibleSide = ref<FormSide>('front')

  const focusedElement = ref<InputName>()

  watchEffect(() => {
    visibleSide.value = focusedElement.value === 'cvv' ? 'back' : 'front'
  })

  function setCurrentFocusedInput(inputName: InputName) {
    focusedElement.value = inputName
  }

  function clearFocus() {
    focusedElement.value = undefined
  }

  return {
    visibleSide,
    focusedElement,
    setCurrentFocusedInput,
    clearFocus,
  }
}
