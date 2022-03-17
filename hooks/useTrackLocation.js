import { ACTION_TYPES, StoreContext } from '../pages/_app.js'
import { useContext, useState } from 'react'

const useTrackLocation = () => {
  const [locationErrorMsg, setLocationErrorMsg] = useState('')
  //   const [latLong, setLatLong] = useState('')
  const [loading, setLoading] = useState(false)

  const { dispatch } = useContext(StoreContext)

  const success = (position) => {
    const { latitude, longitude } = position.coords
    dispatch({
      type: ACTION_TYPES.SET_LAT_LONG,
      payload: {
        latLong: `${latitude}, ${longitude}`,
      },
    })
    setLoading(false)
  }

  const error = () => {
    setLoading(false)
    setLocationErrorMsg('Unable to retrieve your location')
  }

  const handleTrackLocation = () => {
    setLoading(true)

    if (!navigator.geolocation) {
      setLocationErrorMsg('Geolocation is not supported by your browser')
      setLoading(false)
    } else {
      navigator.geolocation.getCurrentPosition(success, error)
      setLocationErrorMsg('')
    }
  }

  return {
    // latLong,
    handleTrackLocation,
    locationErrorMsg,
    loading,
  }
}

export default useTrackLocation
