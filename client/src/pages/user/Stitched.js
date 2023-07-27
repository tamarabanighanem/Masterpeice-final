

import React from 'react';
import axios from "axios";
import img1 from '../../images/شعار_مخيطة-removebg-preview.png'
import img2 from '../../images/thomas-william-6Sls-TB27kM-unsplash.jpg'
import { useState, useEffect } from "react";


import { Link } from "react-router-dom";
// import {

 function Stitched({userIdapp}) {
  const[value,setvalue]=useState("")
  const [users, setUsers] = useState([]);

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

  return (
    <>
    

    <div
  style={{
    background:
      "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://plus.unsplash.com/premium_photo-1664202526559-e21e9c0fb46a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80) center",
    backgroundSize: "cover"
  }}
  className="py-52 px-1 md:px-8 text-center relative text-black font-bold text-2xl md:text-3xl overflow-auto"
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
{/* <div className="text-center mt-10 p-10">
    <h1 className="font-bold text-3xl bg-gray-100 p-5 w-full rounded-xl  mb-4">        طلباتي
</h1>

  </div> */}
<div className="text-center mt-16">
      <h1 className="text-3xl text-gray-800 font-semibold">
المخايط المتاحة      </h1>
    
    </div>
    <section className="py-4 mx-auto max-w-screen-xl text-center pb-28 md:px-12 mt-8 grid gap-3 sm:grid-cols-1 lg:grid-cols-3">
  {filterDataUsers.length === 0 ? (<>
    <div className="text-4xl  w-full py-48 justify-center flex items-center  text-neutral-800  dark:text-neutral-50">
      </div>
    <div className="text-4xl  w-full py-52 justify-center flex items-center  text-neutral-800  dark:text-neutral-50">
    لا توجد مخايط للعرض  😢   </div></>
  ) : (
    filterDataUsers.map((item) => {
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
            <Link to={`/ProductCollection/${item.id}`}>
              <button
                type="button"
                className="inline-block rounded bg-fuchsia-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-fuchsia-300 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                data-te-ripple-init=""
                data-te-ripple-color="light"
              >
                تصاميمي{item.id}
              </button>
            </Link>
          </div>
        </div>
      );
    })
  )}
</section>


  
    <section className="flex items-center pt-5 bg-fuchsia-100 xl:h-screen font-poppins dark:bg-gray-800 ">
  <div className="justify-center flex-1 max-w-6xl py-4 mx-auto lg:py-6 md:px-6">
    <div className="flex flex-wrap ">
      <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
        <div className="relative lg:max-w-md">
          <img
            src={img2}
            alt="aboutimage"
            className="relative z-10 object-cover w-full rounded h-96"
          />
          <div className="absolute bottom-0 right-0 z-10  p-8 bg-white border-4 border-fuchsia-800 rounded shadow dark:border-blue-400 lg:-mb-8 lg:-mr-11 sm:p-8 dark:text-gray-300 dark:bg-gray-800 ">
            <p className="text-lg font-semibold md:w-72">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="absolute top-0 left-0 w-16 h-16 text-fuchsia-800 dark:text-gray-300 opacity-10"
                viewBox="0 0 16 16"
              >
                <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z"></path>
              </svg>{" "}
              الخياطة هي فن يعود لقرون عديدة، حيث تعتبر من أقدم فنون الحياكة والتصميم والتفصيل            </p>
          </div>
        </div>
      </div>
      <div className="w-full px-6  mb-10 lg:w-1/2 lg:mb-0 ">
        <div className="pl-4 mb-6 border-l-4 border-fuchsia-800 ">
          {/* <span className="text-sm text-gray-600 uppercase dark:text-gray-400">
            Who we are?
          </span> */}
          {/* <h1 className="mt-2 text-3xl font-black text-gray-700 md:text-5xl dark:text-gray-300 "> */}
          <h1 className="mt-2 text-3xl font-black text-gray-700 md:text-5xl dark:text-gray-300 nameweb">

             ابرة و خيط
          </h1>
        </div>
        <p className="mb-6 text-base leading-7 text-gray-500 dark:text-gray-400">


تعتبر صناعة الخياطة والمخايط مهنة رائعة تجمع بين الحرفية والإبداع، وتساهم في خلق أعمال فنية فريدة وملابس ذات جودة عالية. من خلال موقعك للخياطة، يمكنك عرض أعمالك وخدماتك للعملاء المحتملين، وتسليط الضوء على مهاراتك وقدراتك في صناعة الملابس والتفصيل.

سواء كنت تقدمين خدمات خياطة مخصصة أو تصميم أزياء جاهزة، يمكنك أن تجذبي العملاء من خلال عرض تصاميمك الفريدة والجميلة، وتقديم خدمة شخصية ومحترفة. يمكنك أيضًا تقديم نصائح وأفكار حول الأزياء والموضة في مدونة الموقع، مما يعزز مكانتك كخبيرة في مجال الخياطة والموضة.

استخدمي موقعك للخياطة لعرض صور لأعمالك السابقة، واذكري تفاصيل حول التقنيات التي

 تستخدمينها والمواد التي تعملين بها. كما يمكنك إضافة معلومات حول خدماتك، مثل الخياطة المخصصة، أعمال التصليح، تصميم الأزياء، أو تصميم وتفصيل ملابس الزفاف والسهرة.

باستخدام موقعك للخياطة، ستتمكنين من الوصول إلى عملاء جدد وتوسيع قاعدة عملائك، وتعزيز سمعتك وانتشار اسمك في عالم الخياطة والموضة. استمتعي بالتعبير عن إبداعك ومهاراتك من خلال موقعك الخاص، واجذبي العملاء المهتمين بالأزياء والجودة والتفاصيل.
        </p>
      
      </div>
    </div>
  </div>
  
</section>


    </>
  )}
  export default Stitched