/* eslint-disable import/prefer-default-export */
export const applyJobMutation = `
                mutation CreateJobApply(
                  $firstName: String!,
                  $lastName: String!,
                  $phoneNumber: String!,
                  $email: String!,
                  $coverLater: String!,
                  $uploadCV: String!,
                  $jobId: ID
                ) {
                  createJobApply(
                    firstName: $firstName,
                    lastName: $lastName,
                    phoneNumber: $phoneNumber,
                    email: $email,
                    coverLater: $coverLater,
                    uploadCV: $uploadCV,
                    jobId: $jobId
                  ) {
                    success
                    message
                  }
                }
              `