import BookAVsisitCard from './BookAVisitCard'
import ContactForm from './ContactForm'

export default function ContactAndBookAVisit() {
  return (
    <div className="flex lg:flex-row  justify-between gap-10 lg:gap-2 flex-col px-5 md:px-0  mb-[2rem] lg:mb-[8.5rem] ">
      <div className="basis-1/2 ">
        <ContactForm />
      </div>
      <div className="basis-1/2    lg:pl-[5rem] xl:pl-[9.875rem]">
        <BookAVsisitCard
          path="/"
          title="Book a Visit"
          subTitle="Choose a time that works for you."
        />
      </div>
    </div>
  )
}
