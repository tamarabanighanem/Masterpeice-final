
import Nav from './Nav';
import Footer from './Footer';
import React from 'react';
import axios from "axios";
import { useState, useEffect } from "react";

import { useNavigate } from "react-router";
import Swal from "sweetalert2";import pic1 from '../images/شعار مخيطة.jpg';
import pic2 from '../images/مخيطة 1.jpg';
import pic3 from '../images/محيطة 3.jpg';

import { Link } from "react-router-dom";
// import {
//   Ripple,
//   initTE,
// } from "tw-elements";
// import { useEffect, useState } from 'react';
// initTE({ Ripple });
export default function Example() {
  const[value,setvalue]=useState("")
  const [img, setImg] = useState("");

  const onChange = (e) => {
    const files = e.target.files;
    const file = files[0];
    getBase64(file);
    console.log(img);
  };
  const onLoad = (fileString) => {
    setImg(fileString);
  };
  const getBase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      onLoad(reader.result);
    };
  };
  const [b_id, setb_id] = useState();
  const fetchProtectedData = async () => {
    try {
      const token = localStorage.getItem("auth");
      if (token) {
        const response = await axios.get("http://localhost:5000/protected", {
          headers: {
            Authorization: token,
          },
        });
        setb_id(response.data.user.id);
      }
    } catch (error) {
      console.error(error);
      localStorage.removeItem("auth");
      window.location.href = "http://localhost:3000/Login";
    } finally {
      console.log(false);
    }
  };

  useEffect(() => {
    if (localStorage.auth != null) {
      fetchProtectedData();
    }
  }, []);

  console.log(b_id);
  const [Name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [des, setdescription] = useState("");
  const [donationType, setdonationType] = useState("Money");
  const [donationCase, setdonationCase] = useState("Stray Animals");
  const navigate = useNavigate();
  const [priceStatus,setPriceStatus]=useState(true)

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default behavior of the event
    const formData = {
      Name: Name,
      location: location,
      price: price,
      des: des,
      donationType: donationType,
      donationCase: donationCase,
      b_id: b_id,
      image: img,
    };
    try {
      const newPost = await axios.post(
        "http://localhost:5000/api/beneficiarys",
        formData
      );
      Swal.fire({
        title: `submitted form successful`,
        icon: "success",
        confirmButtonText: "OK",
      });
      console.log(newPost.data);
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "please enter valid donation amount",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error(error.message);
    }
  };

  const contactMethods = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
          />
        </svg>
      ),
      contact: "Support@example.com",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
          />
        </svg>
      ),
      contact: "+1 (555) 000-000",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>
      ),
      contact: "Mountain View, California, United State.",
    },
  ];
  const article=[
    
    {img:pic1,title:"عامر الخياط",des:" مهنة الخياط واحدة من المهن القديمة في المجتمع، وعلى الرغم من بساطتها الا انها ليست مهنة سهَلْة بل تتطلب موهبة ومهارة عالية.",id:"1"},
    {img:pic1,title:"مرقة",des:" مهنة الخياط واحدة من المهن القديمة في المجتمع، وعلى الرغم من بساطتها الا انها ليست مهنة سهَلْة بل تتطلب موهبة ومهارة عالية.",id:"2"},
    {img:pic1,title:"زينة خانوم",des:" مهنة الخياط واحدة من المهن القديمة في المجتمع، وعلى الرغم من بساطتها الا انها ليست مهنة سهَلْة بل تتطلب موهبة ومهارة عالية.",id:"3"}
  ]


  useEffect(()=>{

    setFilterDataUsers(article)

  },[])

const [FilterDataUsers, setFilterDataUsers] = useState([]);
console.log(FilterDataUsers)
const filterDataByNameUsers = (searchTermUsers) => {
  const filteredDataUsers = article?.filter((item) =>
    item.title.toLowerCase().includes(searchTermUsers.toLowerCase())
  );
  setFilterDataUsers(filteredDataUsers)
  console.log(FilterDataUsers);
};

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
  />
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
</label>






</div>



  
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
        {/* <a
          href="#"
          className="px-4 py-2 text-gray-100 bg-fuchsia-800 rounded dark:bg-fuchsia-400 dark:hover:bg-blue-500 hover:bg-blue-600"
        >
          Learn more
        </a> */}
      </div>
    </div>
  </div>
  
</section>

<div className="text-center mt-16">
      <h1 className="text-3xl text-gray-800 font-semibold">
        المقالات
      </h1>
      <p className="mt-3 text-gray-500">
        المدونات التي يحبها المجتمع. يتم تحديثها كل ساعة.
      </p>
    </div>
    <section className="py-4   mx-auto max-w-screen-xl md:px-12 mt-8 grid gap-3 sm:grid-cols-1 lg:grid-cols-3 ">
{ FilterDataUsers.map((item)=>{
return(




  <div

    className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
  {/* <a href="#!"> */}
    
    <img
      className="rounded-t-lg"
      src={item.img}
      alt=""
    />
  {/* </a> */}

  <div className="p-6">
    <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
{item.title}
    </h5>
    <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
{item.des}
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


    



      {/* /////////////////////////// */}

      <main className="py-14 ">
        <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
          <div className="max-w-lg mx-auto gap-12 justify-between lg:flex lg:max-w-none">
            {/* <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            /> */}
            <div
              className="max-w-xl h-75"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1516934024742-b461fba47600?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80")',
                backgroundRepeat: "no-repeat",
                opacity: 0.5,
                backgroundSize: "cover",
              }}
            >
              <div className="p-10 ">
                <p className="text-yellow-800 pt-10 text-7xl font-semibold sm:text-4xl">
                  Let us know how we can help
                </p>
                <p className="text-black text-xl p-10 text-white leading-10">
                  We’re here to help and answer any question you might have, We
                  look forward to hearing from you! Please fill out the form,
                  Support our animal donation initiatives to make a positive
                  impact on animals in need. Your contributions provide food,
                  shelter, and medical care. Join us in creating a better world
                  for our furry friends. Make a difference in the lives of
                  animals through your generous donations. Help us provide
                  essential care and support to vulnerable animals in need.
                </p>
                {/* <div>
                <ul className="mt-6 flex flex-wrap gap-x-10 gap-y-6 items-center">
                  {contactMethods.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-x-3">
                      <div className="flex-none text-white">{item.icon}</div>
                      <p>{item.contact}</p>
                    </li>
                  ))}
                </ul>
              </div> */}
              </div>
            </div>
            <div className="flex-1 mt-12 sm:max-w-lg lg:max-w-md">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="font-medium">Full name</label>
                  <input
                    type="text"
                    required
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border-2 border-gray-300 p-2  focus:border-[#E8AA42] shadow-sm rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-medium">Location</label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border-2 border-gray-300 p-2  focus:border-[#E8AA42] shadow-sm rounded-lg"
                  />
                </div>
                {priceStatus == true ?
                <div>
                  <label className="font-medium">Donation's amount</label>
                  <input
                    type="text"
                    placeholder="$"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border-2 border-gray-300 p-2   focus:border-[#E8AA42] shadow-sm rounded-lg"
                  />
                </div> : null
                }
                <div>
                  <label className="font-medium">Description</label>
                  <textarea
                    required
                    value={des}
                    onChange={(e) => setdescription(e.target.value)}
                    className="w-full mt-2 h-36 px-3 py-2 border-2 border-gray-300 p-2 rounded-lg  resize-none appearance-none bg-transparent outline-none  focus:border-[#E8AA42] shadow-sm "
                  ></textarea>
                </div>

                <div>
                  <label className="font-medium">Case Image</label>

                  <input
                    className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                    type="file"
                    placeholder="Table Image"
                    name="guest_num"
                    onChange={(e) => {
                      onChange(e);
                    }}
                    accept="image/*"
                  />
                </div>

                <label for="don" className="font-bold">
                  Donation case :{" "}
                </label>

                <select
                  id="don"
                  value={donationCase}
                  onChange={(e) => setdonationCase(e.target.value)}
                  className="select border-2 border-gray-300 p-2 rounded-lg w-full max-w-xs focus:border-[#E8AA42]"
                >
                  {/* <option disabled selected>Donation case</option> */}
                  <option>Stray Animals</option>
                  <option>injured animals</option>
                </select>
                <div className="flex">
                  <label for="don1" className="font-bold">
                    Type of Donate :{" "}
                  </label>
                  <select
                    id="don1"
                    value={donationType}
                    onChange={(e) => {
                      setdonationType(e.target.value)
                      setPriceStatus(e.target.value == "Others" ? false : true)
                    }}
                    className="select border-2 border-gray-300 p-2 rounded-lg w-full max-w-xs focus:border-[#E8AA42]"
                  >
                    {/* <option disabled selected>Type of Donation</option> */}
                    <option>Money</option>
                    <option>Others</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-white font-medium bg-[#E8AA42] hover:bg-[#7C9070] active:bg-[#7C9070] rounded-lg duration-150"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

  
  
    </>
  )}