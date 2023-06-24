
import Nav from './Nav';
import Footer from './Footer';
import React from 'react';
import axios from "axios";
import img1 from '../images/شعار_مخيطة-removebg-preview.png'

import { useState, useEffect } from "react";

import { useNavigate } from "react-router";
import Swal from "sweetalert2";import pic1 from '../images/شعار مخيطة.jpg';
import pic2 from '../images/مخيطة 1.jpg';
import pic3 from '../images/محيطة 3.jpg';

import { Link } from "react-router-dom";
// import {

 function Stitched({userIdapp}) {
  const[value,setvalue]=useState("")
  const [users, setUsers] = useState([]);

  useEffect(()=>{
    axios
    .get(`http://localhost:5000/stitched`)
    .then((response) => {
      setUsers(response.data); // Assuming there is only one user with the given ID
      console.log(response.data);
      console.log(response.data);
      console.log(response.data);
      console.log(users);

    

    })
    .catch((error) => console.log(error.message));

  },[])


const [filterDataUsers, setFilterDataUsers] = useState([]);

const filterDataByNameUsers = (searchTermUsers) => {
  const filteredDataUsers = users.filter((item) =>
    item.username.toLowerCase().includes(searchTermUsers.toLowerCase())
  );
  setFilterDataUsers(filteredDataUsers);
};

useEffect(() => {
  setFilterDataUsers(users);
}, [users]);

console.log(filterDataUsers)
  return (
    <>
    

    <div
  style={{
    background:
      "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.pexels.com/photos/5490975/pexels-photo-5490975.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1) center",
    backgroundSize: "cover"
  }}
  className="py-52 px-1 md:px-8 text-center relative text-white font-bold text-2xl md:text-3xl overflow-auto"
>


<label
  className="mx-auto mt-40 relative  backdrop-opacity-50 bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300"
  htmlFor="search-bar"
>
  <input
  value={value}
  onChange={(e)=>{ 
    filterDataByNameUsers(e.target.value)
    
    setvalue(e.target.value)}}
  type='text'
    id="search-bar"
    placeholder="كلمتك الرئيسية هنا"
    className="px-6 py-2 w-full rounded-md flex-1 outline-none   backdrop-opacity-50"
  /><Link to={"/Profileprovider"}>
  <button   
className="w-full md:w-auto px-6 py-3 bg-fuchsia-800   text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all disabled:opacity-70">
    <div className="relative">
      {/* Loading animation change opacity to display */}
      <div className="flex items-center justify-center h-3 w-3 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 transition-all">
        <svg
          className="opacity-0 animate-spin w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx={12}
            cy={12}
            r={10}
            stroke="currentColor"
            strokeWidth={4}
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
      <div className="flex items-center transition-all opacity-1 valid:">
        <span className="text-sm font-semibold whitespace-nowrap truncate mx-auto">
          البحث
        </span>
      </div>
    </div>
  </button>
  </Link>
</label>






</div>

<div className="text-center mt-16">
      <h1 className="text-3xl text-gray-800 font-semibold">
المخايط المتاحة      </h1>
      <p className="mt-3 text-gray-500">
        المدونات التي يحبها المجتمع. يتم تحديثها كل ساعة.
      </p>
    </div>
    <section className="py-4   mx-auto max-w-screen-xl md:px-12 mt-8 grid gap-3 sm:grid-cols-1 lg:grid-cols-3 ">
    {filterDataUsers.map((item) => {
return(
  <div
  key={item.id}

    className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
  {/* <a href="#!"> */}
  <img className='mr-48 mt-5'
              src={img1}
              width={70}
              height="100%"
              alt="Float UI logo"
            />
    {/* <img
      className="rounded-t-lg"
      src={item.img}
      alt=""
    /> */}
  {/* </a> */}

  <div className="p-6">
    <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
{item.username}
    </h5>
    <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
{item.address}
    </p>
    <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
{item.domain}
    </p>
    <Link to={"/ProductCollection"}><button 
      type="button"
      className="inline-block rounded bg-fuchsia-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-fuchsia-300 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
      data-te-ripple-init=""
      data-te-ripple-color="light"
    >
      تصاميمي
    </button></Link>
  </div>
</div>
)
  
})}

</section>

  
    <section className="flex items-center bg-fuchsia-100 xl:h-screen font-poppins dark:bg-gray-800 ">
  <div className="justify-center flex-1 max-w-6xl py-4 mx-auto lg:py-6 md:px-6">
    <div className="flex flex-wrap ">
      <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
        <div className="relative lg:max-w-md">
          <img
            src="https://i.postimg.cc/rF0MKfBV/pexels-andrea-piacquadio-3760263.jpg"
            alt="aboutimage"
            className="relative z-10 object-cover w-full rounded h-96"
          />
          <div className="absolute bottom-0 right-0 z-10 p-8 bg-white border-4 border-fuchsia-800 rounded shadow dark:border-blue-400 lg:-mb-8 lg:-mr-11 sm:p-8 dark:text-gray-300 dark:bg-gray-800 ">
            <p className="text-lg font-semibold md:w-72">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="absolute top-0 left-0 w-16 h-16 text-fuchsia-800 dark:text-gray-300 opacity-10"
                viewBox="0 0 16 16"
              >
                <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z"></path>
              </svg>{" "}
              Successfully Providing business solutions from 25 years
            </p>
          </div>
        </div>
      </div>
      <div className="w-full px-6 mb-10 lg:w-1/2 lg:mb-0 ">
        <div className="pl-4 mb-6 border-l-4 border-fuchsia-800 ">
          <span className="text-sm text-gray-600 uppercase dark:text-gray-400">
            Who we are?
          </span>
          <h1 className="mt-2 text-3xl font-black text-gray-700 md:text-5xl dark:text-gray-300">
            About Us
          </h1>
        </div>
        <p className="mb-6 text-base leading-7 text-gray-500 dark:text-gray-400">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut Lorem ipsum dolor sit amet, consectetur
          adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam Lorem ipsum dolor sit amet.
          labore et dolore magna aliqua. Ut enim ad minim veniam Lorem ipsum
          dolor sit amet. amet. labore et dolore magna aliqua. Ut enim ad minim
          veniam Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do Lorem ipsum dolor sit amet.
        </p>
      
      </div>
    </div>
  </div>
  
</section>


    </>
  )}
  export default Stitched