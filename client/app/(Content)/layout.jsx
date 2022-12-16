'use client'
import '../../styles/globals.css'
import { ApolloProvider, gql } from '@apollo/client';
import client from '../../lib/apollo-client'
import Navbar from '../components/Navbar';
import { Provider } from 'react-redux';
import {store} from '../../store'

export default function ContentLayout({
  children
}) {

  
  return (
        <div className="max-w-6xl mx-auto">
        <ApolloProvider client={client}>
          <Provider store={store}>
          <Navbar/>
          {children}
          </Provider>
          </ApolloProvider>
        </div>
  )
}
