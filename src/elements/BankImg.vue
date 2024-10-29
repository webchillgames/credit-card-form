<template>
  <img v-if="bankImg" :src="'/' + bankImg" />
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue'
import type { CardOrganizationData } from '@/types'

type Props = {
  cardOrganization?: CardOrganizationData
}

const props = defineProps<Props>()

type ImgType = {
  [k: string]: string
}

const bankImg = computed((): string => {
  if (!props.cardOrganization) {
    return 'bank.png'
  }

  const dict: ImgType = {
    visa: 'visa.png',
    'american Express': 'american-express.png',
    'diners club': 'diners-club.png',
    jcb: 'jcb.png',
    masterCard: 'mastercard.png',
    discover: 'discover.png',
  }

  const img = dict[props.cardOrganization.title]

  return img ? img : 'bank.png'
})
</script>
