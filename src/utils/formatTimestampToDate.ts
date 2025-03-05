function formatTimestampToDate(timestamp: string): string {
  // Convert the string timestamp to a number
  const date = new Date(parseInt(timestamp, 10))

  // Extract the day, month, and year
  const day = date.getUTCDate().toString().padStart(2, '0')
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0') // Months are 0-indexed
  const year = date.getUTCFullYear()

  // Return the formatted date
  return `${month}/${day}/${year}`
}

export default formatTimestampToDate
