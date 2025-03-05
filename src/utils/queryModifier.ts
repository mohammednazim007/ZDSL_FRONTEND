/* eslint-disable @typescript-eslint/no-explicit-any */

const queryModifier = (
  queryName: string,
  returnFields: string[],
  additionalVariables?: Record<string, any>
): { query: string; variables: Record<string, any> } => {
  // Dynamically construct the query string from the returnFields
  const dynamicReturnFields = returnFields.join('\n')

  // Destructure additionalVariables to extract limit and page
  const { page, limit, ...restVariables } = additionalVariables || {}

  const query = `
      query ${queryName}($limit: Int, $page: Int${
        Object.keys(restVariables).length > 0
          ? ', ' +
            Object.keys(restVariables)
              .map((varName) => `$${varName}: String`)
              .join(', ')
          : ''
      }) {
        ${queryName}(limit: $limit, page: $page${
          Object.keys(restVariables).length > 0
            ? ', ' +
              Object.keys(restVariables)
                .map((varName) => `${varName}: $${varName}`)
                .join(', ')
            : ''
        }) {
          ${dynamicReturnFields}
        }
      }
    `

  return {
    query,
    variables: { page, limit, ...restVariables },
  }
}

export default queryModifier
