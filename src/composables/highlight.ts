import type { CCredictCardProps } from '@/components/CreditCard2.vue'
import type { InputName } from '@/types'
import { nextTick, ref, watch, type CSSProperties, type Ref } from 'vue'

export function useHighlight(props: CCredictCardProps) {
  const cardNumberRef = ref<HTMLDivElement>()
  const cardHolderRef = ref<HTMLDivElement>()
  const expiresRef = ref<HTMLDivElement>()
  const elementsDict: Record<InputName, Ref<HTMLDivElement | undefined>> = {
    'card-number': cardNumberRef,
    'card-holder': cardHolderRef,
    'expiration-date': expiresRef,
    cvv: ref(undefined),
  }
  const HORIZONTAL_OFFSET = 8

  const highlightStyles = ref<CSSProperties>({})
  watch(() => props.focusedElement, moveHighlight)

  async function moveHighlight() {
    if (!props.focusedElement) {
      highlightStyles.value = { ...highlightStyles.value, opacity: '0' }
      return
    }

    if (props.visibleSide === 'back') {
      highlightStyles.value = { opacity: 0 }
      return
    }

    await nextTick()

    const element = elementsDict[props.focusedElement]?.value

    if (!element) {
      return
    }

    highlightStyles.value = {
      // display: 'block',
      width: element.clientWidth + HORIZONTAL_OFFSET + 'px',
      height: element.clientHeight + 'px',
      top: element.offsetTop + 'px',
      left: element.offsetLeft - HORIZONTAL_OFFSET + 'px',
      opacity: '1'
    }
  }

  return {
    cardNumberRef,
    cardHolderRef,
    expiresRef,
    highlightStyles,
  }
}
