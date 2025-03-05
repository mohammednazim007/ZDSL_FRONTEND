import Container from '../shared/Container'
import ServiceBox from '../shared/DynamicTabs/ServiceBox'

const FaqServiseBox = () => {
  return (
    <>
      <Container>
        <div className="grid grid-cols-1 gap-5 place-items-center xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-4 px-4 md:px-0">
          <ServiceBox title="Buying & Selling Property" isActive={true} />
          <ServiceBox title="Renting & Leasing" />
          <ServiceBox title="Property Management" />
          <ServiceBox title="Real Estate Investments" />
        </div>
      </Container>
    </>
  )
}

export default FaqServiseBox
