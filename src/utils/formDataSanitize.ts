/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-explicit-any */
import xss from 'xss'

const formDataSanitize = (
  formData: Record<string, any>
): Record<string, any> => {
  const sanitizedData: Record<string, any> = {}

  Object.keys(formData).forEach((key) => {
    if (typeof formData[key] === 'string')
      sanitizedData[key] = xss(formData[key])
    else sanitizedData[key] = formData[key] // Keep non-string values
  })

  return sanitizedData
}

export default formDataSanitize
