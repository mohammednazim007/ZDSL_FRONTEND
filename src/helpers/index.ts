/* eslint-disable import/prefer-default-export */
export function formatTimestamp(timestamp: number): string {
  const date = new Date(Number(timestamp))

  // Get the components of the date
  const day = date.getDate()
  const month = date.toLocaleString('default', { month: 'long' })
  const year = date.getFullYear()

  // Format hours and minutes
  let hours = date.getHours()
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const ampm = hours >= 12 ? 'PM' : 'AM'

  // Convert 24-hour time to 12-hour format
  hours = hours % 12 || 12 // 0 becomes 12 in 12-hour format

  // Construct the final formatted date string
  return `${day} ${month}, ${year}, ${hours}:${minutes} ${ampm}`
}

export function timeAgo(timestamp: number): string {
  const now = Date.now()
  const diff = now - timestamp

  const minute = 60 * 1000 // milliseconds in a minute
  const hour = 60 * minute // milliseconds in an hour
  const day = 24 * hour // milliseconds in a day
  const week = 7 * day // milliseconds in a week
  const month = 30 * day // rough estimate for a month
  const year = 12 * month // rough estimate for a year

  if (diff < minute) {
    return 'just now'
  } else if (diff < hour) {
    const minutes = Math.floor(diff / minute)
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  } else if (diff < day) {
    const hours = Math.floor(diff / hour)
    return `${hours} hour${hours > 1 ? 's' : ''} ago`
  } else if (diff < week) {
    const days = Math.floor(diff / day)
    return `${days} day${days > 1 ? 's' : ''} ago`
  } else if (diff < month) {
    const weeks = Math.floor(diff / week)
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`
  } else if (diff < year) {
    const months = Math.floor(diff / month)
    return `${months} month${months > 1 ? 's' : ''} ago`
  } else {
    const years = Math.floor(diff / year)
    return `${years} year${years > 1 ? 's' : ''} ago`
  }
}

