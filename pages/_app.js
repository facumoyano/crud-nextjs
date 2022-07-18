import { ChakraProvider } from '@chakra-ui/react'
import Layout from '../components/Layout'
import CrudProvider from '../context/CrudProvider'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  
  return (
    <ChakraProvider>
      <CrudProvider>
        <Layout>
          <Component {...pageProps} />
       </Layout>
      </CrudProvider>
    </ChakraProvider>
  )
}

export default MyApp
