import { PhoneNumberListProps } from '@/interface/footer';
import Link from 'next/link';

const PhoneNumberList: React.FC<PhoneNumberListProps> = ({ phoneNumbers }) => {
  console.info(phoneNumbers, "PHONE_NUMBERS");
  

  return (
    <ul className="flex justify-center flex-wrap md:gap-[1.875rem] mt-1 md:text-base text-sm gap-x-4 gap-y-2">
      {phoneNumbers.map(({ value }: any) => (
        <li key={value}>
          <Link
            href={`https://wa.me/${value}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:shadow-lg hover:text-[#E6A206] transition duration-300 ease-in-out"
            aria-label={`WhatsApp contact number ${value}`}
          >
            {value}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default PhoneNumberList;
