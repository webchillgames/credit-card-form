import { defineStore } from 'pinia'
import { ref } from 'vue'

const NAME_MASK = 'Full name'

export const useCardStore = defineStore('card', () => {
  const number = ref('#### #### #### ####')
  const name = ref(NAME_MASK)

  function changeNumber(n: string) {
    number.value = n
  }

  function changeName(n: string) {
    if (n.length === 0) {
      name.value = NAME_MASK
      return
    }

    name.value = n
  }

  return { name, number, changeNumber, changeName }
})
