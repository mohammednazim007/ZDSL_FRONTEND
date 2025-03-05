import Link from "next/link"

const NeedAssistance = () => {
  return (
    <>
      <div className="flex justify-between items-center mt-6 p-4">
        <div className="text-left">
          <h3 className="font-semibold text-black">Need Assistance?</h3>
          <p className="">
            Contact our experts for personalized support and guidance.
          </p>
        </div>

        <div>
          <Link
            href="/contact-us"
            className="font-semibold border border-gray-300 px-4 py-2 rounded-md  transition-all hover:bg-gray-100 font-[family-name:var(--font-poppins)]"
          >
            Talk to sales
          </Link>

        </div>
      </div>
    </>
  )
}

export default NeedAssistance
