import Link from 'next/link'
import { ChevronRightIcon, XIcon } from '@heroicons/react/solid';
import { useEffect, useState, memo } from 'react';

const RecentSearchs = memo(() => {
  const [recentCodes, setRecentCodes] = useState([] as string[])

  useEffect(() => {
    const codes = localStorage.getItem('rastcorreios_recent')

    if (codes) {
      setRecentCodes([...JSON.parse(codes)])
    }
  }, [])

  function removeCodeFromRecents(code: string) {
    const localCodes = localStorage.getItem('rastcorreios_recent')

    if (localCodes) {
      const codes: string[] = JSON.parse(localCodes)
      const indexPosition = codes.indexOf(code)

      if (indexPosition > -1) {
        codes.splice(indexPosition, 1)

        localStorage.setItem('rastcorreios_recent', JSON.stringify(codes))
        setRecentCodes([...codes])
      }
    }
  }

  return (
    <>
      {recentCodes.length > 0 && (
        <div className="w-full">
          <h3 className="mt-6 mb-6 text-center text-2xl lg:text-3xl font-extrabold text-gray-700 dark:text-white">Recentes</h3>


          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {recentCodes.map((code, index) => (
              <div className="relative" key={index}>
                <button
                  className="py-1 px-1 absolute z-10 right-2 top-2 rounded-full cursor-pointer outline-none focus:outline-none hover:bg-gray-200 dark:hover:bg-black"
                  title={`Remover o objeto ${code} dos recentes`}
                  onClick={() => removeCodeFromRecents(code)}
                >
                  <XIcon
                    className="flex-shrink-0 h-4 w-4 text-gray-600 dark:text-white"
                    aria-hidden="true"
                  />
                </button>
                <Link href={`/track/${code}`} >
                  <li
                    className="flex items-center justify-start text-gray-600 font-medium text-sm lg:text-base relative rounded-lg border border-white dark:border-gray-800 bg-white dark:bg-gray-800 px-6 py-5 shadow-sm space-x-3 hover:border-indigo-500 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 dark:text-white cursor-pointer"
                    title={`Rastrear objeto ${code}`}
                  >
                    <span>{code}</span>
                    <ChevronRightIcon className="flex-shrink-0 -ml-1 mr-1 h-5 w-5" aria-hidden="true" />
                  </li>
                </Link>
              </div>
            ))}
          </ul>
        </div>
      )}
    </>
  )
})

export default RecentSearchs