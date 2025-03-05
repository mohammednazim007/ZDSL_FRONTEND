import ChatMsgSvg from '@/assets/FAQ/ChatMsgSvg.svg'
import Image from 'next/image'

interface ISupportActionBox {
  isRounded?: boolean
}

export default function SupportActionBox({
  isRounded = true,
}: ISupportActionBox) {
  return (
    <>
      <div>
        <div className="pt-16 pb-4  h-max ">
          {' '}
          <div className="relative w-max mx-auto flex items-center justify-center">
            {/* Left Avatar */}
            <div className="absolute z-0 -left-16 flex h-[4.875rem] w-[4.875rem] md:h-[6.875rem] md:w-[6.875rem] shrink-0 select-none items-center justify-center rounded-full bg-gray-100 text-sm font-bold uppercase  border border-white ">
              <Image
                className="rounded-full object-cover object-center"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNPSc22QbBDnRgsaRbc5QiNXY5TUx8JPTvPQ&s"
                alt="Left Avatar"
                layout="fill"
              />
            </div>

            {/* Middle Avatar (slightly raised) */}
            <div className="relative z-10 flex h-[4.875rem] w-[4.875rem] md:h-[6.875rem] md:w-[6.875rem] shrink-0 select-none items-center justify-center rounded-full bg-gray-100 text-sm font-bold uppercase  border border-white  -mt-14">
              {' '}
              <Image
                className="rounded-full object-cover object-center"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSryeuzkFupb5ZZftsUEczWwOz8BOKK0JRvAg&s"
                alt="Middle Avatar"
                layout="fill"
              />
            </div>

            {/* Right Avatar */}
            <div className="absolute z-0 -right-16 flex h-[4.875rem] w-[4.875rem] md:h-[6.875rem] md:w-[6.875rem] shrink-0 select-none items-center justify-center rounded-full bg-gray-100 text-sm font-bold uppercase border border-white  ">
              <Image
                className="rounded-full object-cover object-center"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq3C-Rs5MlRyyxhn1CWL4O-V7YUHrskegM8A&s"
                alt="Right Avatar"
                layout="fill"
              />
            </div>
          </div>
        </div>
        <div
          className={`text-center ${
            isRounded ? 'mt-[2.514rem]' : 'mt-[6.313rem]'
          }`}
        >
          <div className={`px-3 md:px-0 mt-[-3rem] md:mt-[0rem]`}>
            <h1 className={` font-semibold text-[1.52rem] text-black`}>
              Still have question?
            </h1>
            <p className={` mt-2 text-base text-[#7E7E7E] `}>
              Can&apos;t find the answer you&apos;re looking for? Please chat to
              our friendly team.
            </p>
          </div>
        </div>
        <div className=" cursor-pointer col-span-2 mt-[5rem] flex justify-center  ">
          <button
            style={{
              backgroundImage:
                'linear-gradient(360deg, #E59F00 0%, #F3C65D 100%)',
            }}
            className={`relative ${
              isRounded
                ? 'h-[5rem] rounded-full  w-[14.125rem] text-[1.5rem] '
                : ' w-[14.125rem] rounded-md h-[3.75rem] text-base'
            }   text-[0.88rem] md:px-[1.938rem] px-7 md:py-[1.125rem] 
            py-[16px]  bottom-2  font-[600]  text-[#063354]`}
          >
            {isRounded ? 'Chat Now' : 'Contact Now'}
            <span className="absolute -top-10  -right-5  text-white text-xs font-semibold px-2 py-1 rounded-full">
              <Image
                src={ChatMsgSvg} // Use provided logo or fallback to default logo
                width={100}
                height={100}
                alt={'Default Logo'}
                className="h-[3.125rem] w-[3.125rem]"
              />
            </span>
          </button>
        </div>
      </div>
    </>
  )
}
