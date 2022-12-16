
const PostList = ({post}) => {
  return (
      <div  key={post?.id} className="post-list w-max-[200px] bg-zinc-700 p-8 text-start space-y-4 justify-start">
       <table className="">
         <tbody>

        <tr>
        <td>Title: </td>
        </tr>
        <tr>
        <td>Genre: </td>
        </tr>
        <tr>
        <td className="overflow-hidden">Description: </td>
        </tr>
        <tr>
        <td>Name </td>
        <td>
          Shehreyarkhan35
        </td>
        </tr>
         </tbody>
       </table>
      </div>
  )
}

export default PostList