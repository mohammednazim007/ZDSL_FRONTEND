/* eslint-disable curly */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const PROJECT_TYPE = {
  all: 'all',
  commercial: 'Commercial',
  residential: 'Residential',
}

export const PROJECT_CATEGORY = {
  all: 'all',
  apartment: 'Apartment',
  shop: 'Shop',
  building: 'Building',
  office: 'Office',
}

export interface TFilterState {
  openPropertyFilter: boolean
  openLocationFilter: boolean
  projectType: string[]
  propertyCategory: string[]
  city: string
  price: {
    max: number
    min: number
  }
  flatSize: {
    max: number
    min: number
  }
  bedroom: number
  bathroom: number
  selectProjectTypeAll: boolean
  selectCommercial: boolean
  selectResidential: boolean
  selectProjectCategoryAll: boolean
  selectApartment: boolean
  selectBuilding: boolean
  selectShop: boolean
  selectOffice: boolean
}

// Define the initial state
const initialState: TFilterState = {
  openPropertyFilter: false,
  openLocationFilter: false,
  projectType: [],
  propertyCategory: [],
  city: '',
  price: {
    min: 0,
    max: 0,
  },
  flatSize: {
    min: 0,
    max: 0,
  },
  bedroom: 0,
  bathroom: 0,
  selectProjectTypeAll: false,
  selectCommercial: false,
  selectResidential: false,
  selectProjectCategoryAll: false,
  selectApartment: false,
  selectBuilding: false,
  selectShop: false,
  selectOffice: false,
}

// Create the auth slice
const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setOpenPropertyFilter: (state, action: PayloadAction<boolean>) => {
      state.openPropertyFilter = action.payload
      if (action.payload) {
        state.openLocationFilter = false
      }
    },
    setOpenLocationFilter: (state, action: PayloadAction<boolean>) => {
      state.openLocationFilter = action.payload
      if (action.payload) {
        state.openPropertyFilter = false
      }
    },
    clearAllPropertyFilter: (state) => {
      state.projectType = []
      state.propertyCategory = []
      state.price.min = 0
      state.price.max = 10000
      state.flatSize.min = 0
      state.flatSize.max = 0
      state.bedroom = 0
      state.bathroom = 0
      state.selectProjectTypeAll = false
      state.selectCommercial = false
      state.selectResidential = false
      state.selectProjectCategoryAll = false
      state.selectApartment = false
      state.selectBuilding = false
      state.selectShop = false
      state.selectOffice = false
    },
    setProjectTypeAll: (state, action: PayloadAction<boolean>) => {
      state.selectProjectTypeAll = action.payload
      state.selectCommercial = action.payload
      state.selectResidential = action.payload
      state.projectType = [PROJECT_TYPE.all]
    },
    setSelectCommercial: (state, action: PayloadAction<boolean>) => {
      state.selectCommercial = action.payload
      if (action.payload) {
        if (!state.projectType?.includes(PROJECT_TYPE.commercial)) {
          state.projectType = [...state.projectType, PROJECT_TYPE.commercial]
        }
      } else {
        state.selectProjectTypeAll = false
        const filteredProjectTypes = state.projectType?.filter(
          (item) => item !== PROJECT_TYPE.commercial
        )
        state.projectType = filteredProjectTypes
      }
    },
    setSelectResidential: (state, action: PayloadAction<boolean>) => {
      state.selectResidential = action.payload
      if (action.payload) {
        if (!state.projectType?.includes(PROJECT_TYPE.residential)) {
          state.projectType = [...state.projectType, PROJECT_TYPE.residential]
        }
      } else {
        state.selectProjectTypeAll = false
        const filteredProjectTypes = state.projectType?.filter(
          (item) => item !== PROJECT_TYPE.residential
        )
        state.projectType = filteredProjectTypes
      }
    },
    setSelectProjectCategoryAll: (state, action: PayloadAction<boolean>) => {
      state.selectProjectCategoryAll = action.payload
      state.selectApartment = action.payload
      state.selectBuilding = action.payload
      state.selectShop = action.payload
      state.selectOffice = action.payload
      state.propertyCategory = [PROJECT_CATEGORY.all]
    },
    setSelectApartment: (state, action: PayloadAction<boolean>) => {
      state.selectApartment = action.payload
      if (!action.payload) {
        state.selectProjectCategoryAll = false
      }

      if (action.payload) {
        if (!state.propertyCategory?.includes(PROJECT_CATEGORY.apartment)) {
          state.propertyCategory = [
            ...state.propertyCategory,
            PROJECT_CATEGORY.apartment,
          ]
        }
      } else {
        state.selectProjectCategoryAll = false
        const filteredProjectCategories = state.propertyCategory?.filter(
          (item) => item !== PROJECT_CATEGORY.apartment
        )
        state.propertyCategory = filteredProjectCategories
      }
    },
    setSelectBuilding: (state, action: PayloadAction<boolean>) => {
      state.selectBuilding = action.payload

      if (action.payload) {
        if (!state.propertyCategory?.includes(PROJECT_CATEGORY.building)) {
          state.propertyCategory = [
            ...state.propertyCategory,
            PROJECT_CATEGORY.building,
          ]
        }
      } else {
        state.selectProjectCategoryAll = false
        const filteredProjectCategories = state.propertyCategory?.filter(
          (item) => item !== PROJECT_CATEGORY.building
        )
        state.propertyCategory = filteredProjectCategories
      }
    },
    setSelectShop: (state, action: PayloadAction<boolean>) => {
      state.selectShop = action.payload

      if (action.payload) {
        if (!state.propertyCategory?.includes(PROJECT_CATEGORY.shop)) {
          state.propertyCategory = [
            ...state.propertyCategory,
            PROJECT_CATEGORY.shop,
          ]
        }
      } else {
        state.selectProjectCategoryAll = false
        const filteredProjectCategories = state.propertyCategory?.filter(
          (item) => item !== PROJECT_CATEGORY.shop
        )
        state.propertyCategory = filteredProjectCategories
      }
    },
    setSelectOffice: (state, action: PayloadAction<boolean>) => {
      state.selectOffice = action.payload

      if (action.payload) {
        if (!state.propertyCategory?.includes(PROJECT_CATEGORY.office)) {
          state.propertyCategory = [
            ...state.propertyCategory,
            PROJECT_CATEGORY.office,
          ]
        }
      } else {
        state.selectProjectCategoryAll = false
        const filteredProjectCategories = state.propertyCategory?.filter(
          (item) => item !== PROJECT_CATEGORY.office
        )
        state.propertyCategory = filteredProjectCategories
      }
    },
    setMinPrice: (state, action: PayloadAction<number>) => {
      state.price.min = action.payload
    },
    setMaxPrice: (state, action: PayloadAction<number>) => {
      state.price.max = action.payload
    },
    setMinSize: (state, action: PayloadAction<number>) => {
      state.flatSize.min = action.payload
    },
    setMaxSize: (state, action: PayloadAction<number>) => {
      state.flatSize.max = action.payload
    },
    setBedroom: (state, action: PayloadAction<number>) => {
      state.bedroom = action.payload
    },
    setBathroom: (state, action: PayloadAction<number>) => {
      state.bathroom = action.payload
    },
  },
})

// Action creators
export const {
  setOpenPropertyFilter,
  setOpenLocationFilter,
  clearAllPropertyFilter,
  setProjectTypeAll,
  setSelectCommercial,
  setSelectResidential,
  setSelectProjectCategoryAll,
  setSelectApartment,
  setSelectBuilding,
  setSelectShop,
  setSelectOffice,
  setMinPrice,
  setMaxPrice,
  setMinSize,
  setMaxSize,
  setBedroom,
  setBathroom,
} = filterSlice.actions

// Reducer export
export default filterSlice.reducer
