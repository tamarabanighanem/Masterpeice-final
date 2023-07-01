import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";

import { Link } from 'react-router-dom'

const Product = () => {
  const { id ,itemId} = useParams(); // Access the ID from the URL parameters
  
  console.log(id)
  console.log(id)
  console.log(id)
  console.log(itemId)
  console.log(itemId)
  console.log(itemId)
  console.log(itemId)
  console.log(itemId)

const [product1, setproduct1] = useState([]);

useEffect(()=>{
  axios
  .get(`http://localhost:5000/eachproduct/${id}`)
  .then((response) => {
    setproduct1(response.data[0]); // Assuming there is only one user with the given ID
  console.log(product1)
    
  })
  .catch((error) => console.log(error.message));
  // setFilterDataUsers(article)

},[])

  return (
    <div>
  <section>
    <div className="relative mx-auto max-w-screen-xl px-4 py-8">
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
              <p className="text-lg font-bold">${product1.price}</p>

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

        </div>
      </div>
    </div>
  </section>
  </div>
  )
}

export default Product