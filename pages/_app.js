import '../styles/globals.css'

import { createContext, useReducer } from 'react'

export const StoreContext = createContext()

export const ACTION_TYPES = {
  SET_LAT_LONG: 'SET_LAT_LONG',
  SET_BREWERIES: 'SET_BREWERIES',
}

export const storeReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LAT_LONG:
      return {
        ...state,
        latLong: action.payload.latLong,
      }
    case ACTION_TYPES.SET_BREWERIES:
      return {
        ...state,
        breweries: action.payload.breweries,
      }
    default:
      return state
  }
}

const StoreProvider = ({ children }) => {
  const initialState = {
    latLong: '',
    breweries: [],
  }

  const [state, dispatch] = useReducer(storeReducer, initialState)

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  )
}

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  )
}

export default MyApp
