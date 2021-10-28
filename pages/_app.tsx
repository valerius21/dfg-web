// import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from "@chakra-ui/react";
import { ReactQueryDevtools } from "react-query/devtools";
import Layout from '../components/layout/Layout'
import '../i18n/i18n'
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: false,
      refetchOnReconnect: false,
      staleTime: Infinity
    }
  }
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
export default MyApp
