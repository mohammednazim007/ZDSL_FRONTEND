const getSingleCoordinatesByName = async (place: string, id: string) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        place
      )}&format=json&addressdetails=1&limit=1`
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch coordinates for ${place}`)
    }

    const data = await response.json()
    if (data.length > 0) {
      const { lat, lon } = data[0]
      return { place, id, position: [parseFloat(lat), parseFloat(lon)] }
    } else {
      console.error(`No results found for ${place}`)
      return null // Return null if no results found
    }
  } catch (error) {
    console.error(`Error fetching coordinates for ${place}:`, error)
    return null
  }
}
export default getSingleCoordinatesByName
