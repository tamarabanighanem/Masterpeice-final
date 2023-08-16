
import { useState, useEffect, useContext } from "react";
import * as React from "react";
import axios from "axios";
import { Button } from "@material-tailwind/react";
import EditRequest from "../../component/EditRequest";
import EditProfile from "../../component/Editprofile";
import Swal from 'sweetalert2';
import { UserContext } from '../../UserContext';

import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
function ProfileUser({ userIdapp }) {
  const [image, setImg] = useState("");
  const { pagination, setItem, currentItems } = useContext(UserContext)

  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [approved, setApproved] = useState([])
  const [reqStatuse, setReqStatuse] = useState([])
  const [requestId, setRequestId] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [refresh, setRefresh] = useState(false)
  const [refresh2, setRefesh2] = useState(false)
  const [accepted, setAccepted] = useState(false);
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  const onChange = (e) => {
    const files = e.target.files;
    const file = files[0];
    getBase64(file);
    console.log(image);
  };

  const onLoad = (fileString) => {
    setImg(fileString);
  };

  const getBase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      onLoad(reader.result);
    };
  };

  const handleOpen = (id) => {
    setOpen(true);
    setRequestId(id);
  };

  const handleClose = () => setOpen(false);

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
        await axios.delete(`http://localhost:5000/request/${id}`);
        setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchData = async () => {
    try {
      const profileResponse = await axios.get(`http://localhost:5000/profileUser/${userIdapp}`);
      setUser(profileResponse.data[0]);

      const requestsResponse = await axios.get(`http://localhost:5000/requestOfeachuser/${userIdapp}`);
      setUsers(requestsResponse.data);
      setItem(requestsResponse.data)
    } catch (error) {
      console.log(error.message);
    }
    console.log(users.aproved)
    console.log(users.aproved)
    console.log(users)

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
  const handleAccept = async (id) => {

    try {
      const response = await axios.post(`http://localhost:5000/ApprovedrequestComefromUser/${id}`);
      // Assuming you want to set the "approved" state with the updated data
      setApproved(response.data.data.resort);
      setRefesh2(!refresh2)

    } catch (error) {
      console.log(error);
    }
  };
  console.log(approved)
  useEffect(() => {
    fetchData();
  }, [userIdapp, refresh, refresh2]);
  console.log(userIdapp)
  return (
    <>
      {/* component */}
      <link
        rel="stylesheet"
        href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"
      />
      <link
        rel="stylesheet"
        href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
      />

      <main className="profile-page">
        <section className="relative block h-500-px">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundPosition: 'bottom',
              backgroundImage:
                'url("https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80")',
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            />
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0px)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x={0}
              y={0}
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-gray-100">
          <div className="container mx-auto px-4 mt-10">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center mt-5">
                    <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2">
                      {/* {userData.firstName} */}
                    </h3>
                  </div>

                </div>
                <div className="text-center">
                  <div className="mb-2 text-blueGray-600">
                    <i className="fas fa-inbox ml-5 text-lg text-blueGray-400" />
                    {/* {userData.email} */}
                    {user.username || ""}
                  </div>


                  <div className="mb-2 text-blueGray-600">
                    <i className="fas fa-envelope ml-5 text-lg text-blueGray-400" />
                    {user.address || ""}
                  </div>  <div className="mb-2 text-blueGray-600">
                    <i className="fas fa-phone ml-5 text-lg text-blueGray-400" />
                    {user.domain || ""}
                  </div>
                </div>

                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full justify-center lg:w-9/12 px-4">


                      <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                        "الخياطة هي فن يجمع بين الإبداع والدقة، حيث تتحول الأقمشة العادية إلى قطع فريدة من الملابس التي تعكس ذوقًا وشخصية المرتدي. بين خيوط الإبرة وصانعة الملابس تنبض قصصٌ لا تُروى، وتنسج أحلام وأفكار تتجسد في تصاميم مبتكرة. دعنا نستكشف معًا عالم الخياطة والتصميم، حيث يلتقي الفن والموضة وتتحقق الأحلام والأفكار في أجمل الأزياء المصممة والمعدلة بمهارة وحب."





                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4  lg:order-3 lg:text-right lg:self-center">
                  <div className="py-6 px-3 mt-32 sm:mt-0">
                    <EditProfile userIdapp={userIdapp}
                      refreshh={refresh}
                      setRefreshh={setRefresh}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
            <div className="text-center mt-20 p-10">
              <h1 className="font-bold text-3xl bg-gray-300 p-5 w-full rounded-xl  mb-4">        طلباتي
              </h1>

            </div>
            <section
              id="Projects"

              className="w-full mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
            >
              {users.length === 0 ? (<>
                <div className="text-4xl  w-full pt-52  justify-center flex items-center  text-neutral-800  dark:text-neutral-50">
                  لا توجد طلبات للعرض  😢
                </div>
                <div>لطلب تصميم من مخيطتك المفضلة <Link className="text-fuchsia-900 text-sm  underline" to={'/stisched'}>اضغط هنا</Link></div>
                <div className="text-4xl  w-full py-48 justify-center flex items-center  text-neutral-800  dark:text-neutral-50">
                </div>
              </>
              ) : (

                <div className="relative w-full overflow-x-auto">
                  {/* <h1>جميع الطلبات</h1> */}

                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs border text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr className=''><th colSpan="5" scope="col" className='px-6 py-6 text-lg text-center'>جميع الطلبات</th></tr>

                      <tr>
                        <th scope="col" className="px-6 py-3">
                          صورة
                        </th>
                        <th scope="col" className="px-6 py-3">
                          الوصف                    </th>
                        <th scope="col" className="px-6 py-3">
                          رقم الهاتف
                        </th>
                        <th scope="col" className="px-6 py-3">
                          حالة الطلب
                        </th>
                        {/* <th scope="col" className="px-6 py-3">
                      Price
                    </th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems?.map((post) => {
                        return (
                          <tr key={post.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">



                            <td className="px-6 py-4">  <img
                              src={post.photo}
                              alt="Product"
                              className="h-20 w-20 object-cover rounded-t-xl"
                            /></td>
                            <td className="px-6 py-4">{post.description}</td>
                            <td className="px-6 py-4"> {post.phone}</td>
                            {post.aproved && !post.approveduser ?(
                            <td className="px-6 py-4">تم القبول الطلب التكلفة = {post.price}
                             <p>هل تود الاستمرار؟</p> 
                             <button
                                      className="mb-10 p-2 ml-2 bg-[#dc2626] text-white shadow hover:bg-[#991b1b] hover:text-black"
                                      variant="text"
                                      onClick={(event) => {
                                        handleDeleterequist(post.id);
                                      }}
                                    >
                                      حذف
                                    </button>
                                    {/* تغيير الزر الحالي لزر قبول يحتوي على الشروط */}
                                    <button
                                      className="mb-10 p-2 bg-fuchsia-800 text-white shadow hover:bg-fuchsia-200 hover:text-fuchsia-800"
                                      variant="text"
                                      onClick={(event) => {
                                        // setAccepted(true); // تحديث المتغير للإشارة إلى القبول
                                        handleAccept(post.id);
                                      }}
                                    >
                                      قبول
                                    </button>
                                  

                            </td>
                            ): post.aproved && post.approveduser && post.statuse ?  (<>
                             <div className="text-green-600 px-6 pt-11" variant="text">
                            الطلب جاهز
                          </div>
                            </>) : post.aproved && post.approveduser && !post.statuse ? (
                              <>
                              <div className="text-[#dc2626] px-6 py-4" variant="text">
                            الطلب قيد التنفيذ
                          </div>
                              </>
                            ):(<>   <div className=" px-6 pt-11  text-[#dc2626] " variant="text">
                            لم يتم قول الطلب بعد
                          </div></>)
                            }
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>

                </div>
              )}

            </section>
            {pagination}
          </div>
        </section>

      </main>
    </>
  );
}

export default ProfileUser;
