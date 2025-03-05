import { FooterLinkSectionProps } from '@/interface/footer'
import Link from 'next/link'

//======================================================================>>>
const FooterLinkSection: React.FC<FooterLinkSectionProps> = ({
  title,
  links,
}) => (
  <div>
    <h4 className="font-oswald font-normal text-[1.625rem] md:mb-[3rem] mb-4 ">
      {title}
    </h4>
    <ul className="flex flex-col text-base space-y-1">
      {links.map((link: any) => (
        <li key={link?.label}>
          <Link
            href={link?.url}
            className="footer-link font-[family-name:var(--font-poppins)] text-[13px] md:text-[17px]"
          >
            {link?.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
)

export default FooterLinkSection
