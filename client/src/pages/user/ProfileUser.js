
import { useState, useEffect } from "react";
import * as React from "react";
import axios from "axios";
import { Button } from "@material-tailwind/react";
import EditRequest from "../../component/EditRequest";
import EditProfile from "../../component/Editprofile";
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";

function ProfileUser({ userIdapp }) {
  const [image, setImg] = useState("");

  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [approved, setApproved] = useState([])
  const [reqStatuse, setReqStatuse] = useState([])
  const [requestId, setRequestId] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [refresh, setRefresh] = useState(false)
  const [refresh2, setRefesh2] = useState(false)
  const [accepted, setAccepted] = useState(false);
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
      console.log(response.data.data.resort)
      console.log(response.data)
      setApproved(response.data.data.resort);
      console.log(approved.approveduser)
      console.log(approved)
      console.log(approved)

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
                users?.map((post) => {
                  return (
                    <div className="p-5 grid grid-cols-1 ">
                      <div key={post.id} className=" flex flex-col rounded-t-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 md:max-w-xl md:flex-row">
                        <img
                          className="  object-cover  md:w-48 md:rounded-none md:rounded-t-lg"
                          src={post.photo}
                          alt=""
                        />
                        <div className="flex flex-col  justify-start p-6">
                          <h5 className="mb-2 text-xl  font-medium text-neutral-800 dark:text-neutral-50">
                            الوصف :   {post.description}  {post.aproved}  </h5>
                          <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                            This is a wider card with supporting text below as a natural lead-in to
                            additional content. This content is a little bit longer.
                          </p>
                          <p className="text-xs text-neutral-500 dark:text-neutral-300">
                            رقم الهاتف :   {post.phone}     </p>
                          {post.aproved ? (
                            <div><p className="text-red-500 border-l-4 mr-32 font-bold">لا يمكن التعديل على الطلب </p></div>

                          ) : (<div className=" pt-10  sm:mt-0 flex gap-4">
                            <Button className="mb-10  bg-fuchsia-800  text-white shadow hover:bg-fuchsia-200 hover:text-fuchsia-800   "
                              variant="text" onClick={() => handleOpen(post.id)}>تعديل </Button>
                            <EditRequest productId={requestId} open={open} close={handleClose} refreshReq={refresh2} setrefreshReq={setRefesh2} />

                            <Button className="mb-10  bg-[#dc2626]  text-white shadow hover:bg-[#991b1b] hover:text-black   "
                              variant="text" onClick={() => handleDelete(post.id)}>حذف </Button>


                          </div>)}

                          {post.aproved ? (
                          <div className="mb-10 w-full bg-green-500 p-2 text-center rounded-b-lg text-white shadow" variant="text">
                            تم القبول الطلب التكلفة = {post.price}
                            <div>
                              {!approved.approveduser ? (
                                <>

                                  <div>
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
                                  </div>
                                </>
                              ) : (<>




                              </>)}
                              {/* عرض حالة الطلب بناءً على الشروط */}
                              {approved.approveduser ? (
                                <>
                                  {post.statuse ? (
                                    <p className="bg-green-500">تم تصميم القطعة بنجاح</p>
                                  ) : (
                                    <p className="bg-[#dc2626]">القطعة قيد التنفيذ</p>
                                  )}
                                </>
                              ) : (
                                <div>
                                  {post.statuse ? (
                                    <p className="bg-green-500">تم تصميم القطعة بنجاح</p>
                                  ) : (
                                    <p></p>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="mb-10 w-full p-2 text-center bg-[#dc2626] rounded-b-lg text-white shadow" variant="text">
                            لم يتم قول الطلب بعد
                          </div>
                        )}

                        </div>

                      </div>
                  
                    </div>
                  );
                }
                )
              )}
            </section>
          </div>
        </section>

      </main>
    </>
  );
}

export default ProfileUser;
