import React from 'react'

import { Link } from 'react-router-dom'

const Product = () => {
  return (
    <div>
  <section>
    <div className="relative mx-auto max-w-screen-xl px-4 py-8">
      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
          <img
            alt="Les Paul"
            src="https://images.unsplash.com/photo-1456948927036-ad533e53865c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            className="aspect-square w-full rounded-xl object-cover"
          />

        </div>
  
        <div className="sticky top-0">
        
  
          <div className="mt-8 flex justify-between">
            <div className="max-w-[35ch] space-y-2">
              <h1 className="text-xl font-bold sm:text-2xl">
                Fun Product That Does Something Cool
              </h1>
  
              <p className="text-sm">Highest Rated Product</p>

            </div>
  
            <p className="text-lg font-bold">$119.99</p>
          </div>
  
          <div className="mt-4">
            <div className="prose max-w-none">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
                veniam dicta beatae eos ex error culpa delectus rem tenetur,
                architecto quam nesciunt, dolor veritatis nisi minus inventore,
                rerum at recusandae?
              </p>
            </div>
  
            {/* <button className="mt-2 text-sm font-medium underline">Read More</button> */}
          </div>
          <div className="bg-white py-12 md:py-24">
        <div className="mx-auto max-w-lg px-4 lg:px-8">
          <form className="grid grid-cols-6 gap-4">
            <div className="col-span-3">
              <label
                htmlFor="FirstName"
                className="block text-xs font-medium text-gray-700"
              >
                First Name
              </label>
  
              <input
                type="text"
                id="FirstName"
                className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
              />
            </div>
  
            <div className="col-span-3">
              <label
                htmlFor="LastName"
                className="block text-xs font-medium text-gray-700"
              >
                Last Name
              </label>
  
              <input
                type="text"
                id="LastName"
                className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
              />
            </div>
  
            <div className="col-span-6">
              <label htmlFor="Email" className="block text-xs font-medium text-gray-700">
                Email
              </label>
  
              <input
                type="email"
                id="Email"
                className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
              />
            </div>
  
            <div className="col-span-6">
              <label htmlFor="Phone" className="block text-xs font-medium text-gray-700">
                Phone
              </label>
  
              <input
                type="tel"
                id="Phone"
                className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
              />
            </div>
  
            <fieldset className="col-span-6">
              <legend className="block text-sm font-medium text-gray-700">
                Card Details
              </legend>
  
              <div className="mt-1 -space-y-px rounded-md bg-white shadow-sm">
                <div>
                  <label htmlFor="CardNumber" className="sr-only"> Card Number </label>
  
                  <input
                    type="text"
                    id="CardNumber"
                    placeholder="Card Number"
                    className="relative mt-1 w-full rounded-t-md border-gray-200 focus:z-10 sm:text-sm"
                  />
                </div>
  
                <div className="flex">
                  <div className="flex-1">
                    <label htmlFor="CardExpiry" className="sr-only"> Card Expiry </label>
  
                    <input
                      type="text"
                      id="CardExpiry"
                      placeholder="Expiry Date"
                      className="relative w-full rounded-es-md border-gray-200 focus:z-10 sm:text-sm"
                    />
                  </div>
  
                  <div className="-ms-px flex-1">
                    <label htmlFor="CardCVC" className="sr-only"> Card CVC </label>
  
                    <input
                      type="text"
                      id="CardCVC"
                      placeholder="CVC"
                      className="relative w-full rounded-ee-md border-gray-200 focus:z-10 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </fieldset>
  
            <fieldset className="col-span-6">
              <legend className="block text-sm font-medium text-gray-700">
                Billing Address
              </legend>
  
              <div className="mt-1 -space-y-px rounded-md bg-white shadow-sm">
                <div>
                  <label htmlFor="Country" className="sr-only">Country</label>
  
                  <select
                    id="Country"
                    className="relative w-full rounded-t-md border-gray-200 focus:z-10 sm:text-sm"
                  >
                    <option>England</option>
                    <option>Wales</option>
                    <option>Scotland</option>
                    <option>France</option>
                    <option>Belgium</option>
                    <option>Japan</option>
                  </select>
                </div>
  
                <div>
                  <label className="sr-only" htmlFor="PostalCode"> ZIP/Post Code </label>
  
                  <input
                    type="text"
                    id="PostalCode"
                    placeholder="ZIP/Post Code"
                    className="relative w-full rounded-b-md border-gray-200 focus:z-10 sm:text-sm"
                  />
                </div>
              </div>
            </fieldset>
  
            <div className="col-span-6">
              <button
                className="block w-full rounded-md bg-black p-2.5 text-sm text-white transition hover:shadow-lg"
              >
                Pay Now
              </button>
            </div>
          </form>
        </div>
      </div>

        </div>
      </div>
    </div>
  </section>
  </div>
  )
}

export default Product