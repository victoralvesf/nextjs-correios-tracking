import Head from 'next/head'
import { XCircleIcon } from '@heroicons/react/solid'

import { PageWrapper } from '../PageWrapper'
import { BackButton } from '../BackButton'

import { TrackType } from '../../service/trackService'

export function ErrorStatus({ track }: { track: TrackType }) {
  return (
    <>
      <Head>
        <title>Erro ao consultar encomenda</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <PageWrapper>
        <BackButton />

        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow sm:rounded-lg w-full mt-4">
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
      </PageWrapper>
    </>
  )
}