import BuyAProperty from '@/components/ContactUsPage/BuyAProperty'
import ContactAndBookAVisit from '@/components/ContactUsPage/ContactAndBookAVisit'
import ContactUsBanner from '@/components/ContactUsPage/ContactUsBanner'
import CustomerService from '@/components/ContactUsPage/CustomerService'
import LandOwners from '@/components/ContactUsPage/LandOwners'
import Container from '@/components/shared/Container'

export default function ContactUsPage() {
  return (
    <div className="bg-secondary_color">
      <Container>
        <ContactUsBanner />
        <BuyAProperty />
        <LandOwners />
        <CustomerService />
        <ContactAndBookAVisit />
      </Container>
    </div>
  )
}
