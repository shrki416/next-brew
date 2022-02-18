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
        <div className="grid grid-cols-1 gap-5 p-10 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
          {data.map((item) => (
            <div key={item.id}>
              <div className="overflow-hidden rounded shadow-lg">
                <img
                  className="w-full"
                  src="/cheers.jpeg"
                  alt="beer in sunset"
                />
                <div className="px-6 py-4">
                  <div className="mb-2 text-xl font-bold">{item.name}</div>
                  <p className="text-base text-gray-700">
                    {item.street}, {item.city}, {item.state} {item.postal_code}
                  </p>
                  <p className="text-base text-gray-700">{item.country}</p>
                  <p className="text-base text-gray-700">
                    longitude: {item.longitude}, latitude: {item.latitude}
                  </p>
                </div>
                <div className="px-6 pt-4 pb-2">
                  <span className="mr-2 mb-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
                    {item.brewery_type}
                  </span>
                  <span className="mr-2 mb-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
                    {item.phone}
                  </span>
                  <span className="mr-2 mb-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
                    {item.website_url}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
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
