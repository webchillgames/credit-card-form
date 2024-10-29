import type { CardOrganizationData } from './types'

type CreditCardType = {
  [k: string]: CardOrganizationData
}

export function useFormatting() {
  function showFormattedCardHolder(cardHolder: string): string {
    return cardHolder ? cardHolder : 'Full name'
  }

  function showFormattedCardNumber(cardNumber: string) {
    let currentMask = '#### #### #### ####'

    const mask = getCardOrganizationData(cardNumber)?.mask

    if (mask) {
      currentMask = mask
    }

    let i = 0

    const newStr = currentMask
      .replace(/#/g, (): string => {
        return cardNumber[i++] || '#'
      })
      .trim()

    return newStr
  }

  function showFormattedYear(year: string): string {
    if (!year) {
      return 'YY'
    }
    return String(year).substring(2)
  }

  function showFormattedMonth(month: string): string {
    if (!month) {
      return 'MM'
    }
    return String(month).padStart(2, '0')
  }

  return {
    showFormattedCardHolder,
    showFormattedMonth,
    showFormattedCardNumber,
    showFormattedYear,
  }
}

export function getCardOrganizationData(
  cardNumber: string,
): CardOrganizationData | undefined {
  const americanExpress = {
    title: 'american Express',
    mask: '#### ###### #####',
  }

  const dinersClub = {
    title: 'diners club',
    mask: '#### ###### ####',
  }

  const jcb = {
    title: 'jcb',
    mask: '#### ###### #####',
  }

  const masterCard = {
    title: 'masterCard',
    mask: '#### #### #### ####',
  }

  const discover = {
    title: 'discover',
    mask: '#### #### #### ####',
  }

  const creditCardTypes: CreditCardType = {
    300: dinersClub,
    301: dinersClub,
    302: dinersClub,
    303: dinersClub,
    304: dinersClub,
    305: dinersClub,
    309: dinersClub,
    34: americanExpress,
    35: jcb,
    2131: jcb,
    1800: jcb,
    37: americanExpress,
    4: {
      title: 'visa',
      mask: '#### #### #### ####',
    },
    51: masterCard,
    52: masterCard,
    53: masterCard,
    54: masterCard,
    55: masterCard,
    22: masterCard,
    23: masterCard,
    24: masterCard,
    25: masterCard,
    26: masterCard,
    27: masterCard,
    6011: discover,
    65: discover,
    644: discover,
    645: discover,
    646: discover,
    647: discover,
    648: discover,
    649: discover,
  }

  const objKeys = Object.keys(creditCardTypes)

  const key = objKeys.find(k => cardNumber.startsWith(k))

  return key ? creditCardTypes[key] : undefined
}
