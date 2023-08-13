// import React from 'react'
// import { useParams } from 'react-router-dom';
// import { useState, useEffect } from "react";
// import axios from "axios";
// import Swal from 'sweetalert2';

// import { Link } from 'react-router-dom'

// const Product = ({userIdapp}) => {
//   const { id ,itemId} = useParams();
//   const [user, setUser] = useState({});
 
//   const [phone,setPhone]=useState()
//   const[allComment,setAllcomment]=useState([])
//   console.log(allComment)
//   console.log(allComment)
//   console.log(allComment)
//   const[refresh,setrefresh]=useState([])
//   // const [name,setName]=useState('')

//   const[loading,setLoading]=useState(true)
// const [body,setBody]=useState()
// const [content,setContent]=useState()

// const handleSubmitcomment= async (e) =>{
//   e.preventDefault()
// const comment={
// user_id:userIdapp,
// product_id:id,
// name:user.username,
// body:content
// }
// setContent('');
// try {
//   const response = await axios.post(`http://localhost:5000/comment`, comment);
//   setrefresh(allComment)

//   // Display success message
//   Swal.fire({
//     icon: 'success',
//     title: 'Success!',
//     text: 'Product has been submitted successfully.',
//   });

//   console.log(response.data);
// } catch (error) {
//   // Display error message
//   Swal.fire({
//     icon: 'error',
//     title: 'Error!',
//     text: 'Failed to submit the product.',
//   });

//   console.error(error.message);
// }
// // setName('')
// setBody('')
// // Swal.fire(
// // 'Comment added!',
// // 'You clicked the button!',
// // 'success'
// // )

// }
// // Access the ID from the URL parameters
// const handleSubmit = async (event) => {
//   event.preventDefault(); // Prevent the default behavior of the event
//   const product={
//     phone:phone,
//     description:body,
//     mkhiata_id:itemId,
//     user_id:userIdapp,
//     photo:product1.photo,
    
//   }

//   try {
//     const response = await axios.post(`http://localhost:5000/requistProduct`, product);

//     // Display success message
//     Swal.fire({
//       icon: 'success',
//       title: 'Success!',
//       text: 'Product has been submitted successfully.',
//     });

//     console.log(response.data);
//   } catch (error) {
//     // Display error message
//     Swal.fire({
//       icon: 'error',
//       title: 'Error!',
//       text: 'Failed to submit the product.',
//     });

//     console.error(error.message);
//   }
// };

  
// const [product1, setproduct1] = useState([]);

// useEffect(()=>{
//   axios
//   .get(`http://localhost:5000/eachproduct/${id}`)
//   .then((response) => {
//     setproduct1(response.data[0]);
//     setLoading(false) // Assuming there is only one user with the given ID
    
//   })
//   .catch((error) => console.log(error.message));
//   // setFilterDataUsers(article)
// setLoading(false)
// },[])
// useEffect(()=>{
//   axios
//   .get(`http://localhost:5000/commentEachProduct/${id}`)
//   .then((response) => {
//     setAllcomment(response.data);
//     setLoading(false) // Assuming there is only one user with the given ID
    
//   })
//   .catch((error) => console.log(error.message));
//   // setFilterDataUsers(article)
// setLoading(false)
// },[refresh])
// useEffect(() => {
//   try {
//     axios.get(`http://localhost:5000/dataUser/${userIdapp}`)
//       .then((response) => {
//         setUser(response.data);
//       })
//       .catch((error) => {
//         console.log(error.message);
//       });
//   } catch (error) {
//     console.log(error.message);
//   }
// }, [userIdapp]);

// const handleReportComment = async (id) => {
//   try {
//     // Send a report for the comment with the given ID
//     await axios.put(`http://localhost:5000/reportComment/${id}`);

//     // Display success message
//     Swal.fire({
//       icon: 'success',
//       title: 'Reported!',
//       text: 'Comment has been reported.',
//     });
//   } catch (error) {
//     // Display error message
//     Swal.fire({
//       icon: 'error',
//       title: 'Error!',
//       text: 'Failed to report the comment.',
//     });

//     console.error(error.message);
//   }
// };

//   return (
//     <div>
//       {loading?(<div className="relative flex pt-60  justify-center items-center">
//   <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500" />
//   <img
//     src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"
//     className="rounded-full h-28 w-28"
//   />
// </div>
// ):(
//   <section>
//     <div className="relative mx-auto max-w-screen-xl pt-28 px-4 py-8">
//       <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
//         <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
//           <img
//             alt="Les Paul"
//             src={product1.photo}
//             className="aspect-square w-full rounded-xl object-cover"
//           />

//         </div>
  
//         <div className="sticky top-0">
        
  
//           <div className="mt-8 flex justify-between">
//             <div className="max-w-[35ch] space-y-2">
//               <h1 className="text-xl font-bold sm:text-2xl">
//                 {product1.name}
//               </h1>
  

//             </div>
  
//           </div>
  
//           <div className="mt-4">
//             <div className="prose max-w-none">
//               <p>
//               {product1.description}
//               </p>
//               <p className="text-lg font-bold">JD {product1.price}</p>

//             </div>
    
//             {/* <button className="mt-2 text-sm font-medium underline">Read More</button> */}
//           </div>
//           <Link to={`/checkout/${id}/${itemId}`}><button 
//       type="button"
//       className="inline-block rounded bg-fuchsia-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-fuchsia-300 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
//       data-te-ripple-init=""
//       data-te-ripple-color="light"
//     >
// الشراء الان
//     </button></Link>
    
//         </div>
      
//       </div>
//     </div>
//   </section>
//   )
//   }
//   <div className='p-48'>
//   <form onSubmit={handleSubmitcomment} className="w-full  bg-white rounded-lg px-4 pt-2">
//       <div className="flex flex-wrap -mx-3 mb-6">
    
//         <div className="w-full md:w-full px-3 mb-2 mt-2">
//           <textarea
//             className="bg-gray-100 rounded border  border-gray-400 w-full   h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
//             name="body"
//             placeholder="اكتب تعليق"
//             required=""
//             defaultValue={""}
//             value={content}
//             onChange={(e)=>{setContent(e.target.value)}}
//           />
//         </div>
//         <div className="w-full  flex items-start md:w-full px-3">
        
//           <div className="-mr-1">
//             <input
//               type="submit"
//               className="bg-fuchsia-400 text-gray-700 font-medium py-1 px-3 border border-fuchsia-400 rounded-lg tracking-wide mr-1 hover:bg-fuchsia-100"
//               value="ارسال"
//             />
//           </div>
//         </div>
//       </div>
//     </form>
//     <div className="">
//       {allComment?.map((comment) => (
//       <div>
//           <div key={comment.id} className="bg-gray-200 m-5 p-2 rounded-3xl">
//           <h4 className="font-bold">{comment.name}</h4>
//           <p className="pt-3">{comment.body}</p>
//           <button onClick={() => handleReportComment(comment.id)} className='mt-3 text-blue-500'>
//               Report
//             </button>
//         </div>
//       </div>
//       ))}
//     </div>
 
//   </div>
//   <div className='pt-20 w-full justify-center bg-purple-100'>
//       <h4 className='pb-5 flex justify-center'>اذا كنت ترغب بتفصيل نفس القطة مع اختلاف بعض المواصفات املأ النموذج التالي</h4>
//     <form className='p-16' onSubmit={handleSubmit}>
//   <div className="editor mx-auto w-96 flex flex-col text-gray-800 border bg-white border-gray-300 p-4 shadow-lg max-w-2xl">
//     <input
//       className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
//       spellCheck="false"
//       placeholder="رقم الهاتف" 
//       type="text"
//       value={phone}
//       onChange={(e)=>{setPhone(e.target.value)}}
//     />
//     <textarea
//       className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"
//       spellCheck="false"
//       placeholder="اكتب الوصف الذي ترغب فيه"
//       defaultValue={""}
//       value={body}
//       onChange={(e)=>{setBody(e.target.value)}}
// />
//     <div className="buttons pt-5 flex">
//       <button type="submit" className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500">
//         ارسال
//       </button>
//     </div>
//   </div>
//   </form>
//   </div> 
//   </div>
//   )
// }

// export default Product
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Product = ({ userIdapp }) => {
  const { id, itemId } = useParams();
  const [user, setUser] = useState({});
  const [product, setProduct] = useState({});
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState('');
  const [phone,setPhone]=useState()
  const [body,setBody]=useState()
  const [product1, setproduct1] = useState([]);
  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/eachproduct/${id}`);
      setProduct(response.data[0]);
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/commentEachProduct/${id}`);
      setComments(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const newComment = {
      user_id: userIdapp,
      product_id: id,
      name: user.username,
      body: commentContent,
    };

    try {
      await axios.post(`http://localhost:5000/comment`, newComment);
      setCommentContent('');

      // Display success message
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Comment has been submitted successfully.',
      });

      // Refresh comments
      fetchComments();
    } catch (error) {
      // Display error message
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to submit the comment.',
      });

      console.error(error.message);
    }
  };
const handleSubmit = async (event) => {
  event.preventDefault(); // Prevent the default behavior of the event
  const product={
    phone:phone,
    description:body,
    mkhiata_id:itemId,
    user_id:userIdapp,
    photo:product1.photo,
    
  }

  try {
    const response = await axios.post(`http://localhost:5000/requistProduct`, product);

    // Display success message
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'Product has been submitted successfully.',
    });

    console.log(response.data);
  } catch (error) {
    // Display error message
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: 'Failed to submit the product.',
    });

    console.error(error.message);
  }
};
  const handleReportComment = async (commentId) => {
    try {
      await axios.put(`http://localhost:5000/reportComment/${commentId}`);

      // Display success message
      Swal.fire({
        icon: 'success',
        title: 'Reported!',
        text: 'Comment has been reported.',
      });
    } catch (error) {
      // Display error message
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to report the comment.',
      });

      console.error(error.message);
    }
  };

  useEffect(() => {
    // Fetch product details
    fetchProduct();

    // Fetch user details
    try {
      axios
        .get(`http://localhost:5000/dataUser/${userIdapp}`)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    } catch (error) {
      console.log(error.message);
    }

    // Fetch comments
    fetchComments();
  }, [id, userIdapp]);

  return (
    <div>
      <section className="mx-auto max-w-screen-xl pt-28 px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="grid grid-cols-2 gap-4">
            <img
              alt="Product"
              src={product.photo}
              className="aspect-square w-full rounded-xl object-cover"
            />
              <div className="sticky top-0">
            <div className="mt-8 flex justify-between">
              <div className="max-w-[35ch] space-y-2">
                <h1 className="text-xl font-bold sm:text-2xl">{product.name}</h1>
              </div>
            </div>
            <div className="mt-4 prose max-w-none">
              <p>{product.description}</p>
              <p className="text-lg font-bold">JD {product.price}</p>
            </div>
            <Link
              to={`/checkout/${id}/${itemId}`}
              className="inline-block rounded bg-fuchsia-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-fuchsia-300 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              data-te-ripple-init=""
              data-te-ripple-color="light"
            >
              الشراء الان
            </Link>
          </div>
          </div>
          <div className="p-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="col-span-1 md:col-span-2">
            <form onSubmit={handleCommentSubmit} className="bg-white rounded-lg px-4 pt-2">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-full px-3 mb-2 mt-2">
                  <textarea
                    className="bg-gray-100 rounded border border-gray-400 w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                    name="body"
                    placeholder="اكتب تعليق"
                    required=""
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                  />
                </div>
                <div className="w-full flex items-start md:w-full px-3">
                  <div className="-mr-1">
                    <input
                      type="submit"
                      className="bg-fuchsia-400 text-gray-700 font-medium py-1 px-3 border border-fuchsia-400 rounded-lg tracking-wide mr-1 hover:bg-fuchsia-100"
                      value="ارسال"
                    />
                  </div>
                </div>
              </div>
            </form>
            <div>
              {comments.map((comment) => (
                // <div key={comment.id} className="bg-gray-200 m-5 p-2 rounded-3xl">
                //   <h4 className="font-bold">{comment.name}</h4>
                //   <p className="pt-3">{comment.body}</p>
                //   <button
                //     onClick={() => handleReportComment(comment.id)}
                //     className="mt-3   text-blue-500"
                //   >
                //     Report
                //   </button>
                // </div>
                <div key={comment.id} className="bg-gray-200 m-5 p-2  flex">
  <div className="flex-grow">
    <h4 className="font-bold ">{comment.name}</h4>
    <hr className='text-black'/>
    <p className="pt-3">{comment.body}</p>
  </div>
  <button
    onClick={() => handleReportComment(comment.id)}
    className="mt-16 items-end text-blue-500 text-sm self-start"
  >
    Report
  </button>
</div>

              ))}
            </div>
          </div>
        </div>
      </div>
        </div>
      </section>

  

      <div className="pt-20 w-full justify-center bg-purple-100">
        <div className='pt-20 w-full justify-center bg-purple-100'>
      <h4 className='pb-5 flex justify-center'>اذا كنت ترغب بتفصيل نفس القطة مع اختلاف بعض المواصفات املأ النموذج التالي</h4>
    <form className='p-16' onSubmit={handleSubmit}>
  <div className="editor mx-auto w-96 flex flex-col text-gray-800 border bg-white border-gray-300 p-4 shadow-lg max-w-2xl">
    <input
      className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
      spellCheck="false"
      placeholder="رقم الهاتف" 
      type="text"
      value={phone}
      onChange={(e)=>{setPhone(e.target.value)}}
    />
    <textarea
      className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"
      spellCheck="false"
      placeholder="اكتب الوصف الذي ترغب فيه"
      defaultValue={""}
      value={body}
      onChange={(e)=>{setBody(e.target.value)}} />
  <div className="buttons pt-5 flex">
      <button type="submit" className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500">
       ارسال
     </button>
   </div>
</div>
 </form>
   </div>
      </div>
    </div>
  );
};

export default Product;
