export const feedbackMutation = `mutation CreateFeedback($firstName: String!, $lastName: String!, $phone: String!, $email: String!, $rating: String!, $project: ID!, $content: String, $file: String) {
  createFeedback(firstName: $firstName, lastName: $lastName, phone: $phone, email: $email, rating: $rating, project: $project, content: $content, file: $file) {
    message
  success
  }
}`

export const reportMutation = `mutation CreateReport($firstName: String!, $lastName: String!, $phone: String!, $email: String!, $content: String, $file: String) {
  createReport(firstName: $firstName, lastName: $lastName, phone: $phone, email: $email, content: $content, file: $file) {
    message
  success
  }
}`
