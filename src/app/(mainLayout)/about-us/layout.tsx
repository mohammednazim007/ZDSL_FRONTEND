// eslint-disable-next-line import/no-extraneous-dependencies
import { Toaster } from 'sonner'

const AboutPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className=" bg-white">{children}</div>
      <Toaster />
    </>
  )
}

export default AboutPageLayout
