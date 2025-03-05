export interface ICareerDummy {
  _id: string
  jobTitle: string
  employmentStatus: string
  jobLocation: string
  salary: string
  experience: string
  gender: string
  applicationDeadline: string
  publishDate: string
  aboutJob: string
  jobCategory: { category: string }[]
  jobTags: { tag: string }[]
  jobResponsibilities: { responsibility: string }[]
  additionalRequirements: { requirement: string }[]
  compensationAndOtherBenefits: { benefit: string }[]
  educationalRequirements: { requirement: string }[]
  workPlace: string
  publishedBy: string // assuming admin ID
  jobApplication: { applicant: string }[] // assuming applicant details
}

export const dummyCareerData: ICareerDummy[] = [
  {
    _id: '1',
    jobTitle: 'Security Manager',
    employmentStatus: 'Full-time',
    jobLocation: 'Gulshan, Dhaka',
    salary: 'Negotiable',
    experience: '5 to 8 years of experience',
    gender: 'Any',
    applicationDeadline: '25 March 2023',
    publishDate: '25 March 2023',
    aboutJob:
      "We are seeking a Security Manager to develop and implement security protocols to protect the company's assets.",
    jobCategory: [{ category: 'Security' }],
    jobTags: [{ tag: 'Security' }, { tag: 'Manager' }],
    jobResponsibilities: [
      { responsibility: 'Prepare architectural design.' },
      { responsibility: 'Respond to emergencies.' },
      { responsibility: 'Maintain security equipment.' },
      { responsibility: 'Monitor CCTV footage.' },
      { responsibility: 'Perform risk assessments.' },
    ],
    additionalRequirements: [
      { requirement: 'Experience with CCTV systems.' },
      { requirement: 'Strong leadership skills.' },
    ],
    compensationAndOtherBenefits: [
      { benefit: 'Pick & Drop facility' },
      { benefit: 'Festival Bonus: 2 (Yearly)' },
    ],
    educationalRequirements: [
      { requirement: 'B-Arch, from a reputed university.' },
    ],
    workPlace: 'Work at office',
    publishedBy: 'admin123', // example admin ID
    jobApplication: [],
  },
  {
    _id: '2',
    jobTitle: 'Assistant Security Manager',
    employmentStatus: 'Full-time',
    jobLocation: 'Banani, Dhaka',
    salary: 'Negotiable',
    experience: '3 to 6 years of experience',
    gender: 'Any',
    applicationDeadline: '25 March 2023',
    publishDate: '25 March 2023',
    aboutJob:
      'The Assistant Security Manager is responsible for ensuring the safety and security of the organization.',
    jobCategory: [{ category: 'Security' }],
    jobTags: [{ tag: 'Assistant' }, { tag: 'Security' }],
    jobResponsibilities: [
      { responsibility: 'Assist in security policy development.' },
      { responsibility: 'Supervise security personnel.' },
      { responsibility: 'Manage security documentation.' },
    ],
    additionalRequirements: [
      { requirement: 'Experience in managing security personnel.' },
      { requirement: 'Knowledge of CCTV operations.' },
    ],
    compensationAndOtherBenefits: [
      { benefit: 'Lunch allowance' },
      { benefit: 'Mobile allowance' },
    ],
    educationalRequirements: [
      { requirement: 'B-Arch from a reputed university.' },
    ],
    workPlace: 'Work at office',
    publishedBy: 'admin124',
    jobApplication: [],
  },
  {
    _id: '3',
    jobTitle: 'CCTV Operations Manager',
    employmentStatus: 'Full-time',
    jobLocation: 'Uttara, Dhaka',
    salary: 'Negotiable',
    experience: '4 to 7 years of experience',
    gender: 'Any',
    applicationDeadline: '25 March 2023',
    publishDate: '25 March 2023',
    aboutJob:
      'We are hiring a CCTV Operations Manager to oversee surveillance systems and security equipment across multiple locations.',
    jobCategory: [{ category: 'Security' }],
    jobTags: [{ tag: 'CCTV' }, { tag: 'Operations' }],
    jobResponsibilities: [
      { responsibility: 'Oversee CCTV system management.' },
      { responsibility: 'Lead a team of CCTV operators.' },
      { responsibility: 'Train staff on CCTV operations.' },
    ],
    additionalRequirements: [
      { requirement: 'Technical knowledge of surveillance systems.' },
      { requirement: 'Leadership skills.' },
    ],
    compensationAndOtherBenefits: [
      { benefit: 'Mobile allowance' },
      { benefit: 'Gratuity Scheme' },
    ],
    educationalRequirements: [{ requirement: 'B-Arch or related degree.' }],
    workPlace: 'Work at office',
    publishedBy: 'admin125',
    jobApplication: [],
  },
  {
    _id: '4',
    jobTitle: 'Crisis Management Specialist',
    employmentStatus: 'Full-time',
    jobLocation: 'Bashundhara, Dhaka',
    salary: 'Negotiable',
    experience: '6 to 10 years of experience',
    gender: 'Any',
    applicationDeadline: '25 March 2023',
    publishDate: '25 March 2023',
    aboutJob:
      'Join our team as a Crisis Management Specialist responsible for planning and executing strategies during critical situations.',
    jobCategory: [{ category: 'Security' }],
    jobTags: [{ tag: 'Crisis' }, { tag: 'Management' }],
    jobResponsibilities: [
      { responsibility: 'Develop crisis management strategies.' },
      { responsibility: 'Train staff on crisis response.' },
      { responsibility: 'Coordinate with law enforcement.' },
    ],
    additionalRequirements: [
      { requirement: 'Proven experience in crisis management.' },
      { requirement: 'Leadership skills.' },
    ],
    compensationAndOtherBenefits: [
      { benefit: 'Gratuity Scheme' },
      { benefit: 'Lunch provided' },
    ],
    educationalRequirements: [
      { requirement: "Bachelor's degree in security management." },
    ],
    workPlace: 'Work at office',
    publishedBy: 'admin126',
    jobApplication: [],
  },
  {
    _id: '5',
    jobTitle: 'Access Control Systems Manager',
    employmentStatus: 'Full-time',
    jobLocation: 'Motijheel, Dhaka',
    salary: 'Negotiable',
    experience: '5 to 9 years of experience',
    gender: 'Any',
    applicationDeadline: '25 March 2023',
    publishDate: '25 March 2023',
    aboutJob:
      'As an Access Control Systems Manager, you will be responsible for overseeing and maintaining access control hardware and software.',
    jobCategory: [{ category: 'Security' }],
    jobTags: [{ tag: 'Access Control' }, { tag: 'Manager' }],
    jobResponsibilities: [
      { responsibility: 'Manage access control systems.' },
      { responsibility: 'Monitor and maintain hardware.' },
      { responsibility: 'Train staff on access control protocols.' },
    ],
    additionalRequirements: [
      { requirement: 'Experience in managing access control systems.' },
      { requirement: 'Technical knowledge of access control hardware.' },
    ],
    compensationAndOtherBenefits: [
      { benefit: 'Pick & Drop facility' },
      { benefit: 'Salary Review: Yearly based on performance' },
    ],
    educationalRequirements: [
      { requirement: "Bachelor's degree in a technical field." },
    ],
    workPlace: 'Work at office',
    publishedBy: 'admin127',
    jobApplication: [],
  },
  {
    _id: '6',
    jobTitle: '6 no Dummy data Manager',
    employmentStatus: 'Full-time',
    jobLocation: 'Motijheel, Dhaka',
    salary: 'Negotiable',
    experience: '5 to 9 years of experience',
    gender: 'Any',
    applicationDeadline: '25 March 2023',
    publishDate: '25 March 2023',
    aboutJob:
      'As an Access Control Systems Manager, you will be responsible for overseeing and maintaining access control hardware and software.',
    jobCategory: [{ category: 'Security' }],
    jobTags: [{ tag: 'Access Control' }, { tag: 'Manager' }],
    jobResponsibilities: [
      { responsibility: 'Manage access control systems.' },
      { responsibility: 'Monitor and maintain hardware.' },
      { responsibility: 'Train staff on access control protocols.' },
    ],
    additionalRequirements: [
      { requirement: 'Experience in managing access control systems.' },
      { requirement: 'Technical knowledge of access control hardware.' },
    ],
    compensationAndOtherBenefits: [
      { benefit: 'Pick & Drop facility' },
      { benefit: 'Salary Review: Yearly based on performance' },
    ],
    educationalRequirements: [
      { requirement: "Bachelor's degree in a technical field." },
    ],
    workPlace: 'Work at office',
    publishedBy: 'admin127',
    jobApplication: [],
  },
]
