import Head from 'next/head'
import Link from 'next/link'

export default function Home({ data }) {
  console.log(data)
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">Brew App</h1>

        {data.map((item) => (
          <div key={item.id}>
            <p>{item.name}</p>
            <p>{item.brewery_type}</p>
            <Link href={item?.website_url || ''}>
              <a>{item.website_url}</a>
            </Link>
          </div>
        ))}
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const response = await fetch(`https://api.openbrewerydb.org/breweries`)
  const data = await response.json()

  return {
    props: {
      data,
    },
  }
}
