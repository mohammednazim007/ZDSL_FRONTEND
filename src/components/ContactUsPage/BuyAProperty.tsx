import MiniHeaderWithDesc from '../shared/SubHeader/MiniHeaderWithDesc'
import ContactUsCard from './ContactUsCard'
export const exampleContactDataArray = [
  {
    name: 'Mr. Fahim Ahmed',
    title: 'Project Manager',
    phone: '+880 17888 11122',
    profileImage: 'https://i.pravatar.cc/150?img=10',
    socialLinks: {
      facebook: 'https://facebook.com/fahimahmed',
      linkedin: 'https://linkedin.com/in/fahimahmed',
      email: 'fahimahmed@example.com',
      instagram: 'https://instagram.com/fahimahmed',
      whatsapp: 'https://wa.me/8801788811122',
    },
  },
  {
    name: 'Ms. Sarah Hossain',
    title: 'HR Manager',
    phone: '+880 19988 22334',
    profileImage: 'https://i.pravatar.cc/150?img=12',
    socialLinks: {
      facebook: 'https://facebook.com/sarahhossain',
      linkedin: 'https://linkedin.com/in/sarahhossain',
      email: 'sarahhossain@example.com',
      instagram: 'https://instagram.com/sarahhossain',
      whatsapp: 'https://wa.me/8801998822334',
    },
  },
  {
    name: 'Mr. Abdullah Khan',
    title: 'Software Engineer',
    phone: '+880 18888 33445',
    profileImage: 'https://i.pravatar.cc/150?img=14',
    socialLinks: {
      facebook: 'https://facebook.com/abdullahkhan',
      linkedin: 'https://linkedin.com/in/abdullahkhan',
      email: 'abdullahkhan@example.com',
      instagram: 'https://instagram.com/abdullahkhan',
      whatsapp: 'https://wa.me/8801888833445',
    },
  },
  {
    name: 'Ms. Ayesha Siddiqua',
    title: 'Marketing Lead',
    phone: '+880 16777 44556',
    profileImage: 'https://i.pravatar.cc/150?img=16',
    socialLinks: {
      facebook: 'https://facebook.com/ayeshasiddiqua',
      linkedin: 'https://linkedin.com/in/ayeshasiddiqua',
      email: 'ayeshasiddiqua@example.com',
      instagram: 'https://instagram.com/ayeshasiddiqua',
      whatsapp: 'https://wa.me/8801677744556',
    },
  },
  {
    name: 'Mr. Tanveer Rahman',
    title: 'UX/UI Designer',
    phone: '+880 15777 55667',
    profileImage: 'https://i.pravatar.cc/150?img=18',
    socialLinks: {
      facebook: 'https://facebook.com/tanveerrahman',
      linkedin: 'https://linkedin.com/in/tanveerrahman',
      email: 'tanveerrahman@example.com',
      instagram: 'https://instagram.com/tanveerrahman',
      whatsapp: 'https://wa.me/8801577755667',
    },
  },
  {
    name: 'Ms. Neela Karim',
    title: 'Data Analyst',
    phone: '+880 14777 66778',
    profileImage: 'https://i.pravatar.cc/150?img=20',
    socialLinks: {
      facebook: 'https://facebook.com/neelakarim',
      linkedin: 'https://linkedin.com/in/neelakarim',
      email: 'neelakarim@example.com',
      instagram: 'https://instagram.com/neelakarim',
      whatsapp: 'https://wa.me/8801477766778',
    },
  },
  {
    name: 'Mr. Arif Hasan',
    title: 'DevOps Engineer',
    phone: '+880 13777 77889',
    profileImage: 'https://i.pravatar.cc/150?img=22',
    socialLinks: {
      facebook: 'https://facebook.com/arifhasan',
      linkedin: 'https://linkedin.com/in/arifhasan',
      email: 'arifhasan@example.com',
      instagram: 'https://instagram.com/arifhasan',
      whatsapp: 'https://wa.me/8801377777889',
    },
  },
  {
    name: 'Ms. Lubna Chowdhury',
    title: 'Quality Assurance',
    phone: '+880 12777 88990',
    profileImage: 'https://i.pravatar.cc/150?img=24',
    socialLinks: {
      facebook: 'https://facebook.com/lubnachowdhury',
      linkedin: 'https://linkedin.com/in/lubnachowdhury',
      email: 'lubnachowdhury@example.com',
      instagram: 'https://instagram.com/lubnachowdhury',
      whatsapp: 'https://wa.me/8801277788990',
    },
  },
]

export default function BuyAProperty() {
  return (
    <>
      <MiniHeaderWithDesc
        header="Buy a property"
        description="Get in touch with our team to purchase a property."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-7 mt-7 ">
        {exampleContactDataArray.map((contact, index) => (
          <ContactUsCard key={index} contactData={contact} />
        ))}
      </div>
    </>
  )
}
