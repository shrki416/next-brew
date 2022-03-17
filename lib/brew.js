import { createApi } from 'unsplash-js'

const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
})

const getListOfBreweryImages = async () => {
  const images = await unsplashApi.search.getPhotos({
    query: 'brewery',
    per_page: 20,
  })
  const unsplashResults = images.response?.results || []
  return unsplashResults.map((result) => result.urls['small'])
}

const getUrlForBreweries = (latLong, limit) => {
  return `https://api.openbrewerydb.org/breweries?by_dist=${latLong}&per_page=${limit}`
}

export const fetchBreweries = async (
  latLong = '40.7128, -74.0060',
  per_page = 9
) => {
  try {
    const images = await getListOfBreweryImages()
    const response = await fetch(getUrlForBreweries(latLong, per_page))
    const breweries = await response.json()

    return breweries.map((brew, index) => {
      return {
        ...brew,
        image: images[index],
      }
    })
  } catch (error) {
    if (!process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY) {
      console.error(
        '🚨 Make sure you setup your API Keys, checkout the docs on GH 🚨'
      )
    }
    console.log(`Something went wrong fetching breweries", ${error}`)
    return []
  }
}
