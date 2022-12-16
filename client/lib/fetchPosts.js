import {gql} from 'graphql-request'



//GRAPHQL QUEERY
const fetchPosts = gql`
  query Posts {
    topic
    content
    creator{
      id
      name
      email
    }
  }
  `
  
//FETCH FN With NEXT13 CACHING

//SORT FN BY IMAGES

//RETURN RS


export default fetchPosts