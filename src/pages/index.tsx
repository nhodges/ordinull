import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'
import { url } from 'inspector'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [inscriptions, setInscriptions] = useState([])

  async function fetchInscriptions() {
    console.log('fetching')
    try {
      const response = await fetch('/api/inscriptions', {
        method: 'GET',
        headers: {
          "content-type": "application/json"
        }
      })
      const data = await response.json()
      console.log('data', data)
      setInscriptions(data)
    } catch(e) {
      console.error('Could not fetch Ordinals.')
    }
  }

  useEffect(() => {
    fetchInscriptions()
    let interval: any = setInterval(() => {
      fetchInscriptions()
    }, 30 * 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Inscription Viewer</title>
        <meta name="description" content="Check out the most recent Ordinal Inscriptions. By @inurinternet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="grid">
        {inscriptions.length > 0 && inscriptions.map((inscription, idx) => {
          return (
            <a key={idx} className="tile fade-in" href={`https://ordinals.com/inscription/${inscription}`} target="_blank" rel="noreferrer">
              <iframe scrolling='no' loading="lazy" src={`https://ordinals.com/preview/${inscription}`} />
              {/* <img src={`https://ordinals.com/preview/${inscription}`} /> */}
            </a>
          )
        })}
      </main>
      <footer className="footer fade-out">
        <div>
          Made with 🖤 by <a className="token" href="https://twitter.com/inurinternet" target="_blank" rel='noreferrer'>@inurinternet</a> &Dagger; Tips Welcome: <span className="cursor-pointer token" onClick={() => { navigator.clipboard.writeText('bc1qjlwxkt5f8ljeqe33wmz7gyqmwhapcy7kect0ty') }}>BTC</span> &bull; <span className="cursor-pointer token" onClick={() => { navigator.clipboard.writeText('0xC04208F289D3842Ac168f2C373b3164E1d872650') }}>ETH</span>
        </div>
      </footer>
    </>
  )
}
