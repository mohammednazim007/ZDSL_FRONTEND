import { AnimatePresence, motion } from 'framer-motion'
import FullScreenMenu from './NavbarManu'

const Menubar = ({
  isOpen,
  handleClose,
}: {
  isOpen: boolean
  handleClose: () => void
}) => {
  if (!isOpen) return <></>

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-screen h-[calc(100vh-40px)] md:h-[calc(100vh-80px)] fixed top-14 md:top-20 left-0 bg-white"
        >
          <FullScreenMenu handleManu={handleClose} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Menubar
