import { ReactNode, useEffect, useRef } from 'react'

interface OutsideClickHandlerProps {
  onOutsideClick: () => void
  children: ReactNode
  className?: string
}

const OutsideClick: React.FC<OutsideClickHandlerProps> = ({
  onOutsideClick,
  children,
  className,
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      )
        onOutsideClick()
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onOutsideClick])

  return (
    <div ref={wrapperRef} className={className}>
      {children}
    </div>
  )
}

export default OutsideClick
