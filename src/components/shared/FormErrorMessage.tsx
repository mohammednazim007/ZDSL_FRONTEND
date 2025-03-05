const FormErrorMessage = ({
  message,
  className,
}: {
  message?: string
  className?: string
}) => {
  return (
    <span
      className={`absolute -bottom-[22px] left-0 text-red-600 text-sm ${className}`}
    >
      {message || 'This field is required'}
    </span>
  )
}

export default FormErrorMessage
