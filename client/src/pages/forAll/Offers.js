import React from 'react'
import { useEffect,useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// Fetch users data and set it to the "filteredDataUsers" state

const Offers = ({makhiata}) => {
  const [offers,setOffers]=useState([])
  const [logIn,setLogin]=useState(false)
  console.log(makhiata)
  useEffect(() => {
    axios
    .get('http://localhost:5000/offersOfMakhiata')
    .then((response) => {
      setOffers(response.data);
    })
    .catch((error) => console.log(error.message));
}, []);
  return (
    <div>
      <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>


        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
  {offers.map((product) => {
    const makhiataItem = makhiata.find((m) => m.id === product.user_id);

    if (makhiataItem) {
      return (
        
        <div key={product.id} className="group relative">
                    <Link to={`/Product`}>

          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
            <img
              src={product.photo}
              alt={product.imageAlt}
              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            />
            
          </div>
          </Link>
          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-sm text-gray-700">
                <a href={product.href}>
                  <span aria-hidden="true" className="absolute inset-0" />
                  {product.name} ({makhiataItem.username})
                </a>
              </h3>
              <p className="mt-1 text-sm text-gray-500">{product.color}</p>
            </div>
            <p className="text-sm font-medium text-gray-900">{product.price}</p>
          </div>
        </div>
      );
    }

    return null; // No matching makhiata item, render nothing
  })}
</div>

      </div>
    </div>
    </div>
  )
}

export default Offers
