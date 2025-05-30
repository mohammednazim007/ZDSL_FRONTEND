const formatDateStamp = (timestamp: string | number) => {
  // Convert the timestamp string to a number
  const date = new Date(Number(timestamp))

  // Get day, month, and year
  const day = String(date.getDate()).padStart(2, '0') // Ensure two digits
  const month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-indexed
  const year = date.getFullYear()

  // Return formatted date
  return `${day}-${month}-${year}`
}

export default formatDateStamp
