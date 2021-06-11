import { PageWrapper } from "../components/PageWrapper"
import { BackButton } from "../components/BackButton"

export default function NotFound() {
  return (
    <PageWrapper>
      <BackButton />

      <div className="w-full bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg divide-y divide-gray-200 mt-8">
        <div className="px-4 py-5 sm:p-6 lg:p-8 flex flex-col items-center">
          <img className="w-3/5 mt-8 mb-4" src="/page_not_found.svg" alt="Não encontrada" />

          <h2 className="text-gray-700 dark:text-white font-medium text-2xl lg:text-4xl mt-8 mb-8">Página não encontrada!</h2>
        </div>
      </div>
    </PageWrapper>
  )
}