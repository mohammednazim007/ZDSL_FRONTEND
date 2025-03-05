import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import routes from './RouteList'
import LogoutBtn from './LogoutBtn'

const Routes = () => {
  const pathName = usePathname()
  const route = useRouter()

  return (
    <div className="mt-10 flex flex-col items-center">
      <div className="w-[80%]">
        <p className="text-sm mb-2">Overview</p>
      </div>
      {routes?.map((routes) => (
        <div
          key={routes.url}
          onClick={() => route.push(routes.url)}
          className="w-full flex justify-center cursor-pointer mt-2"
        >
          <div
            className={`w-[80%] flex items-center justify-between py-2 px-3 rounded-md transition-all duration-300 ease-in-out  hover:bg-[#E59F00] hover:bg-opacity-15
                  ${pathName?.startsWith(routes.url) ? 'bg-[#F3C65D]' : ''}`}
          >
            <div className="flex  items-center space-x-2 text-base">
              {routes.icon}
              <p className="text-sm">{routes.name}</p>
            </div>
          </div>
        </div>
      ))}

      <div className="w-[80%]">
        <LogoutBtn />
      </div>
    </div>
  )
}

export default Routes
