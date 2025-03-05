'use client'
interface ButtonProps {
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  children: React.ReactNode
  disabled?: boolean
}
const Button: React.FC<ButtonProps> = ({
  type,
  onClick,
  children,
  disabled,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="font-[family-name:var(--font-oswald)] bg-gradient-to-r from-[#E59F00] to-[#F3C65D] hover:from-[#F3C65D] hover:to-[#E59F00] transition-all duration-900 rounded-[5px] md:py-3 py-1 px-2 md:px-4 font-[500]"
    >
      {children}
    </button>
  )
}

export default Button
