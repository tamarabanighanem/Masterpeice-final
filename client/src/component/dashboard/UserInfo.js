import Icon from "@mdi/react";
import { mdiDelete } from "@mdi/js";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { mdiSilverware } from "@mdi/js";
import { mdiShieldCrownOutline } from "@mdi/js";
import { mdiAccountOutline } from "@mdi/js";
import { UserContext } from '../../UserContext';

const UsersInfo = () => {
  const {pagination,setItem,currentItems}=useContext(UserContext)
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await axios.get("http://localhost:5000/allusers");
        console.log(response.data.data.users);
        setUsers(response.data.data.users);
        setItem(response.data.data.users)
      
      } catch (error) {
        console.log(error);
      }
    }

    getUsers();
  }, []);

  const handleDelete = async (id) => {
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
        await axios.delete(`http://localhost:5000/api/users/${id}`);
        window.location.reload();
      }
    } catch (error) {
      // Handle error if necessary
    }
  };



  return (
    <>
      <div className="bg-[#ffffff] mr-5 ml-5 p-10 rounded-2xl min-h-[calc(100vh)]   ">
        <div className="relative flex items-center justify-between pt-4">
          <div className="text-xl font-bold text-navy-700 dark:text-white">
المستخدمين          </div>
        </div>


        <div className="mt-8 overflow-x-scroll xl:overflow-hidden ">
          <table role="table" className="w-full">
            <thead>
              <tr role="row">
                <td
                  colSpan={1}
                  role="columnheader"
                  title="Toggle SortBy"
                  className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700"
                  style={{ cursor: "pointer" }}
                >
                  <p className="text-xs tracking-wide text-gray-600">الاسم</p>
                </td>
                <td
                  colSpan={1}
                  role="columnheader"
                  title="Toggle SortBy"
                  className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700"
                  style={{ cursor: "pointer" }}
                >
                  <p className="text-xs tracking-wide text-gray-600">البريد الالكتروني</p>
                </td>
                <td
                  colSpan={1}
                  role="columnheader"
                  title="Toggle SortBy"
                  className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700"
                  style={{ cursor: "pointer" }}
                >
                  <p className="text-xs tracking-wide text-gray-600">العنوان</p>
                </td>
                <td
                  colSpan={1}
                  role="columnheader"
                  title="Toggle SortBy"
                  className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700"
                  style={{ cursor: "pointer" }}
                >
                  <p className="text-xs tracking-wide text-gray-600">الدور</p>
                </td>

                <td
                  colSpan={1}
                  role="columnheader"
                  title="Toggle SortBy"
                  className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700"
                  style={{ cursor: "pointer" }}
                >
                  <p className="text-xs tracking-wide text-gray-600">حذف</p>
                </td>
              </tr>
            </thead>

            {currentItems.map((e) => {
              return (
                <tbody role="rowgroup">
                  <tr role="row">
                    <td
                      className="pt-[14px] pb-[18px] pr-28 sm:text-[14px] flex items-center"
                      role="cell"
                    >
                    

                      <p className="text-sm font-bold text-navy-700 dark:text-white ml-3">
                        {e.username}
                      </p>
                    </td>
                    <td
                      className="pt-[14px] pr-28 pb-[18px] sm:text-[14px]"
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
                      className="pt-[14px] pr-28 pb-[18px] sm:text-[14px]"
                      role="cell"
                    >
                      <p className="text-sm font-bold text-navy-700 dark:text-white">
                        {e.address}
                      </p>
                    </td>
                    <td
                      className="pt-[14px] pr-28 pb-[18px] sm:text-[14px]"
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
                    <td
                      className="pt-[14px] pr-28 pb-[18px] sm:text-[14px]"
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
{pagination}
        </div>
      </div>
    </>
  );
};

export default UsersInfo;
