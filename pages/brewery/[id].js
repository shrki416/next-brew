import { useContext, useEffect, useState } from 'react'

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { StoreContext } from '../_app'
import cls from 'classnames'
import { fetchBreweries } from '/lib/brew'
import styles from '/styles/Brew.module.css'
import { useRouter } from 'next/router'

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

const handleUpvoteButton = () => {
  console.log('upvote')
}

function isEmpty(obj) {
  return obj && Object.keys(obj).length === 0
}

export default function Brewery(initialProps) {
  const router = useRouter()
  const { id } = router.query

  const [brewery, setBreweries] = useState(initialProps.brewery || {})

  const {
    state: { breweries },
  } = useContext(StoreContext)

  useEffect(() => {
    if (isEmpty(initialProps.brewery)) {
      if (breweries.length > 0) {
        const findBrewById = breweries.find((brew) => brew.id === id)
        setBreweries(findBrewById)
      }
    }
  }, [id])

  const { name, city, street, phone, website_url, brewery_type, image } =
    brewery

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>

      <div className={styles.container}>
        <div className={styles.backToHomeLink}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
        </div>
        <div className={styles.col1}>
          <Image
            src={
              image ||
              'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
            }
            width={600}
            height={360}
            className={styles.storeImg}
            alt={name}
          />
        </div>
        <div className={cls('glass', styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/nearMe.svg"
              width="24"
              height="24"
              alt="near me icon"
            />
            <p className={styles.text}>{city}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/places.svg"
              width="24"
              height="24"
              alt="places icon"
            />
            <p className={styles.text}>{street}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/star.svg"
              width="24"
              height="24"
              alt="star icon"
            />
            <p className={styles.text}>{phone}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/star.svg"
              width="24"
              height="24"
              alt="star icon"
            />
            <p className={styles.text}>{website_url}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/star.svg"
              width="24"
              height="24"
              alt="star icon"
            />
            <p className={styles.text}>{brewery_type}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/star.svg"
              width="24"
              height="24"
              alt="star icon"
            />
            <p className={styles.text}>0</p>
          </div>

          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  )
}
