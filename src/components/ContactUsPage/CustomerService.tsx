import MiniHeaderWithDesc from '../shared/SubHeader/MiniHeaderWithDesc'
import { exampleContactDataArray } from './BuyAProperty'
import ContactUsCard from './ContactUsCard'

export default function CustomerService() {
  return (
    <section className="my-[6.25rem]">
      <MiniHeaderWithDesc
        header="Customer Service & Consultancy"
        description="Get in touch with our real-estate consultant team."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-7 mt-7">
        {exampleContactDataArray.map((contact, index) => (
          <ContactUsCard
            key={index}
            borderColor="#FF7A85"
            contactData={contact}
          />
        ))}
      </div>
    </section>
  )
}
