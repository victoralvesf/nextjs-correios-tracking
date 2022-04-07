import { FormEvent, useCallback, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { XCircleIcon } from '@heroicons/react/solid'

import RecentSearchs from '../components/RecentSearchs'

export default function Home() {
  const [trackCode, setTrackCode] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(false)
  const [isCodeValid, setIsCodeValid] = useState(true)
  const router = useRouter()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setBtnDisabled(true)
    router.push(`/track/${trackCode}`)
  }

  const handleChange = useCallback((e: FormEvent<HTMLInputElement>) => {
    const upCaseText = e.currentTarget.value.toUpperCase()
    const isTextValid = isValidOrderCode(upCaseText)

    setIsCodeValid(isTextValid)
    setBtnDisabled(!isTextValid)

    setTrackCode(upCaseText)
  }, [trackCode])

  function isValidOrderCode(code: string): boolean {
    return /^[A-Z]{2}[0-9]{9}[A-Z]{2}$/.test(code)
  }

  return (
    <div id="bg" className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-center items-center flex-col w-11/12 lg:w-3/5 xl:w-3/6">
        <Head>
          <title>Rastreie sua encomenda</title>
          <meta name="language" content="pt-br" />
          <meta charSet="utf-8" />
          <link rel="icon" href="/favicon.svg" />
          <meta name="title" content="Rastreio Correios | Rastreio suas encomendas nos Correios" />
          <meta name="description" content="Rastreie suas encomendas nos Correios de forma simples e rápida" />
          <meta name="robots" />
          <meta name="googlebot" />
          <meta name="googlebot" content="notranslate" />
          <meta name="google-site-verification" content="lFE3UhUXnv1-aDlbr2Qmf8OB721lESi49FcihsNx24A" />
          <meta name="keywords" content="correios, rastreio, brasil, rastrear correios, encomendas, correios brasil, rastreamento, sro, tracking, api correios, correio, rastreio de pacotes, track" />
        </Head>

        <img
          className="mx-auto h-8 lg:h-12 w-auto"
          src="/tracking.svg"
          alt="Pacote"
        />

        <h2 className="mt-4 mb-4 text-center text-3xl lg:text-5xl font-extrabold text-gray-700 dark:text-white">Rastreie sua encomenda</h2>

        <div className="w-full bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg divide-y divide-gray-200 mt-8">
          <div className="px-4 py-5 sm:p-6 lg:p-8">
            <form onSubmit={e => handleSubmit(e)}>
              <input
                type="text"
                name="tracking"
                className="shadow-sm dark:text-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 focus:border-indigo-500 block w-full text-sm border-gray-300 dark:border-gray-600 rounded-md lg:h-16 lg:text-lg"
                placeholder="Informe o código de rastreio"
                value={trackCode}
                onChange={handleChange}
                required
              />

              {!isCodeValid &&
                <div className="flex flex-row items-center mt-4">
                  <XCircleIcon className="h-6 w-6 text-red-400 mr-2" />
                  <span className="text-red-400 font-sm">O código informado é inválido!</span>
                </div>
              }

              <button
                type="submit"
                className="disabled:opacity-50 disabled:cursor-not-allowed lg:h-16 lg:text-lg w-full mt-4 flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={btnDisabled || trackCode.length === 0}
              >
                Rastrear
              </button>
            </form>
          </div>
        </div>

        <RecentSearchs />
      </div>
    </div >
  )
}
