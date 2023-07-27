import Icon from "@mdi/react";
import { mdiDelete } from "@mdi/js";
import { mdiFileEdit } from "@mdi/js";
import Pagination from "@mui/material/Pagination";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { mdiCheckDecagram  } from "@mdi/js";
import Swal from "sweetalert2";
import { mdiSilverware } from "@mdi/js";
import { mdiHandshakeOutline } from "@mdi/js";
import { mdiAccountOutline } from "@mdi/js";
import { CiCircleRemove, CiCircleCheck } from "react-icons/ci";

const PendingPosts = () => {

    const [persons, setPersons] = useState([]);
    const [personsAp, setPersonsAp] = useState([]);
    const [persons0, setPersons0] = useState([]);
  
    const [searchTermUsers, setSearchTermUsers] = useState("");
    const [searchTermUsersAp, setSearchTermUsersAp] = useState("");
    const [FilterDataUsers, setFilterDataUsers] = useState([]);
    const [FilterDataUsersAp, setFilterDataUsersAp] = useState([]);
    const [HandleP, setHandleP] = useState();
  
    // const allAdmins = async () => {
    //     try {
    //         const response = await axios.get("http://localhost:5000/api/beneficiarysAdmin");
    //         setPersons(response.data);
    //       console.log(response.data)
    //       setFilterDataUsers(response.data)
    //       } catch (error) {
    //         console.error("Error inserting data:", error);
    //       }

     
    //       try {
    //         const response = await axios.get("http://localhost:5000/api/allBeneficiarysAdminAp");
    //         setPersonsAp(response.data);
    //       console.log(response.data)
    //       setFilterDataUsersAp(response.data)
    //       } catch (error) {
    //         console.error("Error inserting data:", error);
    //       }



    //     };

     
      // useEffect(() => {
      //   allAdmins();
      // }, []);
//-----------------------search------------------------//

// const filterDataByNameUsers = (searchTermUsers) => {
//     const filteredDataUsers = persons.filter((item) =>
//       item.Name.toLowerCase().includes(searchTermUsers.toLowerCase())
//     );
//     setFilterDataUsers(filteredDataUsers);
//     console.log(filteredDataUsers);
//     setCurrentPageUsers(1);
//   };
// const filterDataByNameUsersAp = (searchTermUsers) => {
//     const filteredDataUsers = personsAp.filter((item) =>
//       item.Name.toLowerCase().includes(searchTermUsers.toLowerCase())
//     );
//     setFilterDataUsersAp(filteredDataUsers);
//     console.log(filteredDataUsers);
//     setCurrentPageUsersAp(1);
//   };

  const [currentPageUsers, setCurrentPageUsers] = useState(1);
  let totalItemsUsers;

  let totalPagesUsers;

  let slicedArrayUsers;

  const itemsPerPage = 5;

  totalItemsUsers = FilterDataUsers.length;

  totalPagesUsers = Math.ceil(totalItemsUsers / itemsPerPage);

  const startIndexUsers = (currentPageUsers - 1) * itemsPerPage;

  const endIndexUsers = startIndexUsers + itemsPerPage;

  slicedArrayUsers = FilterDataUsers.slice(startIndexUsers, endIndexUsers);

  const handlePageChangeUsers = (event, pageNumber) => {
    setCurrentPageUsers(pageNumber);
  };
  const [currentPageUsersAp, setCurrentPageUsersAp] = useState(1);
  let totalItemsUsersAp;

  let totalPagesUsersAp;

  let slicedArrayUsersAp;

  const itemsPerPageAp = 5;

  totalItemsUsersAp = FilterDataUsersAp.length;

  totalPagesUsersAp = Math.ceil(totalItemsUsersAp / itemsPerPageAp);

  const startIndexUsersAp = (currentPageUsersAp - 1) * itemsPerPageAp;

  const endIndexUsersAp = startIndexUsersAp + itemsPerPageAp;

  slicedArrayUsersAp = FilterDataUsersAp.slice(startIndexUsersAp, endIndexUsersAp);

  // const handlePageChangeUsersAp = (event, pageNumber) => {
  //   setCurrentPageUsersAp(pageNumber);
  // };

  // const handleDelete = (id, name) => {
  //   Swal.fire({
  //     title: `Do you want to remove ${name}?  `,
  //     showConfirmButton: true,
  //     showCancelButton: true,
  //     confirmButtonText: "OK",
  //     cancelButtonText: "Cancel",
  //     icon: "warning",
  //   }).then((result) => {
  //     /* Read more about isConfirmed, isDenied below */
  //     if (result.isConfirmed) {
  //       Swal.fire(` ${name} has been removed `, "", "success");

  //       axios
  //         .put("http://localhost:5000/recordss/" + id)
  //         .then((response) => {
  //           allAdmins()
  //         })
  //         .catch((error) => console.log(error.message));

  //       // window.location.reload();
  //     } else Swal.fire(" Cancelled", "", "error");
  //   });
  // };

  // const UpdateRole = async (userId, roleN) => {
  //   try {
  //     const updatedUser = {
  //       // Update the properties of the user as needed
  //       flag: true,
  //     };

  //     await axios.put(`http://localhost:5000/api/beneficiarys/${userId}`, updatedUser);
  //     allAdmins()
  //   } catch (error) {
  //     console.error("Error updating user:", error);
  //   }
  // };


/////////////////////test
const [resorts, setResorts] = useState([]);

useEffect(() => {
  async function getResorts() {
    try {
      const response = await axios.get(
        "http://localhost:5000/pending-product"
      );
      setResorts(response.data.data.resorts);
      console.log(response.data.data.resorts);
    } catch (error) {
      console.log(error);
    }
  }

  getResorts();
}, []);
const alert = () => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Added Successfully ",
    showConfirmButton: false,
    timer: 1800,
  });
};

const handleReject = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/resorts/${id}`
    );
    setResorts(response.data.data.resorts);
  } catch (error) {
    console.log(error);
  }
};

const handleAccept = async (id) => {
  try {
    const response = await axios.post(`http://localhost:5000/resorts/${id}`);
    setResorts(response.data.data.resorts);
  } catch (error) {
    console.log(error);
  }
};
  return (
    <>
      <section className="w-full bg-fuchsia-100  ">
      <div className="">
        <h1 className="text-[30px] text-center font-bold py-3 ">الطلبات المعلقة</h1>
        {/* Start coding here */}
        <div className="bg-white dark:bg-gray-800  relative shadow-md  overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-white uppercase bg-fuchsia-800 dark:bg-gray-700 dark:text-gray-400">
          
              </thead>
              <tbody>
              <section
    id="Projects"
    
    className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
  > 
                {resorts.map((element, index) => {
                  return (
                    <div  key={element.id} className="w-72 bg-white pt-5 shadow-md rounded-xl ">
      
              
                      <img
                        src={element.photo}
                        alt="Product"
                        className="h-48 w-72 "
                      />
                      <div className="px-4 py-3 w-72">
                      
                        <p className="text-lg font-semibold text-black cursor-auto my-3">
                          الاسم :  {element.name}
                          </p>
                          <p className="text-lg font-semibold text-black cursor-auto my-3">
                          الوصف :  {element.description}            </p>
                  
                      </div>
                      
                      <div className="py-3  px-10 mt-32 sm:mt-0 flex gap-4">
                    <button  className="mb-10 p-2  bg-fuchsia-800  text-white shadow hover:bg-fuchsia-200 hover:text-fuchsia-800   "
         variant="text"   onClick={(event) => {
          alert();
          handleAccept(element.id);
        }}>قبول</button>
               
         <button className="mb-10 p-2  bg-[#dc2626]  text-white shadow hover:bg-[#991b1b] hover:text-black   "
         variant="text"     onClick={(event) => {
          handleReject(element.id);
        }}>حذف </button>
   </div>
                      
                       
                  </div>
            

                  );
                })}
                </section>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>






    </>
  );
};

export default PendingPosts