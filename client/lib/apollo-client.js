import { ApolloClient, InMemoryCache } from '@apollo/client';


 export default new ApolloClient({
    uri: 'http://localhost:4400/graphql',
    cache: new InMemoryCache(),
  });

 