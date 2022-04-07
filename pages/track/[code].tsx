import { GetServerSideProps } from "next"
import {
  ArchiveIcon,
  GlobeIcon,
  HomeIcon,
  ExclamationIcon,
  CheckIcon,
  RewindIcon,
  ChevronDoubleUpIcon,
  ClipboardCheckIcon,
  LocationMarkerIcon
} from '@heroicons/react/solid'
import Head from "next/head"
import { useEffect } from "react"

import { BackButton } from "../../components/BackButton"
import { PageWrapper } from "../../components/PageWrapper"
import { ErrorStatus } from "../../components/ErrorStatus"

import { getPackageStatus, TrackingType } from '../../service/trackService'

const icons = {
  'postado': <ArchiveIcon className="h-5 w-5 text-white" />,
  'transito': <GlobeIcon className="h-5 w-5 text-white" />,
  'saiu': <HomeIcon className="h-5 w-5 text-white" />,
  'tentativa': <ExclamationIcon className="h-5 w-5 text-white" />,
  'entregue': <CheckIcon className="h-5 w-5 text-white" />,
  'ausente': <RewindIcon className="h-5 w-5 text-white" />,
  'fiscalizacao': <ClipboardCheckIcon className="h-5 w-5 text-white" />,
  'recebido': <LocationMarkerIcon className="h-5 w-5 text-white" />,
  'default': <ChevronDoubleUpIcon className="h-5 w-5 text-white" />
}

const colors = {
  'postado': 'bg-indigo-500',
  'transito': 'bg-yellow-400',
  'saiu': 'bg-blue-500',
  'tentativa': 'bg-red-500',
  'entregue': 'bg-green-500',
  'ausente': 'bg-red-500',
  'fiscalizacao': 'bg-purple-500',
  'recebido': 'bg-pink-600',
  'default': 'bg-gray-400'
}

function chooseType(text: string) {
  const str = text.toLowerCase()

  switch (true) {
    case str.includes('postado'):
      return 'postado'
    case str.includes('trânsito'):
      return 'transito'
    case str.includes('saiu'):
      return 'saiu'
    case str.includes('não entregue'):
      return 'tentativa'
    case str.includes('entregue'):
      return 'entregue'
    case str.includes('tentativa'):
      return 'tentativa'
    case str.includes('ausente'):
      return 'ausente'
    case str.includes('fiscalização'):
      return 'fiscalizacao'
    case str.includes('objeto recebido'):
      return 'recebido'
    default:
      return 'default'
  }
}

export default function FirstPost({ track }: { track: TrackingType }) {

  function saveToLocalStorage(key: string, content: any) {
    localStorage.setItem(key, JSON.stringify(content))
  }

  function sendCodeToRecents(code: string) {
    const localCodes = localStorage.getItem('rastcorreios_recent')

    if (localCodes) {
      const codes: string[] = JSON.parse(localCodes)

      if (localCodes.indexOf(code) === -1) {
        codes.push(code)

        saveToLocalStorage('rastcorreios_recent', codes)
      }
    } else {
      saveToLocalStorage('rastcorreios_recent', [code])
    }
  }

  if (track.isInvalid) {
    return (
      <ErrorStatus track={track} />
    )
  }

  useEffect(() => {
    sendCodeToRecents(track.code)
  }, [])

  return (
    <>
      <Head>
        <title>Encomenda | {track.code}</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <PageWrapper>
        <BackButton />

        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow sm:rounded-lg w-full mt-4">
          <div className="px-4 py-5 sm:p-6 flex flex-col lg:flex-row justify-between items-start lg:items-center">
            <div>
              <span className="font-medium text-base text-gray-900 dark:text-white">Tipo:</span>
              <p className="text-base text-gray-600 dark:text-gray-400">{track.category.name}</p>
            </div>
            <div className="mt-2 lg:mt-0">
              <span className="font-medium text-base text-gray-900 dark:text-white">Código:</span>
              <p className="text-base text-gray-600 dark:text-gray-400">{track.code}</p>
            </div>
            <div className="mt-2 lg:mt-0">
              <span className="font-medium text-base text-gray-900 dark:text-white">Postagem:</span>
              <p className="text-base text-gray-600 dark:text-gray-400">{track.postedAt}</p>
            </div>
            <div className="mt-2 lg:mt-0">
              <span className="font-medium text-base text-gray-900 dark:text-white">Última atualização:</span>
              <p className="text-base text-gray-600 dark:text-gray-400">{track.updatedAt}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow sm:rounded-lg w-full mt-4">
          <div className="px-4 py-5 sm:p-6">
            <ul className="-mb-8">
              {track.events.map((item, index) => (
                <li key={index}>
                  <div className="relative pb-8">
                    {index !== track.events.length - 1 ? (
                      <span className="absolute top-4 left-5 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-600" aria-hidden="true" />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className={`h-10 w-10 mr-2 rounded-full flex items-center justify-center ring-8 ring-white dark:ring-gray-800 mt-3 ${colors[chooseType(item.status)]}`}>
                          {icons[chooseType(item.status)]}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          {item.locality !== null &&
                            <h4 className="text-sm text-gray-500 dark:text-gray-400">{item.locality}</h4>
                          }
                          <h3 className="font-medium text-gray-900 dark:text-white">{item.status}</h3>
                          {item.origin !== null &&
                            <h4 className="text-sm text-gray-500 dark:text-gray-400">
                              <strong className="font-bold">De:</strong> {item.origin}
                            </h4>
                          }
                          {item.destination !== null &&
                            <h4 className="text-sm text-gray-500 dark:text-gray-400">
                              <strong className="font-bold">Para:</strong> {item.destination}
                            </h4>
                          }
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-gray-500 dark:text-white">
                          <span className="font-medium">{item.trackedAt.split(' - ')[0]}</span>
                          <br />
                          <span className="dark:text-gray-400">{item.trackedAt.split(' - ')[1]}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PageWrapper>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const code = String(ctx.params.code)
  const track = await getPackageStatus(code)

  return {
    props: {
      track
    }
  }
}
