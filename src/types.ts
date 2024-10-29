export type SideName = 'back' | 'front'

export type CreditCardInputs = {
  month: string
  year: string
  cardNumber: string
  name: string
  cvv: string
}

export type InputName =
  | 'card-number'
  | 'card-holder'
  | 'expiration-date'
  | 'cvv'

export type CardOrganizationData = {
  title: string
  mask: string
}
