import React from 'react'
import  { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Button } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Pagenation from '../forAll/Pagenation';
import axios from 'axios';
const RequestProduct = ({ userIdapp }) => {
  const { itemId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Number of items to display per page
  const[loading,setLoading]=useState(true)

  const [request, setrequest] = useState([]);
  const [approved, setApproved] = useState([]);
  const [finished, setFinished] = useState([]);
  const[refresh,setrefresh]=useState([])

  const handleReject = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/finishrequestOfMakhiata/${id}`
      );
      setFinished(response.data.data.resorts);
    } catch (error) {
      console.log(error);
    }
  };
  // const[price,setPrice]=useState('')
  // const handleAccept = async (id) => {
  //   const data={
  //     price : price
  //   }
  //   try {
  //     const response = await axios.post(`http://localhost:5000/ApprovedrequestOfMakhiata/${id}`+data);
  //     setApproved(response.data.data.resorts);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const [price, setPrice] = useState('');

const handleAccept = async (id) => {
  const data = {
    price: price,
  };
  try {
    const response = await axios.post(`http://localhost:5000/ApprovedrequestOfMakhiata/${id}`, data);
    // Assuming you want to set the "approved" state with the updated data
    setApproved(response.data.data.resorts);
  } catch (error) {
    console.log(error);
  }
};

  const handleDeleterequist = async (id) => {
    try {
      // Display confirmation dialog
      const confirmed = await Swal.fire({
        title: 'Are you sure?',
        text: 'You are about to delete the product. This action cannot be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
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
        setrefresh(finished )
        console.log(response.data)
        console.log(response.data)
        console.log(response.data)
        // Assuming there is only one user with the given ID
      })
      .catch((error) => console.log(error.message)
      );
  }, [userIdapp]);
  console.log(request)
console.log(userIdapp)
  return (
    <div>


<div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
{request.length === 0 ?(<>
    
    <div className="text-2xl  w-full py-48 justify-center flex items-center  text-neutral-800  dark:text-neutral-50">
    لا توجد طلبات للعرض  😢   </div></>):(

      
      <div className="relative overflow-x-auto">
        <h1>جميع الطلبات</h1>
      
  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead className="text-xs border text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    <tr  className=''><th colSpan="5" scope="col" className='px-6 py-3 text-center'>جميع الطلبات</th></tr>

      <tr>
        <th scope="col" className="px-6 py-3">
          Product name
        </th>
        <th scope="col" className="px-6 py-3">
          Color
        </th>
        <th scope="col" className="px-6 py-3">
          Category
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
      </tr>
    </thead>
    <tbody>
    {request?.map((request) => {
                    return (
      <tr key={request.id}  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      
    
        
        <td className="px-6 py-4">  <img
          src={request.photo}
          alt="Product"
          className="h-80 w-72 object-cover rounded-t-xl"
        /></td>
        <td className="px-6 py-4">{request.description}</td>
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
<div className="relative overflow-x-auto">
    
  <table  className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    <tr  className=''><th colSpan="4" scope="col" className='px-6 py-3 text-center'>قيد التنفيذ</th></tr>

      <tr>
        <th scope="col" className="px-6 py-3">
          Product name
        </th>
        <th scope="col" className="px-6 py-3">
          Color
        </th>
        <th scope="col" className="px-6 py-3">
          Category
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
      
      </tr>
    </thead>
    <tbody>
    {approved?.map((request) => {
                    return (
      <tr key={request.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      
    
        
        <td className="px-6 py-4">  <img
          src={request.photo}
          alt="Product"
          className="h-20 w-20 object-cover rounded-t-xl"
        /></td>
        <td className="px-6 py-4">{request.description}</td>
        <td className="px-6 py-4"> {request.phone}</td>
          <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          <button className="mb-10 p-2  bg-[#dc2626]  text-white shadow hover:bg-[#991b1b] hover:text-black   "
         variant="text"     onClick={(event) => {
          handleReject(request.id);
        }}>تم الانتهاء </button>
        </th>
  
      </tr>
  );
})}
    </tbody>
  </table>

</div>
{/* ////////////////////////////finish */}
{/* <div className="relative overflow-x-auto">
    
  <table  className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr  className=''><th colSpan="3" scope="col" className='px-6 py-3 text-center'>الطلبات المنتهية</th></tr>
      <tr>
        <th scope="col" className="px-6 py-3">
          Product name
        </th>
        <th scope="col" className="px-6 py-3">
          Color
        </th>
        <th scope="col" className="px-6 py-3">
          Category
        </th>
      
      
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

      
</div> */}
        </div>

{/* <Pagenation/> */}
    </div>
  )
}

export default RequestProduct