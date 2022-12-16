import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4400/graphql',
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
  <ApolloProvider key="apollo-provider" client={client}>
  <Component {...pageProps} />
  </ApolloProvider>
    </>
  )
}

export default MyApp
