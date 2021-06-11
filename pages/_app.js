import '../styles/globals.css'
import {Provider } from 'next-auth/client'
import Header from '../components/Global/Header'
import Search from '../components/Global/Search'
function MyApp({ Component, pageProps }) {
  return (
    //Make sure every page has the login state
    <Provider >
      <Header/>
      <Search/>
      <main>
        <Component {...pageProps} />
      </main>
    </Provider>
  )
}

export default MyApp
