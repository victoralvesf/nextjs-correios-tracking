import { GetServerSideProps } from "next"
import {
  ArchiveIcon,
  GlobeIcon,
  HomeIcon,
  ExclamationIcon,
  CheckIcon,
  RewindIcon,
  ChevronDoubleUpIcon,
  ChevronLeftIcon,
  XCircleIcon
} from '@heroicons/react/solid'
import Link from 'next/link'
import Head from "next/head"

import { TrackType, getPackageStatus } from '../../service/trackService'

const icons = {
  'postado': <ArchiveIcon className="h-5 w-5 text-white" />,
  'trânsito': <GlobeIcon className="h-5 w-5 text-white" />,
  'saiu': <HomeIcon className="h-5 w-5 text-white" />,
  'tentativa': <ExclamationIcon className="h-5 w-5 text-white" />,
  'entregue': <CheckIcon className="h-5 w-5 text-white" />,
  'ausente': <RewindIcon className="h-5 w-5 text-white" />,
  'default': <ChevronDoubleUpIcon className="h-5 w-5 text-white" />
}

const colors = {
  'postado': 'bg-indigo-500',
  'trânsito': 'bg-yellow-400',
  'saiu': 'bg-blue-500',
  'tentativa': 'bg-red-500',
  'entregue': 'bg-green-500',
  'ausente': 'bg-red-500',
  'default': 'bg-gray-400'
}

function chooseType(text: string) {
  const str = text.toLowerCase()

  switch (true) {
    case str.includes('postado'):
      return 'postado'
    case str.includes('trânsito'):
      return 'trânsito'
    case str.includes('saiu'):
      return 'saiu'
    case str.includes('entregue'):
      return 'entregue'
    case str.includes('tentativa'):
      return 'tentativa'
    case str.includes('ausente'):
      return 'ausente'
    default:
      return 'default'
  }
}

export default function FirstPost({ track }: { track: TrackType }) {
  if (track.isInvalid) {
    return (
      <>
        <Head>
          <title>Erro ao consultar encomenda</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div id="bg" className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-start flex-col w-11/12 lg:w-3/5 xl:w-3/6">

            <div className="flex items-center text-base font-medium text-gray-500 hover:text-gray-700 cursor-pointer">
              <Link href="/">
                <span className="inline-flex items-center">
                  <ChevronLeftIcon className="flex-shrink-0 -ml-1 mr-1 h-5 w-5 text-gray-400" aria-hidden="true" /> Voltar
              </span>
              </Link>
            </div>

            <div className="bg-white overflow-hidden shadow sm:rounded-lg w-full mt-4">
              <div className="px-4 py-5 sm:p-6">
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <XCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-red-800">Não foi possível rastrear o pacote!</h3>
                      <div className="mt-2 text-sm text-red-700">
                        <ul className="list-disc pl-5 space-y-1">
                          {track.error === 'invalid_code' && (
                            <li className="text-base">O código de rastreio informado é inválido.</li>
                          )}
                          {track.error === 'not_found' && (
                            <li className="text-base">O código de rastreio informado não foi encontrado.</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Encomenda | {track.code}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="bg" className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-start flex-col w-11/12 lg:w-3/5 xl:w-3/6">

          <div className="flex items-center text-base font-medium text-gray-500 hover:text-gray-700 cursor-pointer">
            <Link href="/">
              <span className="inline-flex items-center">
                <ChevronLeftIcon className="flex-shrink-0 -ml-1 mr-1 h-5 w-5 text-gray-400" aria-hidden="true" /> Voltar
            </span>
            </Link>
          </div>

          <div className="bg-white overflow-hidden shadow sm:rounded-lg w-full mt-4">
            <div className="px-4 py-5 sm:p-6 flex flex-col lg:flex-row justify-between items-start lg:items-center">
              <div>
                <span className="font-medium text-base text-gray-900">Tipo:</span>
                <p className="text-base text-gray-600">{track.type}</p>
              </div>
              <div className="mt-2 lg:mt-0">
                <span className="font-medium text-base text-gray-900">Código:</span>
                <p className="text-base text-gray-600">{track.code}</p>
              </div>
              <div className="mt-2 lg:mt-0">
                <span className="font-medium text-base text-gray-900">Postagem:</span>
                <p className="text-base text-gray-600">{track.postedAt}</p>
              </div>
              <div className="mt-2 lg:mt-0">
                <span className="font-medium text-base text-gray-900">Última atualização:</span>
                <p className="text-base text-gray-600">{track.postedAt}</p>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow sm:rounded-lg w-full mt-4">
            <div className="px-4 py-5 sm:p-6">
              <ul className="-mb-8">
                {track.tracks.map((item, index) => (
                  <li key={index}>
                    <div className="relative pb-8">
                      {index !== track.tracks.length - 1 ? (
                        <span className="absolute top-4 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span
                            className={"h-10 w-10 rounded-full flex items-center justify-center ring-8 ring-white mt-2 " + colors[chooseType(item.status)]}
                          >
                            {icons[chooseType(item.status)]}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <h4 className="text-sm text-gray-500">{item.locale}</h4>
                            <h3 className="font-medium text-gray-900">{item.status}</h3>
                            <h4 className="text-base text-gray-600">{item.observation}</h4>
                          </div>
                          <div className="text-right text-sm whitespace-nowrap text-gray-500">
                            <span className="font-medium">{item.trackedAt.split(' - ')[0]}</span>
                            <br />
                            <span>{item.trackedAt.split(' - ')[1]}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
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