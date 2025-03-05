import { StaticImageData } from 'next/image';

export interface Bank {
  id: number;
  logo: string | StaticImageData; // Updated to accept either a string or StaticImageData
  bankName: string; // Bank name
  offer: string; // Offer description
  maxLoanAmount: string; // Maximum loan amount description
  interestRate: string; // Interest rate description
  period: string; // Loan period description
  detailsLink: string; // URL for more details
}



export interface IApplyForBankLoan {
  fullName: string
  phoneNumber: string
  email: string
  description?:string
  loanAmount:string
}

