// app/api/auth/callback/route.js

export async function GET(req) {
  const url = new URL(req.url)
  const token = url.searchParams?.get('token')
  console.log('token', token)

  if (token) {
    // Redirect to the home page with the token in query params
    return new Response(null, {
      status: 302,
      headers: {
        Location: `/?token=${token}`,
      },
    })
  } else {
    // Redirect back to home if no token
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/',
      },
    })
  }
}
