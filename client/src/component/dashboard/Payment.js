import Icon from "@mdi/react";
import { mdiDelete } from "@mdi/js";
import { mdiFileEdit } from "@mdi/js";
import Pagination from "@mui/material/Pagination";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { mdiHumanEdit } from "@mdi/js";
import Swal from "sweetalert2";
import { mdiSilverware } from "@mdi/js";
import { mdiShieldCrownOutline } from "@mdi/js";
import { mdiAccountOutline } from "@mdi/js";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
const PaymentsInfo = () => {
  const [persons, setPersons] = useState([]);
  const [persons0, setPersons0] = useState([]);

  const [searchTermUsers, setSearchTermUsers] = useState("");
  const [FilterDataUsers, setFilterDataUsers] = useState([]);
  const [HandleP, setHandleP] = useState();

  const allUsers = async () => {
    const token = localStorage.getItem("auth");
    try {
      // Send the data to the server using an HTTP POST request
      const response = await axios.get("http://localhost:5000/api/payments");
      console.log(response.data);
      setPersons(response.data);
      setFilterDataUsers(response.data);
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  };

  useEffect(() => {
    allUsers();
   }, []);

  //-----------------------search------------------------//

  const filterDataByNameUsers = (searchTermUsers) => {
    const filteredDataUsers = persons.filter((item) =>
      item.firstName.toLowerCase().includes(searchTermUsers.toLowerCase())
    );
    setFilterDataUsers(filteredDataUsers);
    console.log(filteredDataUsers);
    setCurrentPageUsers(1);
  };

  const [currentPageUsers, setCurrentPageUsers] = useState(1);
  let totalItemsUsers;

  let totalPagesUsers;

  let slicedArrayUsers;

  const itemsPerPage = 2;

  totalItemsUsers = FilterDataUsers.length;

  totalPagesUsers = Math.ceil(totalItemsUsers / itemsPerPage);

  const startIndexUsers = (currentPageUsers - 1) * itemsPerPage;

  const endIndexUsers = startIndexUsers + itemsPerPage;

  slicedArrayUsers = FilterDataUsers.slice(startIndexUsers, endIndexUsers);

  const handlePageChangeUsers = (event, pageNumber) => {
    setCurrentPageUsers(pageNumber);
  };

  const handleDelete = (id, name) => {
    Swal.fire({
      title: `Do you want to remove ${name}?  `,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      icon: "warning",
    }).then( async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire(` ${name} has been removed `, "", "success");

        
          try {
            await axios.delete(`http://localhost:5000/api/users/${id}`);
            allUsers(); // Refresh the user list after deleting a user
          } catch (error) {
            console.error("Error deleting user:", error);
          }
      
        // window.location.reload();
      } else Swal.fire(" Cancelled", "", "error");
    });
  };

  const UpdateRole = async (userId, roleN) => {
    try {
      const updatedUser = {
        // Update the properties of the user as needed
        role: roleN,
      };

      await axios.put(`http://localhost:5000/api/users/${userId}`, updatedUser);
      allUsers()
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleUpdate = (userid, typeid, name) => {
    let role = typeid == 0 ? "user" : "admin";
    let role2 = typeid == 1 ? "user" : "admin";
    let text1 = "";
    let text2 = "";
    if (role == "user") {
      text1 = `Do you want to switch ${name} to admin `;
      text2 = ` ${name} is now an admin `;
    } else {
      text1 = `Do you want to switch ${name} to user `;
      text2 = ` ${name} is now a user `;
    }
    Swal.fire({
      title: text1,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      icon: "warning",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        let roleN;
        if (typeid == 0) {
          roleN = 1;
        } else {
          roleN = 0;
        }

        UpdateRole(userid, roleN);

        Swal.fire(text2, "", "success");

        // window.location.reload();
      } else Swal.fire(" Cancelled", "", "error");
    });
  };


  const [showCard ,setShowCard]= useState()

  function handleShowCard(e){
    setShowCard(e)
  }

  return (
    <>
      <div className="bg-[#ffffff] mr-5 ml-5 p-10 rounded-2xl min-h-[calc(100vh)]   ">
        <div className="relative flex items-center justify-between pt-4">
          <div className="text-xl font-bold text-navy-700 dark:text-white">
            Payments
          </div>
        </div>

        <form>
          <div className="relative mt-5">
            <input
              type="text"
              id="search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              required=""
              value={searchTermUsers}
              onChange={(e) => {
                setSearchTermUsers(e.target.value);
                filterDataByNameUsers(e.target.value);
              }}
            />
          </div>
        </form>

        <div className="mt-8 overflow-x-scroll xl:overflow-hidden ">
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
                  <p className="text-xs tracking-wide text-gray-600">email</p>
                </th>
                <th
                  colSpan={1}
                  role="columnheader"
                  title="Toggle SortBy"
                  className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700"
                  style={{ cursor: "pointer" }}
                >
                  <p className="text-xs tracking-wide text-gray-600">price</p>
                </th>
                <th
                  colSpan={1}
                  role="columnheader"
                  title="Toggle SortBy"
                  className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700"
                  style={{ cursor: "pointer" }}
                >
                  <p className="text-xs tracking-wide text-gray-600">donationCase</p>
                </th>


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

            {slicedArrayUsers.map((e) => {
              return (
                <tbody role="rowgroup">
                  <tr role="row">
                    <td
                      className="pt-[14px] pb-[18px] sm:text-[14px] flex items-center"
                      role="cell"
                    >
                      <div onClick={()=>handleShowCard(e)} className="h-[30px] w-[30px] rounded-full">
                        <img
                          src="https://images.unsplash.com/photo-1506863530036-1efeddceb993?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2244&q=80"
                          className="h-full w-full rounded-full"
                          alt=""
                        />
                      </div>

                      <p className="text-sm font-bold text-navy-700 dark:text-white ml-3">
                        {e.firstName}
                      </p>
                    </td>
                    <td
                      className="pt-[14px] pb-[18px] sm:text-[14px]"
                      role="cell"
                    >
                      <div className="flex items-center gap-2">
                        <div className="rounded-full text-xl">
                          <p className="text-sm font-bold text-navy-700 dark:text-white">
                            {e.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td
                      className="pt-[14px] pb-[18px] sm:text-[14px]"
                      role="cell"
                    >
                      <p className="text-sm font-bold text-navy-700 dark:text-white">
                        {e.currentPrice} $
                      </p>
                    </td>
                    <td
                      className="pt-[14px] pb-[18px] sm:text-[14px]"
                      role="cell"
                    >
                      <p  className="text-sm font-bold text-navy-700 dark:text-white">
                     {e.donationCase}
                      </p>
                    </td>

      

                    <td
                      className="pt-[14px] pb-[18px] sm:text-[14px]"
                      role="cell"
                    >
                      <button
                        onClick={() => handleDelete(e._id, e.firstName)}
                      >
                        <Icon color="red" path={mdiDelete} size={1} />
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>

          <div className="flex w-full justify-center mt-5">
            {
              <Pagination
                count={totalPagesUsers}
                page={currentPageUsers}
                onChange={handlePageChangeUsers}
              />
            }
          </div>
        </div>








        <Card className=" mt-10 w-[22rem] mr-3 ">
            <CardHeader color="blue-gray" className="relative h-57">
              {/* <img
                src="https://media.istockphoto.com/id/1303833951/photo/vet-doctor-examining-labrador-dog.jpg?b=1&s=612x612&w=0&k=20&c=9pXgoWE5ai_faijylnCLpyORSiGKG0jxqBsLlNdntE8="
                alt="img-blur-shadow"
                layout="fill"
              /> */}
              {/* <img className="h-80 w-full" src={POST?.image}/> */}
           
            </CardHeader>
            <CardBody>
              <div className="flex justify-between">
                <Typography variant="h5" className="mb-2 text-[#E8AA42]">
                  {showCard?.firstName}
                </Typography>
                <Typography variant="h5" className="mb-2 text-[#E8AA42]">
                  <span style={{color:"red"}}>${showCard?.currentPrice}</span>
                  {/* /${showCard?.price} */}
                </Typography>
              </div>
              <Typography>
                {showCard?.cardholder}
              </Typography>
              <Typography>
                {showCard?.donationType}
              </Typography>
              <Typography>
                {showCard?.donationCase}
              </Typography>
            </CardBody>
      

          </Card>










      </div>

    





    </>
  );
};

export default PaymentsInfo;
