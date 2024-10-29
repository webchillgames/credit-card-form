import { ref } from 'vue'
import type { InputName } from './types'

export function useHighlights() {
  const focusedElName = ref<InputName>()

  function togglefocusedElName(event: Event) {
    const el = event.target as HTMLInputElement

    if (!el.dataset || !el.dataset.focused) {
      return
    }

    focusedElName.value = el.dataset.focused as InputName
  }

  return { focusedElName, togglefocusedElName }
}
