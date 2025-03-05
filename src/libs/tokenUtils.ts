import Cookies from 'js-cookie'

// Set cookie
export const setCookie = (
  name: string,
  value: string,
  expiresInDays: number = 7
) => {
  Cookies.set(name, value, { expires: expiresInDays })
}

// Get cookie
export const getCookie = (name: string): string | undefined => {
  return Cookies.get(name)
}

// Update cookie (essentially the same as setting)
export const updateCookie = (
  name: string,
  newValue: string,
  expiresInDays: number = 7
) => {
  setCookie(name, newValue, expiresInDays) // Overwrites the existing cookie
}

// Remove cookie
export const removeCookie = (name: string) => {
  Cookies.remove(name)
}
