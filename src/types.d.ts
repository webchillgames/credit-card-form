export type InputName =
  | 'card-number'
  | 'card-holder'
  | 'expiration-date'
  | 'cvv'
export type FormSide = 'front' | 'back'
export type Card = {
  cardNumber: string
  cardHolder: string
  month: string
  year: string
  cvv: string
}
