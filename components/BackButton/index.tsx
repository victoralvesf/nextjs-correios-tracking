import Link from 'next/link'
import { ChevronLeftIcon } from '@heroicons/react/solid'

export function BackButton() {
  return (
    <div className="flex items-center text-base font-medium text-gray-500 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer">
      <Link href="/">
        <span className="inline-flex items-center">
          <ChevronLeftIcon className="flex-shrink-0 -ml-1 mr-1 h-5 w-5" aria-hidden="true" /> Voltar
        </span>
      </Link>
    </div>
  );
}