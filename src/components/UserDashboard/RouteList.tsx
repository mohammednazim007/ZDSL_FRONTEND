import { ReactNode } from 'react'
import { BiBuildings } from 'react-icons/bi'
import { FaRegBookmark } from 'react-icons/fa6'
import { SlSettings } from 'react-icons/sl'
import { LuBook, LuSettings2 } from 'react-icons/lu'
import { GrDocumentTime } from 'react-icons/gr'
import { MdOutlineRealEstateAgent } from 'react-icons/md'

// Define the type for a route
interface Route {
  name: string
  url: string
  icon?: ReactNode
  children?: Route[]
}

const routes: Route[] = [
  {
    name: 'My Property',
    url: '/dashboard/user/my-properties',
    icon: <BiBuildings />,
  },
  {
    name: 'Saved Property',
    url: '/dashboard/user/save-properties',
    icon: <FaRegBookmark />,
  },
  {
    name: 'Installment & Statements',
    url: '/dashboard/user/installment-statements',
    icon: <MdOutlineRealEstateAgent />,
  },
  {
    name: 'Booking & Agreements',
    url: '/dashboard/user/booking-agreements',
    icon: <LuBook />,
  },
  {
    name: 'Appointments',
    url: '/dashboard/user/appointments',
    icon: <GrDocumentTime />,
  },
  {
    name: 'Feedback/Report',
    url: '/dashboard/user/feedback-report',
    icon: <LuSettings2 />,
  },
  {
    name: 'Settings',
    url: '/dashboard/user/settings',
    icon: <SlSettings />,
  },
]

export default routes
