import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

import { Link } from 'react-router-dom'

const Product = ({userIdapp}) => {
  const { id ,itemId} = useParams(); 
  const [title,setTitle]=useState()
  const[loading,setLoading]=useState(true)
const [body,setBody]=useState()
console.log(userIdapp)
console.log(id)
// Access the ID from the URL parameters
const handleSubmit = async (event) => {
  event.preventDefault(); // Prevent the default behavior of the event
  const product={
    phone:title,
    description:body,
    mkhiata_id:itemId,
    uesr_id:userIdapp,
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
  // const handleSubmit=(e)=>{
  //   e.preventDefault();
  //   const product={
  //     photo:product1.photo,
  //     title:title,
  //     body:body
  //   }
  //   axios.post(`http://localhost:5000/eachproduct/${id}`,product)

  //    // Clear the form fields
  //    setTitle('');
  //    setBody('');
  //   //  setrefresh(!refresh)
  //  };
  

const [product1, setproduct1] = useState([]);

useEffect(()=>{
  axios
  .get(`http://localhost:5000/eachproduct/${id}`)
  .then((response) => {
    setproduct1(response.data[0]);
    setLoading(false) // Assuming there is only one user with the given ID
  console.log(product1)
    
  })
  .catch((error) => console.log(error.message));
  // setFilterDataUsers(article)
setLoading(false)
},[])

  return (
    <div>
      {loading?(<div className="relative flex pt-60  justify-center items-center">
  <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500" />
  <img
    src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"
    className="rounded-full h-28 w-28"
  />
</div>
):(
  <section>
    <div className="relative mx-auto max-w-screen-xl pt-28 px-4 py-8">
      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
          <img
            alt="Les Paul"
            src={product1.photo}
            className="aspect-square w-full rounded-xl object-cover"
          />

        </div>
  
        <div className="sticky top-0">
        
  
          <div className="mt-8 flex justify-between">
            <div className="max-w-[35ch] space-y-2">
              <h1 className="text-xl font-bold sm:text-2xl">
                {product1.name}
              </h1>
  

            </div>
  
          </div>
  
          <div className="mt-4">
            <div className="prose max-w-none">
              <p>
              {product1.description}
              </p>
              <p className="text-lg font-bold">JD {product1.price}</p>

            </div>
    
            {/* <button className="mt-2 text-sm font-medium underline">Read More</button> */}
          </div>
          <Link to={`/checkout/${id}/${itemId}`}><button 
      type="button"
      className="inline-block rounded bg-fuchsia-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-fuchsia-300 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
      data-te-ripple-init=""
      data-te-ripple-color="light"
    >
الشراء الان
    </button></Link>
    <div className='pt-20'>
      <h4 className='pb-5'>اذا كنت ترغب بتفصيل نفس القطة مع اختلاف بعض المواصفات املأ النموذج التالي</h4>
    <form onSubmit={handleSubmit}>
  <div className="editor mx-auto w-96 flex flex-col text-gray-800 border bg-white border-gray-300 p-4 shadow-lg max-w-2xl">
    <input
      className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
      spellCheck="false"
      placeholder="Title" 
      type="text"
      value={title}
      onChange={(e)=>{setTitle(e.target.value)}}
    />
    <textarea
      className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"
      spellCheck="false"
      placeholder="Describe everything about this post here"
      defaultValue={""}
      value={body}
      onChange={(e)=>{setBody(e.target.value)}}
/>
     buttons
    <div className="buttons pt-5 flex">
       <div className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto">
        Cancel
      </div>
      <button type="submit" className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500">
        Post
      </button>
    </div>
  </div>
  </form>
  </div>  
        </div>
      
      </div>
    </div>
  </section>
  )
  }
  </div>
  )
}

export default Product