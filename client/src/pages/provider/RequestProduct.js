import React from 'react'
import  { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
const RequestProduct = ({ userIdapp,refreshh,setRefreshh,refresh3,setrefresh3 }) => {

  const[loading,setLoading]=useState(true)

  const [request, setrequest] = useState([]);
  const [approved, setApproved] = useState([]);
  const [finished, setFinished] = useState([]);
  // const[refresh,setrefresh]=useState(false)

  const handleReject = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/finishrequestOfMakhiata/${id}`
      );
      setFinished(response.data.data.resorts);
      setrefresh3(!refresh3)

    } catch (error) {
      console.log(error);
    }
  };
  const [price, setPrice] = useState('');
  
const handleAccept = async (id) => {
  const data = {
    price: price,
  };
  try {
    const response = await axios.post(`http://localhost:5000/ApprovedrequestOfMakhiata/${id}`, data);
    // Assuming you want to set the "approved" state with the updated data
    setApproved(response.data.data.resorts);
    setRefreshh(!refreshh)
  } catch (error) {
    console.log(error);
  }
};

  const handleDeleterequist = async (id) => {
    try {
      // Display confirmation dialog
      const confirmed = await Swal.fire({
        title: 'هل أنت متأكد؟',
        text: 'أنت على وشك حذف المنتج. هذا الإجراء لا يمكن التراجع عنه.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'نعم، احذفه!'
      });
      if (confirmed.isConfirmed) {
        await axios.delete("http://localhost:5000/requestOfMakhiataDelete/" + id);
        window.location.reload();
      }
    } catch (error) {
      // Handle error if necessary
    }
  };
  useEffect(() => {
    ///////////get all request
     axios
      .get(`http://localhost:5000/requestOfMakhiata/${userIdapp}`)
      .then((response) => {
        setrequest(response.data);
        setLoading(false)
        console.log(response.data)
        console.log(response.data)
        console.log(response.data)
        // Assuming there is only one user with the given ID
      })
      .catch((error) => console.log(error.message)
      );
      /////////get approved request
      axios
      .get(`http://localhost:5000/ApprovedrequestOfMakhiata/${userIdapp}`)
      .then((response) => {
        setApproved(response.data);
        setLoading(false)
    
        // Assuming there is only one user with the given ID
      })
      .catch((error) => console.log(error.message)
      );  /////////get finish request
      axios
      .get(`http://localhost:5000/finishrequestOfMakhiata/${userIdapp}`)
      .then((response) => {
        setFinished(response.data);
        setLoading(false)
        console.log(response.data)
        console.log(response.data)
        console.log(response.data)
        // Assuming there is only one user with the given ID
      })
      .catch((error) => console.log(error.message)
      );
  }, [userIdapp,refreshh,refresh3]);
  console.log(request)
console.log(userIdapp)
  return (
    <div>


<div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
{request.length === 0 ?(<>
    
    <div className="text-2xl  w-full py-48 justify-center flex items-center  text-neutral-800  dark:text-neutral-50">
    لا توجد طلبات للعرض  😢   </div></>):(

      
      <div className="relative overflow-x-auto">
      <p className='px-6 pb-10 text-xl  text-center'>جميع الطلبات</p>
  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead className="text-xs border text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    {/* <tr  className=''><th colSpan="5" scope="col" className='px-6 pb-10 text-xl  text-center'>جميع الطلبات</th></tr> */}

      <tr>
        <td scope="col" className="px-6 py-3">
          صورة عن القطعة
        </td>
        <td scope="col" className="px-6 py-3">
          الوصف
        </td>
        <td scope="col" className="px-6 py-3">
          رقم الهاتف
        </td>
        <td scope="col" className="px-6 py-3">
          السعر المتوقع
        </td>
        <td scope="col" className="px-6 py-3">
          الحالة
        </td>
      </tr>
    </thead>
    <tbody>
    {request?.map((request) => {
                    return (
      <tr key={request.id}  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      
    
        
        <td className="px-6 py-4"> 
         <img
          src={request.photo}
          alt="Product"
          className="h-80 w-72 object-cover rounded-t-xl"
        /></td>
        <td className=" ">{request.description}</td>
        <td className="px-6 py-4"> {request.phone}</td>
      
        <td className="px-6 py-4">  <input type="text"placeholder='السعر المتوقع' value={price} onChange={(e)=>setPrice(e.target.value)}/>     </td>
        <td
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          <button className="mb-10 p-2 ml-2 bg-[#dc2626]  text-white shadow hover:bg-[#991b1b] hover:text-black   "
         variant="text"     onClick={(event) => {
          handleDeleterequist(request.id);
        }}>حذف </button>
         <button  className="mb-10 p-2  bg-fuchsia-800  text-white shadow hover:bg-fuchsia-200 hover:text-fuchsia-800   "
         variant="text"   onClick={(event) => {
          // alert();
          handleAccept(request.id);
        }}>قبول</button>
        </td>
      </tr>
  );
})}
    </tbody>
  </table>

</div>
)}
{/* /////////////////////////////// in progress*/}
{finished && finished.some(item => item && item.statuse) ? (
  <div className="relative overflow-x-auto">
          <p className='px-6 pb-10 text-xl  text-center'>قيد التنفيذ</p>

    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    

        <tr>
          <th scope="col" className="px-6 py-3">
            صورة القطعة
          </th>
          <th scope="col" className="px-6 py-3">
            الوصف
          </th>
          <th scope="col" className="px-6 py-3">
          رقم الهاتف
          </th>
          <th scope="col" className="px-6 py-3">
            الحالة
          </th>
        </tr>
      </thead>
      <tbody>
        {approved?.map((request) => {
          return (
            <tr
              key={request.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="px-6 py-4">
                <img
                  src={request.photo}
                  alt="Product"
                  className="h-20 w-20 object-cover rounded-t-xl"
                />
              </td>
              <td className="px-6 py-4">{request.description}</td>
              <td className="px-6 py-4"> {request.phone}</td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <button
                  className="mb-10 p-2  bg-[#dc2626]  text-white shadow hover:bg-[#991b1b] hover:text-black   "
                  variant="text"
                  onClick={(event) => {
                    handleReject(request.id);
                  }}
                >
                  تم الانتهاء
                </button>
              </th>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
) : (
  <></>
)}
<hr className='w-full mt-20 mb-20'></hr>
{/* ////////////////////////////finish */}
<div className="relative overflow-x-auto">
<p className='px-6 pb-10 text-xl  text-center'>الطلبات المنتهية</p>

  <table  className="w-full text-sm text-left text-gray-500 dark:text-gray-400">

    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <td  className="px-6 py-3">
          صورة القطعة
        </td>
        <td  className="px-6 py-3">
          الوصف
        </td>
        <td  className="px-6 py-3">
          رقم الهاتف
        </td>
      
      
      </tr>
    </thead>
    <tbody>
    {finished?.map((request) => {
                    return (
      <tr key={request.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      
    
        
        <td className="px-6 py-4">  
        <img
          src={request.photo}
          alt="Product"
          className="h-20 w-20 object-cover rounded-t-xl"
        /></td>
        <td className="px-6 py-4">{request.description}</td>
        <td className="px-6 py-4"> {request.phone}</td>

      </tr>
        );
})}
    </tbody>
  </table>

      
</div>
        </div>

{/* <Pagenation/> */}
    </div>
  )
}

export default RequestProduct