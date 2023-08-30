import React from 'react'
import { useEffect,useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../UserContext';
import AOS from "aos";
import "aos/dist/aos.css";
// Fetch users data and set it to the "filteredDataUsers" state

const Offers = ({makhiata}) => {
  const {pagination,setItem,currentItems}=useContext(UserContext)

  const [offers,setOffers]=useState([])
  console.log(makhiata)
  useEffect(() => {
    axios
    .get('http://localhost:5000/offersOfMakhiata')
    .then((response) => {
      setOffers(response.data);
      setItem(response.data)
    })
    .catch((error) => console.log(error.message));
}, []);
useEffect(() => {
  AOS.init();
  AOS.refresh();
}, []);
  return (
    <div>
      <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-center pb-10 text-gray-900">العروض المتاحة</h2>


        <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
  {currentItems.map((product) => {
    const makhiataItem = makhiata.find((m) => m.id === product.user_id);

    if (makhiataItem) {
      return (
        
        <div key={product.id}data-aos="flip-left" className="group relative ">
                    {/* <Link to={`/Product/${makhiataItem.id}/${product.id}`} > */}

          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
          {/* {makhiataItem.id} */}
            <img
              src={product.photo}
              alt={product.imageAlt}
              className="h-72 w-72 object-cover object-center lg:h-full lg:w-72"
            />
            
          </div>
          {/* </Link> */}
          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-sm text-gray-700">
                <a href={product.href}>
                  <span aria-hidden="true" className="absolute inset-0" />
                  {product.name} ({makhiataItem.username})
                </a>
              </h3>
          <div className='flex'>
            <del className="text-sm   font-medium text-red-600"> {product.price}</del>
            <p className="text-sm pr-10 font-medium text-green-600"> {product.discountedprice}</p></div>
          </div>
          </div>

        </div>
      );
    }

    return null; // No matching makhiata item, render nothing
  })}
</div>
      </div>
      {offers.length > 3 && pagination}
    </div>
    </div>
  )
}

export default Offers
