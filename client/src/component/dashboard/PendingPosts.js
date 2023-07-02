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
  
    const allAdmins = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/beneficiarysAdmin");
            setPersons(response.data);
          console.log(response.data)
          setFilterDataUsers(response.data)
          } catch (error) {
            console.error("Error inserting data:", error);
          }

     
          try {
            const response = await axios.get("http://localhost:5000/api/allBeneficiarysAdminAp");
            setPersonsAp(response.data);
          console.log(response.data)
          setFilterDataUsersAp(response.data)
          } catch (error) {
            console.error("Error inserting data:", error);
          }



        };

     
      useEffect(() => {
        allAdmins();
      }, []);
//-----------------------search------------------------//

const filterDataByNameUsers = (searchTermUsers) => {
    const filteredDataUsers = persons.filter((item) =>
      item.Name.toLowerCase().includes(searchTermUsers.toLowerCase())
    );
    setFilterDataUsers(filteredDataUsers);
    console.log(filteredDataUsers);
    setCurrentPageUsers(1);
  };
const filterDataByNameUsersAp = (searchTermUsers) => {
    const filteredDataUsers = personsAp.filter((item) =>
      item.Name.toLowerCase().includes(searchTermUsers.toLowerCase())
    );
    setFilterDataUsersAp(filteredDataUsers);
    console.log(filteredDataUsers);
    setCurrentPageUsersAp(1);
  };

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

  const handlePageChangeUsersAp = (event, pageNumber) => {
    setCurrentPageUsersAp(pageNumber);
  };

  const handleDelete = (id, name) => {
    Swal.fire({
      title: `Do you want to remove ${name}?  `,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      icon: "warning",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire(` ${name} has been removed `, "", "success");

        axios
          .put("http://localhost:5000/recordss/" + id)
          .then((response) => {
            allAdmins()
          })
          .catch((error) => console.log(error.message));

        // window.location.reload();
      } else Swal.fire(" Cancelled", "", "error");
    });
  };

  const UpdateRole = async (userId, roleN) => {
    try {
      const updatedUser = {
        // Update the properties of the user as needed
        flag: true,
      };

      await axios.put(`http://localhost:5000/api/beneficiarys/${userId}`, updatedUser);
      allAdmins()
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
      text1 = `Do you want to accept ${name} Post `;
      text2 = ` ${name} is now an admin `;
    } else {
      text1 = `Do you want to accept ${name}' Post `;
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
        <h1 className="text-[30px] font-bold py-3 ">الطلبات المعلقة</h1>
        {/* Start coding here */}
        <div className="bg-white dark:bg-gray-800  relative shadow-md  overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-white uppercase bg-fuchsia-800 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Hotel Name
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Location
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Description
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Number Of Rooms
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Imgs
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {resorts.map((element, index) => {
                  return (
                    <tr
                      className="border-b dark:border-gray-700"
                      key={element.id}
                    >
                      <th
                        scope="row"
                        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {element.name}
                      
                      </th>
                      <td className="px-4 py-3">{element.location}</td>
                      <td className="px-4 py-3">{element.rating}</td>
                      <td className="px-4 py-3">5 </td>
                      <td className="px-4 py-3">🏢</td>
                      <td className="px-4 py-3 flex items-center justify-end">
                        <div
                          id=""
                          className="bg-white flex  rounded divide-y divide-gray-100 gap-2  "
                        >
                          <div
                            className="tooltip tooltip-success text-white "
                            data-tip="Accept"
                          >
                            <button
                              onClick={(event) => {
                                alert();
                                handleAccept(element.id);
                              }}
                              className="btn bg-white hover:bg-green-200 shadow-lg hover:shadow-xl border-none "
                            >
                              <CiCircleCheck className="text-green-500 text-[20px]" />
                            </button>
                          </div>
                          <div
                            className="tooltip tooltip-error text-white"
                            data-tip="Reject"
                          >
                            <button
                              onClick={(event) => {
                                handleReject(element.id);
                              }}
                              className="btn bg-white hover:bg-red-200 shadow-lg hover:shadow-xl border-none "
                            >
                              <CiCircleRemove className="text-red-500 text-[20px]" />
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
      {/* <div className="bg-[#ffffff] mr-5 ml-5 p-10 rounded-2xl min-h-[calc(100vh)]   ">
        <div className="relative flex items-center justify-between pt-4">
          <div className="text-xl font-bold text-navy-700 dark:text-white">
            Pending Posts
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
                  <p className="text-xs tracking-wide text-gray-600">location</p>
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
                  <p className="text-xs tracking-wide text-gray-600">role</p>
                </th>

                <th
                  colSpan={1}
                  role="columnheader"
                  title="Toggle SortBy"
                  className="border-b border-gray-200 pr-10 pb-[10px] text-start dark:!border-navy-700"
                  style={{ cursor: "pointer" }}
                >
                  <p className="text-xs tracking-wide text-gray-600">Approve</p>
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
                      <div className="h-[30px] w-[30px] rounded-full">
                        <img
                          src="https://images.unsplash.com/photo-1506863530036-1efeddceb993?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2244&q=80"
                          className="h-full w-full rounded-full"
                          alt=""
                        />
                      </div>

                      <p className="text-sm font-bold text-navy-700 dark:text-white ml-3">
                        {e.Name}
                      </p>
                    </td>
                    <td
                      className="pt-[14px] pb-[18px] sm:text-[14px]"
                      role="cell"
                    >
                      <div className="flex items-center gap-2">
                        <div className="rounded-full text-xl">
                          <p className="text-sm font-bold text-navy-700 dark:text-white">
                            {e.location}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td
                      className="pt-[14px] pb-[18px] sm:text-[14px]"
                      role="cell"
                    >
                      <p className="text-sm font-bold text-navy-700 dark:text-white">
                        {e.price}
                      </p>
                    </td>
                    <td
                      className="pt-[14px] pb-[18px] sm:text-[14px]"
                      role="cell"
                    >
                      <p className="text-sm font-bold text-navy-700 dark:text-white">
                        
                        
                          <div className=" w-10 flex flex-col justify-center items-center">
                            {" "}
                            <Icon path={mdiHandshakeOutline} size={1} />{" "}
                            <span>user</span>{" "}
                          </div>
                         

                        
                      

                      </p>
                    </td>

                    <td
                      className="pt-[14px] pb-[18px] sm:text-[14px]"
                      role="cell"
                    >
                      <button
                        onClick={() => handleUpdate(e._id, e.role, e.Name)}
                      >
                       
                          <Icon color="blue" path={mdiCheckDecagram } size={1} />
                       
                      </button>
                    </td>

                    <td
                      className="pt-[14px] pb-[18px] sm:text-[14px]"
                      role="cell"
                    >
                      <button
                        onClick={() => handleDelete(e.userid, e.username)}
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
      </div>



     

      <div className="bg-[#ffffff] mr-5 ml-5 p-10 rounded-2xl min-h-[calc(100vh)]   ">
        <div className="relative flex items-center justify-between pt-4">
          <div className="text-xl font-bold text-navy-700 dark:text-white">
            Pending Posts
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
              value={searchTermUsersAp}
              onChange={(e) => {
                setSearchTermUsersAp(e.target.value);
                filterDataByNameUsersAp(e.target.value);
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
                  <p className="text-xs tracking-wide text-gray-600">location</p>
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
                  <p className="text-xs tracking-wide text-gray-600">role</p>
                </th>

                <th
                  colSpan={1}
                  role="columnheader"
                  title="Toggle SortBy"
                  className="border-b border-gray-200 pr-10 pb-[10px] text-start dark:!border-navy-700"
                  style={{ cursor: "pointer" }}
                >
                  <p className="text-xs tracking-wide text-gray-600">Approve</p>
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

            {slicedArrayUsersAp.map((e) => {
              return (
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

                      <p className="text-sm font-bold text-navy-700 dark:text-white ml-3">
                        {e.Name}
                      </p>
                    </td>
                    <td
                      className="pt-[14px] pb-[18px] sm:text-[14px]"
                      role="cell"
                    >
                      <div className="flex items-center gap-2">
                        <div className="rounded-full text-xl">
                          <p className="text-sm font-bold text-navy-700 dark:text-white">
                            {e.location}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td
                      className="pt-[14px] pb-[18px] sm:text-[14px]"
                      role="cell"
                    >
                      <p className="text-sm font-bold text-navy-700 dark:text-white">
                        {e.price}
                      </p>
                    </td>
                    <td
                      className="pt-[14px] pb-[18px] sm:text-[14px]"
                      role="cell"
                    >
                      <p className="text-sm font-bold text-navy-700 dark:text-white">
                        
                        
                          <div className=" w-10 flex flex-col justify-center items-center">
                            {" "}
                            <Icon path={mdiHandshakeOutline} size={1} />{" "}
                            <span>user</span>{" "}
                          </div>
                         

                        
                      

                      </p>
                    </td>

                    <td
                      className="pt-[14px] pb-[18px] sm:text-[14px]"
                      role="cell"
                    >
                      <button
                        onClick={() => handleUpdate(e._id, e.role, e.Name)}
                      >
                       
                          <Icon color="blue" path={mdiCheckDecagram } size={1} />
                       
                      </button>
                    </td>

                    <td
                      className="pt-[14px] pb-[18px] sm:text-[14px]"
                      role="cell"
                    >
                      <button
                        onClick={() => handleDelete(e.userid, e.username)}
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
                count={totalPagesUsersAp}
                page={currentPageUsersAp}
                onChange={handlePageChangeUsersAp}
              />
            }
          </div>
        </div>
      </div>


 */}



    </>
  );
};

export default PendingPosts