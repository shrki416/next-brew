import { useEffect, useRef } from 'react'

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { fetchBreweries } from '/lib/brew'
import mapboxgl from '!mapbox-gl'
import styles from '/styles/Brew.module.css'
import { useRouter } from 'next/router'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_ACCESS_TOKEN

export async function getStaticProps(staticProps) {
  const params = staticProps.params

  const breweries = await fetchBreweries()
  const findBrewById = breweries.find((brew) => brew.id === params.id)

  return {
    props: {
      brewery: findBrewById ? findBrewById : {},
    },
  }
}

export async function getStaticPaths() {
  const breweries = await fetchBreweries()
  const paths = breweries.map((brewery) => {
    return {
      params: {
        id: brewery.id,
      },
    }
  })
  return {
    paths,
    fallback: true,
  }
}

export default function Brewery(props) {
  console.log(`🍏`, props.brewery)
  const map = useRef(null)
  const mapContainer = useRef(null)

  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (map.current) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [props.brewery.longitude, props.brewery.latitude],
      zoom: 12,
    })
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.col1}>
        <div className={styles.backToHomeLink}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
        <div className={styles.nameWrapper}>
          <h1 className={styles.name}>{props.brewery.name}</h1>
        </div>
        {/* <div>
          <div>
            <div className="sidebar">
              Longitude: {props.brewery.longitude} | Latitude:{' '}
              {props.brewery.latitude} | Zoom: 9
            </div>
            <div ref={mapContainer} className="map-container" />
          </div>
        </div> */}
        <Image
          src={
            props.brewery.image ||
            'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
          }
          width={600}
          height={360}
          className={styles.storeImg}
          alt={props.brewery.name}
        ></Image>
      </div>
    </div>
  )
}
