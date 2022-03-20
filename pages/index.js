import { ACTION_TYPES, StoreContext } from '../store/brew-store'
import { useContext, useEffect, useState } from 'react'

import Banner from '../components/Banner'
import Card from '../components/Card'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { fetchBreweries } from '../lib/brew'
import styles from '../styles/Home.module.css'
import useTrackLocation from '/hooks/useTrackLocation'

export async function getStaticProps() {
  const breweries = await fetchBreweries()

  return {
    props: {
      breweries,
    },
  }
}

export default function Home(props) {
  const [error, setError] = useState(null)
  const { handleTrackLocation, locationErrorMsg, loading } = useTrackLocation()

  const { dispatch, state } = useContext(StoreContext)
  const { breweries, latLong } = state

  useEffect(async () => {
    if (latLong) {
      try {
        const fetchedBreweries = await fetchBreweries(latLong, 18)
        dispatch({
          type: ACTION_TYPES.SET_BREWERIES,
          payload: {
            breweries: fetchedBreweries,
          },
        })
      } catch (error) {
        setError(error.message)
        console.log(error)
      }
    }
  }, [latLong])

  const handleOnBannerBtnClick = () => {
    handleTrackLocation()
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>NEXT BREW</title>
        <meta
          name="description"
          content="Allows you to look up breweries near you"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText={loading ? 'Locating...' : 'View breweries nearby'}
          handleClick={handleOnBannerBtnClick}
        />
        {locationErrorMsg && <p>Something went wrong: {locationErrorMsg}</p>}
        {error && <p>Something went wrong: {error}</p>}

        {breweries.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Breweries near me</h2>
            <div className={styles.cardLayout}>
              {breweries.map((brewery) => (
                <Card
                  key={brewery.id}
                  name={brewery.name}
                  imgUrl={
                    brewery.image ||
                    'https://images.unsplash.com/photo-1495399396117-a3763646f854?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                  }
                  href={`/brewery/${brewery.id}`}
                />
              ))}
            </div>
          </div>
        )}

        {props.breweries && props.breweries.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>New York Breweries</h2>
            <div className={styles.cardLayout}>
              {props.breweries.map((brewery) => (
                <Card
                  key={brewery.id}
                  name={brewery.name}
                  imgUrl={
                    brewery.image ||
                    'https://images.unsplash.com/photo-1495399396117-a3763646f854?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                  }
                  href={`/brewery/${brewery.id}`}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
