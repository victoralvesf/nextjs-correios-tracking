export function PageWrapper({ children }) {
  return (
    <div id="bg" className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-center items-start flex-col w-11/12 lg:w-3/5 xl:w-3/6">
        {children}
      </div>
    </div>
  )
}