import MiniHeaderWithDesc from '../shared/SubHeader/MiniHeaderWithDesc'
import { exampleContactDataArray } from './BuyAProperty'
import ContactUsCard from './ContactUsCard'

export default function LandOwners() {
  return (
    <section className="mt-[6.25rem] ">
      <MiniHeaderWithDesc
        header="Land Owners"
        description="Get in touch with our team to purchase a property."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-7 mt-7">
        {exampleContactDataArray.map((contact, index) => (
          <ContactUsCard
            key={index}
            borderColor="#008E8E"
            contactData={contact}
          />
        ))}
      </div>
    </section>
  )
}
