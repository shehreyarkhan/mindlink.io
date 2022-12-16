'use client'
import '../../styles/globals.css'
import { ApolloProvider, gql } from '@apollo/client';
import {client} from '../../lib/apollo-client'

export default function HomepageLayout({
  children
}) {

 
  
  return (
        <div className="max-w-6xl mx-auto">
        <ApolloProvider client={client}>

          {children}
          </ApolloProvider>
        </div>
  )
}
