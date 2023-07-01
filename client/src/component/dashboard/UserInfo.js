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

const UsersInfo = () => {
  const [persons, setPersons] = useState([]);
  const [persons0, setPersons0] = useState([]);

  const [searchTermUsers, setSearchTermUsers] = useState("");
  const [FilterDataUsers, setFilterDataUsers] = useState([]);
  const [HandleP, setHandleP] = useState();

  const allUsers = async () => {
    const token = localStorage.getItem("auth");
    try {
      // Send the data to the server using an HTTP POST request
      const response = await axios.get("http://localhost:5000/api/users", {
        headers: {
          Authorization: token,
        },
      });

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


  /////////////////////////تجربة
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await axios.get("http://localhost:5000/allusers");
        console.log(response.data.data.users);
        setUsers(response.data.data.users);

        console.log(users);
        console.log(users);
        console.log(users);
      } catch (error) {
        console.log(error);
      }
    }

    getUsers();
  }, []);
  //-----------------------search------------------------//
//   const [filterDataUsers, setFilterDataUsers] = useState([]);

// const filterDataByNameUsers = (searchTermUsers) => {
//   const filteredDataUsers = users.filter((item) =>
//     item.username.toLowerCase().includes(searchTermUsers.toLowerCase())
//   );
//   setFilterDataUsers(filteredDataUsers);
// };

// useEffect(() => {
//   setFilterDataUsers(users);
// }, [users]);
///////////
  const filterDataByNameUsers = (searchTermUsers) => {
    const filteredDataUsers = users.filter((item) =>
      item.username.toLowerCase().includes(searchTermUsers.toLowerCase())
    );
    setFilterDataUsers(filteredDataUsers);
    console.log(filteredDataUsers);
    setCurrentPageUsers(1);
  };
  useEffect(() => {
    setFilterDataUsers(users);
  }, [users]);
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
            console.log(allUsers)
            console.log(allUsers)
            console.log(allUsers)
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
    let role = typeid == 'مستخدم' ? "مستخدم" : "admin";
    let role2 = typeid == "مخيطة" ? "مستخدم" : "admin";
    let text1 = "";
    let text2 = "";
    if (role == "مستخدم") {
      text1 = `Do you want to switch ${name} to admin `;
      text2 = ` ${name} is now an admin `;
    } else {
      text1 = `Do you want to switch ${name} to مستخدم `;
      text2 = ` ${name} is now a مستخدم `;
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

  return (
    <>
      <div className="bg-[#ffffff] mr-5 ml-5 p-10 rounded-2xl min-h-[calc(100vh)]   ">
        <div className="relative flex items-center justify-between pt-4">
          <div className="text-xl font-bold text-navy-700 dark:text-white">
            Users 
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
                  <p className="text-xs tracking-wide text-gray-600">الاسم</p>
                </th>
                <th
                  colSpan={1}
                  role="columnheader"
                  title="Toggle SortBy"
                  className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700"
                  style={{ cursor: "pointer" }}
                >
                  <p className="text-xs tracking-wide text-gray-600">البريد الالكتروني</p>
                </th>
                <th
                  colSpan={1}
                  role="columnheader"
                  title="Toggle SortBy"
                  className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700"
                  style={{ cursor: "pointer" }}
                >
                  <p className="text-xs tracking-wide text-gray-600">العنوان</p>
                </th>
                <th
                  colSpan={1}
                  role="columnheader"
                  title="Toggle SortBy"
                  className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700"
                  style={{ cursor: "pointer" }}
                >
                  <p className="text-xs tracking-wide text-gray-600">الدور</p>
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
                  <p className="text-xs tracking-wide text-gray-600">حذف</p>
                </th>
              </tr>
            </thead>

            {FilterDataUsers.map((e) => {
              return (
                <tbody role="rowgroup">
                  <tr role="row">
                    <td
                      className="pt-[14px] pb-[18px] sm:text-[14px] flex items-center"
                      role="cell"
                    >
                      {/* <div className="h-[30px] w-[30px] rounded-full">
                        <img
                          src="https://images.unsplash.com/photo-1506863530036-1efeddceb993?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2244&q=80"
                          className="h-full w-full rounded-full"
                          alt=""
                        />
                      </div> */}

                      <p className="text-sm font-bold text-navy-700 dark:text-white ml-3">
                        {e.username}
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
                        {e.address}
                      </p>
                    </td>
                    <td
                      className="pt-[14px] pb-[18px] sm:text-[14px]"
                      role="cell"
                    >
                      <p className="text-sm font-bold text-navy-700 dark:text-white">
                        {
                        e.role == "مستخدم" ? (
                          <div className=" w-10 flex flex-col justify-center items-center">
                            {" "}
                            <Icon path={mdiAccountOutline} size={1} />{" "}
                            <span>مستخدم</span>{" "}
                          </div>
                        ) : e.role == "admin" ? (
                          <div className=" w-10 flex flex-col justify-center items-center">
                            {" "}
                            <Icon path={mdiShieldCrownOutline} size={1} />{" "}
                            <span>Admin</span>{" "}
                          </div>
                        ) : (

                          <div className=" w-10 flex flex-col justify-center items-center">
                          {" "}
                          <Icon  path={mdiSilverware} size={1} />
                          {" "}
                          <span>مخيطة</span>{" "}
                        </div>

                        )
                      }

                      </p>
                    </td>

                    {/* <td
                      className="pt-[14px] pb-[18px] sm:text-[14px]"
                      role="cell"
                    >
                      <button
                        onClick={() => handleUpdate(e.id, e.role, e.username)}
                      >
                       
                          <Icon color="blue" path={mdiHumanEdit} size={1} />
                       
                      </button>
                    </td> */}

                    <td
                      className="pt-[14px] pb-[18px] sm:text-[14px]"
                      role="cell"
                    >
                      <button
                        onClick={() => handleDelete(e.id, e.username)}
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
    </>
  );
};

export default UsersInfo;
