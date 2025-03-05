/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable curly */
function removeFalsyValuesProperty(
  data: Record<string, any> | undefined
): Record<string, any> | undefined {
  // Check if the value is an object (excluding null)
  if (typeof data === 'object' && data !== null) {
    // Recursively sanitize each property of the object
    const sanitizedObject = Object.fromEntries(
      Object.entries(data)
        .filter(([_, value]) => {
          // Filter out falsy values and empty objects or arrays
          return (
            value !== undefined &&
            value !== null &&
            value !== false &&
            value !== 0 &&
            value !== '' &&
            !(typeof value === 'object' && Object.keys(value).length === 0)
          )
        })
        .map(([key, value]) => [key, removeFalsyValuesProperty(value)]) // Recursively sanitize nested objects
    )

    // If the object or array is empty after sanitization, return undefined
    if (Object.keys(sanitizedObject).length === 0) {
      return undefined
    }

    return sanitizedObject
  }

  // If it's not an object, return it only if it's truthy
  return data ? data : undefined
}

export default removeFalsyValuesProperty
