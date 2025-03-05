//** FLAT SIZE */

export interface IFlatSize {
  id: number
  flatSize: string
}

export const FlatSize: IFlatSize[] = [
  {
    id: 1,
    flatSize: '2500 SQFT',
  },
  {
    id: 2,
    flatSize: '3500 SQFT',
  },
  {
    id: 3,
    flatSize: '4000 SQFT',
  },
  {
    id: 4,
    flatSize: '4500 SQFT',
  },
  {
    id: 5,
    flatSize: '5000 SQFT',
  },
]

//** SELECT A LOAN */
export interface ILoan {
  id: number
  loanPeriod: string
}

export const LoanPeriod: ILoan[] = [
  { id: 1, loanPeriod: '1 year' },
  { id: 2, loanPeriod: '2 year' },
  { id: 3, loanPeriod: '3 year' },
  { id: 4, loanPeriod: '4 year' },
]

//**  PROJECT */

export interface IProjectLists {
  id: number
  pr: string
}
export const projectList: IProjectLists[] = [
  {
    id: 1,
    pr: 'Zubion Windy Palace',
  },
  {
    id: 2,
    pr: 'Zubion Happy Morning',
  },
  {
    id: 3,
    pr: 'Zubion Morning Breeze',
  },
  {
    id: 4,
    pr: 'Hannan Homestead',
  },
  {
    id: 5,
    pr: 'Breeze Blows',
  },
]
