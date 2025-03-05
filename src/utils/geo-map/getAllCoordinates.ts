import getSingleCoordinatesByName from './getSingleCoordinatesByName'

// Function to fetch coordinates for all locationsArray
/**
 *
 * @param param0
 * @returns array
 */
const getAllCoordinates = async (
  locationsArray: { place: string; id: string }[]
) => {
  const results = await Promise.all(
    locationsArray.map((location) =>
      getSingleCoordinatesByName(location.place, location.id)
    )
  )

  // Filter out null results and update state
  const validResults = results.filter((result) => result !== null) as {
    place: string
    id: string
    position: [number, number]
  }[]

  return validResults
}
export default getAllCoordinates
