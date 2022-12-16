"use client";
import { useQuery, gql } from "@apollo/client";
import { useState, useEffect } from "react";
import PostList from "../../components/PostList"

const App = () => {
  const GET_CONTENTS = gql`
    query {
      contents {
        name
        genre
        title
        result
        id
        creator {
          name
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_CONTENTS);

  const [post, setPost] = useState({});

  useEffect(() => {
    setPost(data);
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  console.log(post);
  // if(data?.contents !== 0)

  return (
    <div>
      <div>
        POST PAGE
        <ul>
          {post !== null ? (
            post?.contents.map((item) => (
              <>
              <li key={item?.id}>

               <PostList post={item}/>
              </li>
              </>
            ))
          ) : (
            <>
              <p>No posts...</p>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default App;
