'use client'
import BackButton from '@/components/shared/back-buttom/BackButton'
import MyProperty from '@/components/UserDashboard/MyProperty/MyProperty'

const MyProperties = () => {
  return (
    <div>
      <BackButton title="My Properties" />
      <MyProperty />
    </div>
  )
}

export default MyProperties
