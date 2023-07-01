import { useState, useEffect } from "react";
import * as React from "react";
import axios from "axios";
import { Button } from "@material-tailwind/react";
import EditRequest from "../../component/EditRequest";
import EditProfile from "../../component/Editprofile";
import Swal from 'sweetalert2';
function ProfileUser({userIdapp}) {

  // console.log(userIdapp)
  const [image, setImg] = useState("");
  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [description, setdescription] = useState("");
console.log(userIdapp)
console.log(userIdapp)
console.log(userIdapp)
console.log(userIdapp)

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

  const [user, setUser] = useState({});
  useEffect(() => {
  
      axios
        .get(`http://localhost:5000/profileUser/${userIdapp}`)
        .then((response) => {
          setUser(response.data[0]);
          console.log(response.data);
          console.log(userIdapp);
        })
        .catch((error) => console.log(error.message));
    // }
  }, [userIdapp]);
  

  const [users, setUsers] = useState([]);

useEffect(() => {
  axios
    .get(`http://localhost:5000/requestOfeachuser/${userIdapp}`)
    .then((response) => {
      setUsers(response.data);
      console.log(response.data)
      // Assuming there is only one user with the given ID
    })
    .catch((error) => console.log(error.message));
}, [userIdapp]);


const [requestId,setRequestId]=useState(0)

const [open, setOpen] = React.useState(false);
  const handleOpen = (id) =>{ setOpen(true)
    setRequestId(id)
  };
  const handleClose = () => setOpen(false);

  console.log(requestId)
  console.log(requestId)
  console.log(requestId)
  console.log(requestId)
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
        await axios.delete("http://localhost:5000/request/" + id);
        window.location.reload();
      }
    } catch (error) {
      // Handle error if necessary
    }
  };
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
              backgroundPosition:'bottom',
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
                    {user.username ||""}
                  </div>


                  <div className="mb-2 text-blueGray-600">
                    <i className="fas fa-phone ml-5 text-lg text-blueGray-400" />
                    {user.address ||""}
                  </div>
                </div>
            
                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full justify-center lg:w-9/12 px-4">
                    {user.domain||""}
      
                      <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                      "الخياطة هي فن يجمع بين الإبداع والدقة، حيث تتحول الأقمشة العادية إلى قطع فريدة من الملابس التي تعكس ذوقًا وشخصية المرتدي. بين خيوط الإبرة وصانعة الملابس تنبض قصصٌ لا تُروى، وتنسج أحلام وأفكار تتجسد في تصاميم مبتكرة. دعنا نستكشف معًا عالم الخياطة والتصميم، حيث يلتقي الفن والموضة وتتحقق الأحلام والأفكار في أجمل الأزياء المصممة والمعدلة بمهارة وحب."





                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4  lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
<EditProfile userIdapp={userIdapp}/>                 
   </div>
                  </div>
              </div>
            </div>
          </div>
          <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
          <div className="text-center mt-16">
      <h1 className="text-3xl text-gray-800 font-semibold"> طلباتي</h1>
      <p className="mt-3 text-gray-500">
        المدونات التي يحبها المجتمع. يتم تحديثها كل ساعة.
      </p>
    </div>
          <section
    id="Projects"
    className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
  >          {users?.map((post) => {
                    return (
    <div key={post.id}  className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
      {/* <Link to={`/Product/${post.id}`}key={post.id}> */}
        <img
          src={post.photo}
          alt="Product"
          className="h-80 w-72 object-cover rounded-t-xl"
        />
        <div className="px-4 py-3 w-72">
          {/* <p className="text-lg font-bold text-black truncate block capitalize">
          {post.name}
          </p> */}
          <p className="text-lg font-semibold text-black cursor-auto my-3">
              {post.description} 
            </p>
          <div className="flex items-center">
            <p className="text-lg font-semibold text-black cursor-auto my-3">
              {post.price}
            </p>
            <del>
              <p className="text-sm text-gray-600 cursor-auto ml-2">$199</p>
            </del>
            
            <div className="ml-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                fill="currentColor"
                className="bi bi-bag-plus"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                />
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
              </svg>
            </div>
          </div>
        </div>
      {/* </Link> */}
      {/* <div className="py-6 px-3 mt-32 sm:mt-0">
                    <Button  className="mb-10  bg-fuchsia-800  text-white shadow hover:bg-fuchsia-200 hover:text-fuchsia-800   "
         variant="text" onClick={()=>handleOpen(post.id)}>تعديل </Button>
         <EditRequest requestId={requestId} open={open} close={handleClose}/> */}
               
               <div className="py-3 px-10 mt-32 sm:mt-0 flex gap-4">
                    <Button  className="mb-10  bg-fuchsia-800  text-white shadow hover:bg-fuchsia-200 hover:text-fuchsia-800   "
         variant="text" onClick={()=>handleOpen(post.id)}>تعديل </Button>
         <EditRequest productId={requestId} open={open} close={handleClose}/>
               
         <Button  className="mb-10  bg-[#dc2626]  text-white shadow hover:bg-[#991b1b] hover:text-black   "
         variant="text"   onClick={() => handleDelete(post.id)}>حذف {post.id}</Button>
   </div>
   </div>
    // </div>
        );
      })}
      </section>
      </div>
        </section>
  
      </main>
    </>
  );
}

export default ProfileUser;
