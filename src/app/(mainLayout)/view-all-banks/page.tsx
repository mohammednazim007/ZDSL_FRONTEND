import Container from '@/components/shared/Container'
import BankCard from '@/components/ViewAllBankPage/BankCard'

export default function ViewAllBankPage() {
  return (
    <Container>
      <div className="grid  my-10  grid-cols-1 px-2 md:grid-cols-2 2xl:grid-cols-3 place-items-center gap-[1rem] ">
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((items, index) => (
          <BankCard key={index} />
        ))}
      </div>
    </Container>
  )
}
