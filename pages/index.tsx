import { FormEvent, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Home() {
  const [trackCode, setTrackCode] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(false)
  const router = useRouter()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setBtnDisabled(true)
    router.push(`/track/${trackCode}`)
  }

  return (
    <div id="bg" className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-center items-center flex-col w-11/12 lg:w-3/5 xl:w-3/6">
        <Head>
          <title>Rastreie sua encomenda</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <img
          className="mx-auto h-12 w-auto"
          src="/tracking.svg"
          alt="Pacote"
        />

        <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-700">Rastreie sua encomenda</h2>

        <div className="w-full bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200 mt-8">
          <div className="px-4 py-5 sm:p-6 lg:p-8">
            <form onSubmit={e => handleSubmit(e)}>
              <input
                type="text"
                name="tracking"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-sm border-gray-300 rounded-md lg:h-16 lg:text-lg"
                placeholder="Informe o código de rastreio"
                value={trackCode}
                onChange={e => setTrackCode(e.target.value)}
              />

              <button
                type="submit"
                className="disabled:opacity-50 disabled:cursor-not-allowed lg:h-16 lg:text-lg w-full mt-4 flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={btnDisabled || trackCode.length === 0}
              >
                Rastrear
            </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
