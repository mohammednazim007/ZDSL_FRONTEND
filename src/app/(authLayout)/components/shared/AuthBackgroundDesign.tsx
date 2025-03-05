const AuthBackgroundDesign = ({ children }: { children: React.ReactNode }) => {
  return (
    // max-h-screen
    // h-screen
    // overflow-hidden
    // <div className=" relative sm:h-[88.5vh] h-full mt-2 sm:mt-2 bg-[#FBFBFB] w-full  flex justify-center items-center">
    <div className=" h-screen flex justify-center items-center bg-[#f8fcff] py-5 !z-[999]">
      {/* <Image
        src={"/logo.svg"}
        height={100}
        width={400}
        alt="logo"
        className=" h-14"
      /> */}
      {/* left side small circle */}
      {/* <div
        className="w-[1rem] absolute h-[1rem] opacity-50 bg-[#E59F00]
              lg:top-[11.3%] 
              lg:left-[19.7%]             

              md:top-[17%]    
              md:left-[10%]      

              hidden
              md:block
              rounded-lg"
      ></div> */}
      {/* left side big circle */}
      {/* <div  
        className="
              absolute opacity-50 bg-[#F3C65D] 
              lg:w-[2.5rem] 
              md:w-[2rem] 

              lg:h-[2.5rem] 
              md:h-[2rem]
              
              lg:top-[17%] 
              lg:left-[14.6%] 

              md:top-[31%] 
              md:left-[2%]

              hidden
              md:block
              rounded-full"
      ></div> */}

      {/* right side small circle */}

      {/* <div
        className="w-[1rem] absolute h-[1rem] opacity-50 bg-[#E59F00] 
              lg:top-[11.5%] 
              lg:right-[25.8%] 

              md:top-[7%] 
              md:right-[10%]

              hidden
              md:block
              rounded-lg"
      ></div> */}
      {/* right side big circle */}

      {/* <div
        className=" absolute opacity-50 bg-[#F3C65D]
              lg:w-[2.5rem] 
              md:w-[2rem] 

              lg:h-[2.5rem] 
              md:h-[2rem]
              
              
              lg:top-[39.7%] 
              lg:right-[25%] 

              md:top-[36%] 
              md:right-[8%]

              hidden
              md:block
              rounded-full"
      ></div> */}

      {/* near signup button */}
      {/* <div
        className="w-[1rem] absolute h-[1rem] opacity-50 bg-[#E59F00] 
              lg:top-[71%] 
              lg:left-[29%] 

              md:top-[70%] 
              md:left-[20%]

              hidden
              md:block
              rounded-full
              "
      ></div> */}

      {children}
    </div>
  )
}

export default AuthBackgroundDesign
