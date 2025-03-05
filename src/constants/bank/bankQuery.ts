/* eslint-disable import/prefer-default-export */
export const BankQuery = [
    '_id',
    'bankName',
    'logo',
    'maxLoanAmount',
    'interestRate',
    'period',  
]


export const CreateLoanApplyMutation = `
mutation CreateLoanApply(
  $fullName: String!, 
  $phoneNumber: String!, 
  $email: String!, 
  $loanPeriod: String!, 
  $loanAmount: String!, 
  $projectTotalPrice: String!, 
  $projectId: ID!, 
  $unitId: ID!, 
  $bankId: ID!, 
  $description: String
) {
  createLoanApply(
    fullName: $fullName, 
    phoneNumber: $phoneNumber, 
    email: $email, 
    loanPeriod: $loanPeriod, 
    loanAmount: $loanAmount, 
    projectTotalPrice: $projectTotalPrice, 
    projectId: $projectId, 
    unitId: $unitId, 
    bankId: $bankId, 
    description: $description
  ) {
    message
    success
  }
}
`;
// export const BankQuery = `
//   _id
//   bankName
//   logo
//   maxLoanAmount
//   interestRate
//   period
//   isDeleted
//   isActive
// `;
