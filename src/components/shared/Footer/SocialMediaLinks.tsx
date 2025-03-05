import Image from 'next/image'
import Link from 'next/link'
import FacebookLogo from '../../../assets/Homepage/Footer/FacebookLogo.svg'
import LinkedInLogo from '../../../assets/Homepage/Footer/LinkdinLogo.svg'
import Xlogo from '../../../assets/Homepage/Footer/Xlogo.svg'
import youtube from '../../../assets/Homepage/Footer/youtube.svg'
import InstragramLogo from '../../../assets/Homepage/Footer/InstragramLogo.svg'

interface SocialMediaProps {
  socialMedia: {
    facebook: string
    linkedin: string
    twitter: string
    youtube: string
    instagram: string
  }
}

const SocialMediaLinks: React.FC<SocialMediaProps> = ({ socialMedia }) => {
  const socialLinks = [
    { href: socialMedia.facebook, alt: 'Facebook', logo: FacebookLogo },
    { href: socialMedia.linkedin, alt: 'LinkedIn', logo: LinkedInLogo },
    { href: socialMedia.twitter, alt: 'Twitter', logo: Xlogo },
    { href: socialMedia.youtube, alt: 'YouTube', logo: youtube },
    { href: socialMedia.instagram, alt: 'Instagram', logo: InstragramLogo },
  ]

  return (
    <>
      {socialLinks.map((link) => (
        <Link
          key={link.alt}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-yellow-500 h-max overflow-hidden"
        >
          <Image
            src={link.logo}
            alt={link.alt}
            width={50} // Specify the desired width
            height={50} // Specify the desired height
            className="w-[50px] h-[50px]"
          />
        </Link>
      ))}
    </>
  )
}

export default SocialMediaLinks
