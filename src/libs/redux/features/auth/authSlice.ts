/* eslint-disable curly */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

// Define the TUser type
export type TUser = {
  id: string
  role: string
} | null

// Define the auth state type
type TAuthState = {
  user: TUser
  token: string | null
}

// Define the initial state
const initialState: TAuthState = {
  user: null,
  token: null,
}

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: TUser; token: string }>) => {
      const { user, token } = action.payload
      state.user = user
      state.token = token

      // Debugging log to check user before setting
      console.log('Setting user:', user)

      // Save user and token to cookies
      Cookies.set('zdsl_user', JSON.stringify(user), { expires: 7 }) // Expires in 7 days
      Cookies.set('zdsl_accessToken', token, { expires: 7 })
    },
    logOut: (state) => {
      state.user = null
      state.token = null

      // Remove user and token from cookies
      Cookies.remove('zdsl_user')
      Cookies.remove('zdsl_accessToken')
    },
    // Load user and token from cookies when the app starts
    loadUserFromCookies: (state) => {
      const user = Cookies.get('zdsl_user')
      const token = Cookies.get('zdsl_accessToken')

      // Debugging log to check loaded user from cookies
      console.log('Loading user from cookies:', user)

      // Check if the user exists and is valid JSON before parsing
      if (user && user !== 'undefined' && token) {
        try {
          state.user = JSON.parse(user)
          state.token = token
        } catch (error) {
          console.error('Error parsing user from cookies:', error)
          state.user = null
          state.token = null
        }
      }
    },
  },
})

// Action creators
export const { setUser, logOut, loadUserFromCookies } = authSlice.actions

// Reducer export
export default authSlice.reducer

// Usage example to dispatch setUser
// You can dispatch this in your component or useEffect to set user info
