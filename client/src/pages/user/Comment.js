import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Swal from "sweetalert2";
import axios from 'axios';

const Comment = () => {
  const { id } = useParams();
  const [post, setPost] = useState();
  const userName=JSON.parse(localStorage.getItem('user'))
  const[allComment,setAllcomment]=useState([])
  const[refresh,setrefresh]=useState([])
  const [name,setName]=useState('')
  const[body,setBody]=useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(response => {
        setPost(response.data);
      })
      .catch(error => {
        console.error('Error fetching post:', error);
      });
      const saveComment = JSON.parse(localStorage.getItem('comments')) || [];
      const filteredComments = saveComment?.filter((comment) => comment.postId === id);
    axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then(response => {
        console.log(...response.data,...saveComment)
        setAllcomment([...response.data,...filteredComments]);
      })
    
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
    
  
  
        // Check if there is user data in local storage
    const userData = JSON.parse(localStorage.getItem('user'));
    setIsLoggedIn(!!userData); // If userData exists, set isLoggedIn to true, otherwise set it to false
  }, [id,refresh]);
  if (!post) {
    return <div>Loading post...</div>;
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    const saveComment = JSON.parse(localStorage.getItem('comments')) || [];
  const comment={
  postId:id,
  name:userName.name,
  body:body
}
saveComment.push(comment)
setrefresh(saveComment)
 // Save the updated posts array in localStorage
 localStorage.setItem('comments',JSON.stringify(saveComment))
 // Clear the form fields
 setName('')
 setBody('')
 Swal.fire(
  'Comment added!',
  'You clicked the button!',
  'success'
)

  }
    return (
    <>
      <div className=" p-20 flex justify-center items-center  ">
  <article
    key={post.id}
    className="p-6 bg-white rounded-lg border   border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
  >
  
    <div className="flex justify-between items-center mb-5 text-gray-500"></div>
    <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      {post.title}
    </h2>
    <p className="mb-5 font-light text-gray-500 dark:text-gray-400">{post.body}</p>
      {/* comment form */}
      {isLoggedIn &&       <div className="flex  items-center justify-center shadow-lg   mb-4 ">
    <form onSubmit={handleSubmit} className="w-full  bg-white rounded-lg px-4 pt-2">
      <div className="flex flex-wrap -mx-3 mb-6">
    
        <div className="w-full md:w-full px-3 mb-2 mt-2">
          <textarea
            className="bg-gray-100 rounded border  border-gray-400 w-full   h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
            name="body"
            placeholder="Type Your Comment"
            required=""
            defaultValue={""}
            value={body}
            onChange={(e)=>{setBody(e.target.value)}}
          />
        </div>
        <div className="w-full  flex items-start md:w-full px-3">
        
          <div className="-mr-1">
            <input
              type="submit"
              className="bg-white text-gray-700 font-medium py-1 px-3 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
              defaultValue="Post Comment"
            />
          </div>
        </div>
      </div>
    </form>
  </div>}
    
    <div className="">
      {allComment.map((comment) => (
      <div>
          <div key={comment.id} className="bg-gray-200 m-5 p-5  rounded-3xl">
          <h4 className="font-bold">{comment.name}</h4>
          <p className="pt-3">{comment.body}</p>
        </div>
      </div>
      ))}
    </div>
  </article>
</div>
    </>
  );
};

export default Comment;
