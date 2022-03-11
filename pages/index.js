import Banner from '../components/Banner'
import Card from '../components/Card'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { createApi } from 'unsplash-js'
import styles from '../styles/Home.module.css'

const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
})

const getListOfBreweryImages = async () => {
  const images = await unsplashApi.search.getPhotos({
    query: 'brewery',
    per_page: 40,
  })
  const unsplashResults = images.response?.results || []
  return unsplashResults.map((result) => result.urls['small'])
}

export async function getStaticProps() {
  try {
    const images = await getListOfBreweryImages()
    const response = await fetch(
      `https://api.openbrewerydb.org/breweries?by_state=new_york`
    )
    const breweries = await response.json()

    const data = breweries.map((brew, index) => {
      return {
        ...brew,
        image: images[index],
      }
    })

    console.log(`🍌`, data)

    return {
      props: {
        breweries: data,
      },
    }
  } catch (error) {}
}

export default function Home(props) {
  // console.log(props.breweries)

  const handleOnBannerBtnClick = () => {
    console.log('Hi, banner button')
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
          buttonText="View breweries nearby"
          handleClick={handleOnBannerBtnClick}
        />
        {props.breweries && props.breweries.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>New York State Breweries</h2>
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
