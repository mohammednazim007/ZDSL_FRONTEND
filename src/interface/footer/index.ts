export interface LinkItem {
  name: string
  href: string
}

export interface FooterLinkSectionProps {
  title: string
  links: LinkItem[]
}

export interface PhoneNumberLink {
  value: number
}

export interface PhoneNumberListProps {
  phoneNumbers: PhoneNumberLink[]
}
