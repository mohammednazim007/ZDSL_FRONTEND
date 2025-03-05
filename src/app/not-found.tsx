// app/not-found.tsx or pages/404.tsx (depending on whether you're using the App Router or Pages Router in Next.js 14)
import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16 h-screen w-screen">
      <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
        <div className="relative">
          <div className="absolute">
            <div>
              <h1 className="my-2 text-gray-800 font-bold text-2xl">
                Looks like you&apos;ve found the doorway to the great nothing
              </h1>
              <p className="my-2 text-gray-800">
                Sorry about that! Please visit our homepage to get where you
                need to go.
              </p>
              <Link href="/">
                <button className="sm:w-full lg:w-auto my-2 border rounded-md py-4 px-8 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">
                  Take me there!
                </button>
              </Link>
            </div>
          </div>
          <div>
            <Image
              src="https://i.ibb.co/G9DC8S0/404-2.png"
              alt="404 Image"
              width={600}
              height={400}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
      <div>
        <Image
          src="https://i.ibb.co/ck1SGFJ/Group.png"
          alt="Group Image"
          width={500}
          height={500}
          className="w-full h-auto"
        />
      </div>
    </div>
  )
}
