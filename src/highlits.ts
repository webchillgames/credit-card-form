import { nextTick, ref, type CSSProperties } from 'vue'
import type { InputName } from './types'

export function useHighlights() {
  const cardNumberRef = ref<HTMLElement>()
  const cardHolderRef = ref<HTMLElement>()
  const expiresRef = ref<HTMLElement>()
  const wrapperRef = ref<HTMLElement>()
  const focusedElName = ref<InputName>()
  const highlightWrapperStyles = ref<CSSProperties>({})

  function togglefocusedElName(event: Event) {
    const el = event.target as HTMLInputElement

    if (!el.dataset || !el.dataset.focused) {
      return
    }

    focusedElName.value = el.dataset.focused as InputName
  }

  async function replaceWrapper(name?: InputName) {
    if (!name || !wrapperRef.value) {
      return
    } else if (name === 'cvv') {
      highlightWrapperStyles.value = {
        ...highlightWrapperStyles.value,
        opacity: 0,
      }
      return
    }

    const OFFSET = 8

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

    highlightWrapperStyles.value = {
      opacity: 1,
      width: htmlElement.clientWidth + OFFSET + 'px',
      height: htmlElement.clientHeight + OFFSET + 'px',
      top: htmlElement.offsetTop - OFFSET + 'px',
      left: htmlElement.offsetLeft - OFFSET + 'px',
      display: 'block',
    }
  }

  return {
    replaceWrapper,
    focusedElName,
    togglefocusedElName,
    cardNumberRef,
    cardHolderRef,
    expiresRef,
    wrapperRef,
    highlightWrapperStyles,
  }
}
