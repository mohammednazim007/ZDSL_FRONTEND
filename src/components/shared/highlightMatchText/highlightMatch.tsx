// Utility function to highlight matched text
const highlightMatch = (text: string, query: string): JSX.Element | string => {
  if (!query) return text

  const regex = new RegExp(`(${query})`, 'gi')
  const parts = text.split(regex)

  return (
    <>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <span key={index} style={{ color: '#E9AB1C' }}>
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  )
}
export default highlightMatch
