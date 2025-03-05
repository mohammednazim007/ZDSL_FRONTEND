import SubheaderWithImageSvg from '../shared/SubHeaderWithLogo/SubheaderWithImageSvg'

interface FaqBannerProps {
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function FaqBanner({ onSearchChange }: FaqBannerProps) {
  return (
    <div className="max-h-[27.313rem]  py-[10.125rem] flex flex-col justify-center items-center ">
      <div>
        <SubheaderWithImageSvg
          logo="/faq.svg"
          title="Frequently Ask Question"
          subtitle="Have a question? We're here to help."
        />
      </div>
      <div className="relative  md:w-[33.25rem] w-[95%] lg:mt-[2.234rem] mt-[1.5rem] bg-[#FFFFFF] ">
        <input
          required
          type="search"
          name="search"
          placeholder="Search"
          onChange={onSearchChange}
          className={` placeholder-[#707070]  placeholder:text-base text-[16px]  bg-[#FFFFFF]  border border-[#D9DFE3]  rounded-md h-[3.75rem]  sm:text-sm focus:outline-none ps-[4.5063rem]  md:w-[33rem] w-[100%]  !pl-4 text-black`}
        />
      </div>
    </div>
  )
}
