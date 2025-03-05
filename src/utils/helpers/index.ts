/* eslint-disable valid-typeof */
export const handleScroll = (elementId: string, NavId: string): void => {
  const element = document.getElementById(elementId)
  const navbar = document.getElementById(NavId)

  if (element && navbar) {
    const yOffset = -navbar.offsetHeight
    if (typeof window !== undefined) {
      const yPosition =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: yPosition, behavior: 'smooth' })
    }
  }
}

export const hexToRGB = (hex: string, opacity: number): string => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)

  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}
