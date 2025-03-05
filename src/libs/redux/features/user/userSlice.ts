/* eslint-disable curly */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface TUserProperty {
  _id: string
  id: string
  userName: string
  email: string
}

interface TProfileProperty {
  name: {
    firstName: string | null
    lastName: string | null
  }
  profession: string | null
  profilePic: string | null
  contactInfo: {
    phoneNo: string | null
    presentAddress: string | null
  }
}

interface TUserState {
  user: TUserProperty | null
  profile: TProfileProperty | null
  comparedProjects: number
}

const initialState: TUserState = {
  user: null,
  profile: null,
  comparedProjects: 0,
}

// Create the auth slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        user: TUserProperty
        profile: TProfileProperty
      }>
    ) => {
      state.user = action.payload?.user
      state.profile = action.payload?.profile
    },
    clearComparedProjects: (state) => {
      state.comparedProjects = 0
    },
    setComparedProjectsNumber: (state, action: PayloadAction<number>) => {
      state.comparedProjects = action.payload
    },
  },
})

// Action creators
export const { setUser, clearComparedProjects, setComparedProjectsNumber } =
  userSlice.actions

// Reducer export
export default userSlice.reducer
