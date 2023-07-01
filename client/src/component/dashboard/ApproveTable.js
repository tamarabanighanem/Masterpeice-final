import Icon from '@mdi/react';
import { mdiClockOutline } from '@mdi/js';
import { mdiCheckCircle } from '@mdi/js';
import { mdiDelete } from "@mdi/js";
import { mdiFileEdit } from "@mdi/js";
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

 import Pagination from "@mui/material/Pagination";

const ApproveTable = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [FilterDataRestaurants, setFilterDataRestaurants] = useState([]);
  const [email, setEmail] = useState("");


  const allProviders = async () => {
    try {
      // Send the data to the server using an HTTP POST request
      const response = await axios.get("http://localhost:5000/api/Providers");
      console.log(response.data);
      setRestaurants(response.data);
      setFilterDataRestaurants(response.data);
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  };

  useEffect(() => {
    allProviders();
  }, []);


       //-----------------------search------------------------//
       const [searchTermRestaurants, setSearchTermRestaurants] = useState('');
       
       
       const filterDataByNameRestaurants = (searchTermRestaurants) => {
         console.log(searchTermRestaurants)
         
         const filteredDataRestaurants = restaurants.filter(item =>
       
           item.NAME.toLowerCase().includes(searchTermRestaurants.toLowerCase())
         );
         setFilterDataRestaurants(filteredDataRestaurants);
          setCurrentPageRestaurants(1)
       }
       
       const [currentPageRestaurants, setCurrentPageRestaurants] = useState(1);

       let totalItemsRestaurants;
       
       let totalPagesRestaurants;
       
       let slicedArrayRestaurants;
       
       const itemsPerPage = 3;
       
       totalItemsRestaurants = FilterDataRestaurants.length;
       
       totalPagesRestaurants = Math.ceil(totalItemsRestaurants / itemsPerPage);
       
       const startIndexRestaurants = (currentPageRestaurants - 1) * itemsPerPage;
       
       const endIndexRestaurants = startIndexRestaurants + itemsPerPage;
       
       slicedArrayRestaurants = FilterDataRestaurants.slice(startIndexRestaurants, endIndexRestaurants);
       
       const handlePageChangeRestaurants = (event, pageNumber) => {
         setCurrentPageRestaurants(pageNumber);
       };

       

       const handleDelete = (id,name,userid) => {



        Swal.fire({
          title: ` Do you want to remove ${name}?  `,
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          icon: 'warning'
      }
      ).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
    
              Swal.fire(` ${name} has been removed `, '', 'success');
           
              // axios.put('http://localhost:5000/restaurants/'+userid)
              // .then((response) => {
              //     console.log(response.data);
              // })
              // .catch((error) => console.log(error.message))
              // window.location.reload();
          } else
              Swal.fire(' Cancelled', '', 'error')
    
      })
    
    
    }




const addrestaurants = async () => {


const userData = {
  firstName:"provider",
  email: email,
  password:"LUNA@IO10m",
  role:2 
};

try {
  // Send the data to the server using an HTTP POST request
  const response = await axios.post(
    "http://localhost:5000/api/users",
    userData
  );
} catch (error) {
  console.error("Error inserting data:", error);
}


}




  return (
    
<>





<div className='bg-[#ffffff] mr-5 ml-5 p-10 rounded-2xl min-h-[calc(100vh)] '>


<form>
 
  <div className="relative">
 
    <input
      type="email"
      id="search"
      name='email'
      className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Email"
      required=""
      value={email}
      onChange={(e) => {setEmail(e.target.value);}}
    />
    <button
       onClick={()=>addrestaurants()}
      type="submit"
      className="text-white bg-amber-700 absolute right-2.5 bottom-2.5 amber-600 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      add Email
    </button>
  </div>
</form>
  <div className="relative flex items-center justify-between pt-4">
    <div className="text-xl font-bold text-navy-700 dark:text-white">
    Beneficiary 
    </div>
 
  </div>

  <form>
 
 <div className="relative">

   <input
     type="text"
     id="search"
     className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
     placeholder="Search"
     required=""
     value={searchTermRestaurants}
     onChange={(e) =>{
      setSearchTermRestaurants(e.target.value);
     filterDataByNameRestaurants(e.target.value);
    }}
   />

 </div>
</form>

  <div className="mt-8 overflow-x-scroll xl:overflow-hidden">
    <table role="table" className="w-full">
      <thead>
        <tr role="row">
          <th
            colSpan={1}
            role="columnheader"
            title="Toggle SortBy"
            className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700"
            style={{ cursor: "pointer" }}
          >
            <p className="text-xs tracking-wide text-gray-600">NAME</p>
          </th>
          <th
            colSpan={1}
            role="columnheader"
            title="Toggle SortBy"
            className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700"
            style={{ cursor: "pointer" }}
          >
            <p className="text-xs tracking-wide text-gray-600">EMAIL</p>
          </th>


          {/* <th
            colSpan={1}
            role="columnheader"
            title="Toggle SortBy"
            className="border-b border-gray-200 pr-10 pb-[10px] text-start dark:!border-navy-700"
            style={{ cursor: "pointer" }}
          >
            <p className="text-xs tracking-wide text-gray-600">EDIT</p>
          </th> */}

          <th
            colSpan={1}
            role="columnheader"
            title="Toggle SortBy"
            className="border-b border-gray-200 pr-5 pb-[10px] text-start dark:!border-navy-700"
            style={{ cursor: "pointer" }}
          >
            <p className="text-xs tracking-wide text-gray-600">DELETE</p>
          </th>

        </tr>
      </thead>
      

{
// [
//   {
//       "restaurant_id ": 1,
//       "user_id": 33,
//       "restaurant_name": "aaa",
//       "address": "aaaaa",
//       "contact_number": "aaaaa",
//       "type_food": "aaaa",
//       "des": "aaaaaaaaa",
//       "img": "aaaaaaaaa",
//       "food_image": "aaaaaaaaaa"
//   }
// ]
slicedArrayRestaurants.map((e)=>{

return(

<tbody role="rowgroup">
<tr role="row">
<td
                      className="pt-[14px] pb-[18px] sm:text-[14px] flex items-center"
                      role="cell"
                    >
          <div className="h-[30px] w-[30px] rounded-full">
                        <img
                          src="https://images.unsplash.com/photo-1506863530036-1efeddceb993?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2244&q=80"
                          className="h-full w-full rounded-full"
                          alt=""
                        />
                      </div>
            <p className="text-sm font-bold text-navy-700 dark:text-white">
              {e.firstName} 
            </p>
          </td>
          <td className="pt-[14px] pb-[18px] sm:text-[14px]" role="cell">
            <div className="flex items-center gap-2">
              <div className="rounded-full text-xl">
                {/* <Icon color= {e.STATUSt=="APPROVED" ? 'green' : 'blue'} path={e.STATUS} size={1} /> */}
                {e.email}
              
              </div>
              {/* <p className="text-sm font-bold text-navy-700  dark:text-white">
                {e.STATUSt}
              </p> */}
            </div>
          </td>

          {/* <td className="pt-[14px] pb-[18px] sm:text-[14px]" role="cell">
                     <button>
                     <Icon color="blue" path={mdiFileEdit} size={1} />
                    </button>
          </td> */}


          <td className="pt-[14px] pb-[18px] sm:text-[14px]" role="cell">
                     <button onClick={() => handleDelete(e.restaurant_id,e.restaurant_name,e.user_id)}>
                      <Icon color="red" path={mdiDelete} size={1} />
                    </button>
          </td>


        </tr>
       
      </tbody>




)



})

}


        
    </table>

    <div className='flex w-full justify-center mt-5'>   
    {(
        <Pagination
          count={totalPagesRestaurants}
          page={currentPageRestaurants}
          onChange={handlePageChangeRestaurants}
        />
      )}
    </div> 
  </div>


</div>




  </>
  )
}

export default ApproveTable