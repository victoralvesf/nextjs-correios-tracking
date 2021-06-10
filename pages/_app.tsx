import { AppProps } from 'next/app'

import Router from 'next/router'
import NProgress from 'nprogress'

import 'tailwindcss/tailwind.css'
import '../styles/nprogress.css'
import '../styles/globals.css'

//Binding events. 
NProgress.configure({ showSpinner: true });

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
