import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import img1 from '../../images/شعار_مخيطة-removebg-preview.png'


import { Link } from "react-router-dom";
const Makhiata = ({filterDataUsers}) => {
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log(filterDataUsers)
  useEffect(()=>{
    axios
    .get(`http://localhost:5000/stitched`)
    .then((response) => {
      setUsers(response.data);
      console.log(response.data)
      console.log(response.data)
    


    })
    .catch((error) => console.log(error.message));

  },[])
  const fetchProtectedData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.get("http://localhost:5000/checkToken", {
          headers: {
            Authorization: token,
          },
        });
        console.log(response.data)
      }
    } catch (error) {
      console.error(error);
    } finally {
      console.log(false);

    }
  };
  useEffect(()=>{
    if(localStorage.token != null){   
      fetchProtectedData()
    setIsLoggedIn(true);
    }
  },[])
  return (
    <div>
  <section className="py-4 mx-auto max-w-screen-xl text-center pb-28 md:px-12 mt-8 grid gap-3 sm:grid-cols-1 lg:grid-cols-3">
{users.length === 0 ? (<>
  <div className="text-4xl  w-full py-48 justify-center flex items-center  text-neutral-800  dark:text-neutral-50">
    </div>
  <div className="text-4xl  w-full py-52 justify-center flex items-center  text-neutral-800  dark:text-neutral-50">
  لا توجد مخايط للعرض  😢   </div></>
) : (
  users.map((item) => {
    return (
      <div key={item.id} className="w-72 bg-gray-100  shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
        <img
          className='mr-28 mt-5 items-center flex justify-center '
          src={img1}
          width={70}
          height="100%"
          alt="Float UI logo"
        />
        <div className="p-6">
          <h5 className="mb-4 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
            اسم المخيطة : {item.username}
          </h5>
          <p className="mb-4  text-base text-neutral-600 dark:text-neutral-200">
          الموقع :   {item.address}
          </p>
          <p className="mb-4  text-base text-neutral-600 dark:text-neutral-200">
          رقم الهاتف :   {item.domain}
          </p>
          {isLoggedIn &&   <Link to={`/ProductCollection/${item.id}`}>
            <button
              type="button"
              className="inline-block rounded bg-fuchsia-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-fuchsia-300 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              data-te-ripple-init=""
              data-te-ripple-color="light"
            >
              تصاميمي{item.id}
            </button>
          </Link>}
          
        </div>
      </div>
    );
  })
)}
</section>
</div>
  )
}

export default Makhiata



