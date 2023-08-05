import Icon from '@mdi/react';
import { mdiDelete } from "@mdi/js";
// import { mdiFileEdit } from "@mdi/js";
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Button } from "@material-tailwind/react";

 import Pagination from "@mui/material/Pagination";

const ApproveTable = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [FilterDataRestaurants, setFilterDataRestaurants] = useState([]);
  // const [email, setEmail] = useState("");
  const[allComment,setAllcomment]=useState([])


  // const allProviders = async () => {
  //   try {
  //     // Send the data to the server using an HTTP POST request
  //     const response = await axios.get("http://localhost:5000/api/Providers");
  //     console.log(response.data);
  //     setRestaurants(response.data);
  //     setFilterDataRestaurants(response.data);
  //   } catch (error) {
  //     console.error("Error inserting data:", error);
  //   }
  // };

  // useEffect(() => {
  //   allProviders();
  // }, []);


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

       





    const[refresh,setrefresh]=useState([])
// 
    const handleDelete = async (id) => {
      try {
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
          await axios.put(`http://localhost:5000/deleteComment/${id}`);
          // setrefresh(allComment)

        }
      } catch (error) {
        console.log(error.message);
      }
    };
    
    useEffect(()=>{
      axios
      .get(`http://localhost:5000/allcomment`)
      .then((response) => {
        setrefresh(allComment)

        setAllcomment(response.data);
        // setLoading(false) // Assuming there is only one user with the given ID
        
      })
      .catch((error) => console.log(error.message));
      // setFilterDataUsers(article)
    // setLoading(false)
    },[refresh])

  





  return (
    
<>





<div className='bg-[#ffffff] mr-5 ml-5 p-10 rounded-2xl min-h-[calc(100vh)] '>


  <div className="relative flex items-center justify-between pt-4">
    <div className="text-xl font-bold text-navy-700 dark:text-white">
    All Comments 
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
  
    <div className="">
      {allComment?.map((comment) => (
      <div>
          <div key={comment.id} className="bg-gray-200 m-5 p-2 rounded-3xl">
          <h4 className="font-bold">{comment.name}</h4>
          <p className="pt-3">{comment.body}</p>
          <Button  className="mb-10  bg-[#dc2626]  text-white shadow hover:bg-[#991b1b] hover:text-black   "
         variant="text"   onClick={() => handleDelete(comment.id)}>حذف </Button>
        </div>
      </div>
      ))}
    
    </div>
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