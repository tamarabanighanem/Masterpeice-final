// import EditProfileBeneficiary from "./EditProfileBeneficiary";
import { useState, useEffect } from "react";
import * as React from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
import { Button } from "@material-tailwind/react";
import Swal from 'sweetalert2';
// import Cards from "./CardsBeneficiary";
import EditProfile from "../../component/Editprofile";
import Editproduct from "../../component/Editproduct";
// import img2 from '../images/thomas-william-6Sls-TB27kM-unsplash.jpg'
import img2 from '../../images/filipp-romanovski-8k1xDc3Or4Q-unsplash (1).jpg'

function ProfileProviderr({userIdapp}) {

  // console.log(userIdapp)
  const [image, setImg] = useState("");
  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [description, setdescription] = useState("");

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
  // const handleSubmit = async (event) => {
  //   event.preventDefault(); // Prevent the default behavior of the event
  //   const data = {
  //     name:name,
  //     description: description,
  //     price:price,
  //     product_id:userIdapp,
  //     photo: image,

  //   };
  //   console.log(data)
  //   console.log(userIdapp)
  //   try {
  //     const request = await axios.post("http://localhost:5000/product",data);
    
  //     console.log(request.data);
  //   } catch (error) {
    
  //     console.error(error.message);
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default behavior of the event
  
    const data = {
      name: name,
      description: description,
      price: price,
      user_id: userIdapp,
      photo: image,
    };
  
    try {
      const response = await axios.post("http://localhost:5000/product", data);
  
      // Display success message
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Product has been submitted successfully.',
      });
  
      console.log(response.data);
    } catch (error) {
      // Display error message
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to submit the product.',
      });
  
      console.error(error.message);
    }
  };
  
  const [user, setUser] = useState({});
  const [delproduct, setdelproduct] = useState([]);


const [open, setOpen] = React.useState(false);
  const handleOpen = (id) =>{ setOpen(true)
  setProductId(id)
  };
  const handleClose = () => setOpen(false);
  const [users, setUsers] = useState([]);
  const [request, setrequest] = useState([]);
const [productId,setProductId]=useState(0)
useEffect(() => {
  axios
  .get(`http://localhost:5000/profileProvider/${userIdapp}`)
  .then((response) => {
    setUser(response.data[0]);
    // localStorage.setItem("user", JSON.stringify(response.data[0]));
    console.log(response.data);
    console.log(userIdapp);
  })
  .catch((error) => console.log(error.message));
  axios
    .get(`http://localhost:5000/productOfMakhiata/${userIdapp}`)
    .then((response) => {
      setUsers(response.data);
      console.log(response.data)
      // Assuming there is only one user with the given ID
    })
    .catch((error) => console.log(error.message));
    axios
    .get(`http://localhost:5000/productdeletedOfMakhiata/${userIdapp}`)
    .then((response) => {
      setdelproduct(response.data);
      console.log(response.data)
      // Assuming there is only one user with the given ID
    })
    .catch((error) => console.log(error.message));

    axios
    .get(`http://localhost:5000/requestOfMakhiata/${userIdapp}`)
    .then((response) => {
      setrequest(response.data);
      console.log(response.data)
      // Assuming there is only one user with the given ID
    })
    .catch((error) => console.log(error.message));
}, [userIdapp]);
// useEffect(() => {

// }, [userIdapp]);
// const handleDelete = async (id) => {
//   try {
//     await axios.delete("http://localhost:5000/product/" + id);
//     window.location.reload();

//   } catch { 


//   }
// };
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
      await axios.delete("http://localhost:5000/product/" + id);
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
                'url("https://images.unsplash.com/photo-1682954100067-c4356f636c6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80")',
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
        <section className="relative py-16 bg-white">
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
                    {user.domain||""}
                  </div>
                </div>
            
                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full justify-center lg:w-9/12 px-4">
                    
                    {user.address ||""}
                      {/* <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                      "الخياطة هي فن يجمع بين الإبداع والدقة، حيث تتحول الأقمشة العادية إلى قطع فريدة من الملابس التي تعكس ذوقًا وشخصية المرتدي. بين خيوط الإبرة وصانعة الملابس تنبض قصصٌ لا تُروى، وتنسج أحلام وأفكار تتجسد في تصاميم مبتكرة. دعنا نستكشف معًا عالم الخياطة والتصميم، حيث يلتقي الفن والموضة وتتحقق الأحلام والأفكار في أجمل الأزياء المصممة والمعدلة بمهارة وحب."
                      </p> */}
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
          <section className="bg-fuchsia-100 dark:bg-gray-900">
  <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
    <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
      <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white nameweb">
      ابرة وخيط
      </h2>
      <p className="mb-4 ">
      "الخياطة هي فن يجمع بين الإبداع والدقة، حيث تتحول الأقمشة العادية إلى قطع فريدة من الملابس التي تعكس ذوقًا وشخصية المرتدي. بين خيوط الإبرة وصانعة الملابس تنبض قصصٌ لا تُروى، وتنسج أحلام وأفكار تتجسد في تصاميم مبتكرة. دعنا نستكشف معًا عالم الخياطة والتصميم، حيث يلتقي الفن والموضة وتتحقق الأحلام والأفكار في أجمل الأزياء المصممة والمعدلة بمهارة وحب."
      </p>
      {/* <p>
        We are strategists, designers and developers. Innovators and problem
        solvers. Small enough to be simple and quick.
      </p> */}
    </div>
    <div className="grid grid-cols-2 gap-4 mt-8">
      <img
        className="w-full rounded-lg"
        src="https://images.unsplash.com/photo-1558303522-d7a2bdfdbd82?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=465&q=80"
        alt="office content 1"
      />
      <img
        className="mt-4 w-full lg:mt-10 rounded-lg"
        src="https://images.unsplash.com/photo-1596939082030-301c0d17b5b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
        alt="office content 2"
      />
    </div>
  </div>
</section>

        {/* //////////////////////////////////////// */}
        <div className="text-center mt-16">
      <h1 className="text-3xl text-gray-800 font-semibold">الطلبات المطلوبة</h1>
      {/* <p className="mt-3 text-gray-500">
        المدونات التي يحبها المجتمع. يتم تحديثها كل ساعة.
      </p> */}
    </div>
<div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
<section
    id="Projects"
    className="w-fit mx-auto grid grid-cols-4 lg:grid-cols-4 md:grid-cols-3 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
  >
          {request?.map((request) => {
                    return (
                      
    <div  key={request.id} className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
      
      {/* <Link to={`/Product/${post.id}`}key={post.id}> */}

        <img
          src={request.photo}
          alt="Product"
          className="h-80 w-72 object-cover rounded-t-xl"
        />
        <div className="px-4 py-3 w-72">
          {/* <p className="text-lg font-bold text-black truncate block capitalize">
          {request.name}
          </p> */}
          <p className="text-lg font-semibold text-black cursor-auto my-3">
            الوصف :  {request.description}
            </p>
            <p className="text-lg font-semibold text-black cursor-auto my-3">
            رقم الهاتف : {request.phone}
            </p>
          {/* <div className="flex items-center">
            
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
          </div> */}
        </div>
      {/* </Link> */}
      {/* <button type="submit"
                                className="w-20 text-sm px-4 py-2 mb-3 text-white  bg-fuchsia-800 hover:bg-fuchsia-100 mr-48 active:bg-fuchsia-100 rounded-lg duration-150"
                            >
                                Edit
                            </button> */}
                                {/* <div className="w-full lg:w-4/12 px-4  lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                
   </div>
                {post.id}  </div> */}
         
    </div>
        );
      })}
      </section>
        </div>
        {/* ///////////////////////////////// */}
        <div className="container justify-center mx-auto">
  <div className="mx-4 py-16">
    <div className="w-full relative flex items-center justify-center">
      <img
        src="https://i.ibb.co/4sYZ8gC/img-2.png"
        alt="dining"
        className="w-full h-full absolute z-0 xl:block"
      />
      <img
        src="https://images.unsplash.com/photo-1457972657980-4c9fddebec8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
        alt="dining"
        className="w-full h-full absolute z-0 sm:block xl:hidden"
      />
      <img
        src="https://i.ibb.co/JKkzGDs/pexels-max-vakhtbovych-6301182-1.png"
        alt="dining"
        className="w-full h-full absolute z-0 sm:hidden"
      />
      <div className="bg-gray-500 bg-opacity-50 lg:py-36 py-60 md:px-20 px-10 sm:px-4 flex flex-col items-center justify-center relative z-50">
        <h1 className="text-4xl font-semibold leading-9 text-white text-center">
        خياطة الأحلام: فن وإبداع يجسد الأناقة والأصالة        </h1>
        <p className="text-base leading-normal text-center text-white border-l-2 mt-6">
          بجانب المهارة التقنية، يتطلب الخياطون والخياطات الإبداع والدقة في
          التصميم وتفاصيل الخياطة. يجب عليهم أخذ المقاسات الصحيحة وقص الأقمشة
          بشكل دقيق، وتطبيق تقنيات الخياطة المناسبة للحصول على قطع ملابس ذات
          جودة عالية.
          <br />
          يمكن للخياطين والخياطات العمل في ورش خياطة مستقلة، أو في محلات الملابس،
          أو في صناعة الأزياء والتصميم، أو حتى تأسيس مشاريعهم الخاصة. تعد الخياطة
          مهنة مهمة وموهبة فنية تتطلب الابتكار والمرونة لتلبية احتياجات وذوق
          العملاء.
        </p>
      </div>
    </div>
  </div>
</div>
        <div className="text-center mt-16">
      <h1 className="text-3xl text-gray-800 font-semibold">الطلبات المبيوعة</h1>
      {/* <p className="mt-3 text-gray-500">
        المدونات التي يحبها المجتمع. يتم تحديثها كل ساعة.
      </p> */}
    </div>
<div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
<section
    id="Projects"
    className="w-fit mx-auto grid grid-cols-4 lg:grid-cols-4 md:grid-cols-3 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
  >
          {delproduct?.map((del) => {
                    return (
                      
    <div  key={del.id} className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
      
      {/* <Link to={`/Product/${post.id}`}key={post.id}> */}

        <img
          src={del.photo}
          alt="Product"
          className="h-80 w-72 object-cover rounded-t-xl"
        />
        <div className="px-4 py-3 w-72">
          {/* <p className="text-lg font-bold text-black truncate block capitalize">
          {request.name}
          </p> */}
          <p className="text-lg font-semibold text-black cursor-auto my-3">
            الاسم :  {del.name}
            </p>
            <p className="text-lg font-semibold text-black cursor-auto my-3">
            الوصف :  {del.description}            </p>
          {/* <div className="flex items-center">
            
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
          </div> */}
        </div>
      {/* </Link> */}
      {/* <button type="submit"
                                className="w-20 text-sm px-4 py-2 mb-3 text-white  bg-fuchsia-800 hover:bg-fuchsia-100 mr-48 active:bg-fuchsia-100 rounded-lg duration-150"
                            >
                                Edit
                            </button> */}
                                {/* <div className="w-full lg:w-4/12 px-4  lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                
   </div>
                {post.id}  </div> */}
         
    </div>
        );
      })}
      </section>
        </div>
        </section>
        <div className="bg-fuchsia-100 py-20 flex flex-col items-center justify-center">
            <div className="xl:w-1/2 w-11/12">
                <h1 role="heading" tabIndex={0} className="text-6xl font-bold 2xl:leading-10 leading-0 text-center text-gray-800">
                استكشف حرفية الخياطة
                </h1>
                <h2 role="contentinfo" tabIndex={0} className="text-base leading-normal text-center text-gray-600 mt-5">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text Lorem Ipsum is simply dummy text of the printing
                </h2>
            </div>
            <div className="2xl:px-20 lg:px-12 px-4 flex flex-wrap items-start mt-4">
                <div className="mt-24">
                    <div className="flex items-end ">
                        <img tabIndex={0} src="https://images.unsplash.com/photo-1557777586-f6682739fcf3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60" alt="girl with blue background" className="w-20 h-20 rounded-lg mr-6" />
                        <img tabIndex={0} src="https://images.unsplash.com/photo-1642453971059-7ebfb1aec5f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE5fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60" alt="guy winking" className="w-48 h-36 rounded-lg" />
                    </div>
                    <div className="flex items-center justify-end my-6">
                        <img tabIndex={0} src="https://images.unsplash.com/photo-1459792323369-14e51bb68de0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE3fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60" alt="guy smiling" />
                    </div>
                    <div className="flex items-start">
                        <img tabIndex={0} src="https://images.unsplash.com/photo-1564848534648-558dc1ef55c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60" alt="girl with bluw background" className="w-48 h-48 rounded-lg" />
                        <img tabIndex={0} src="https://images.unsplash.com/photo-1536867520774-5b4f2628a69b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60" alt="guy with glasses" className="w-20 h-20 rounded-lg ml-6 flex-shrink-0 object-cover object-fit" />
                    </div>
                </div>
                <div className="ml-6 mt-32">
                    <img tabIndex={0} src="https://images.unsplash.com/photo-1542044801-30d3e45ae49a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60" className="w-72 h-80 rounded-lg" alt="guy with sunglasses" />
                    <div className="flex items-start mt-6">
                        <img tabIndex={0} src="https://images.unsplash.com/photo-1561822713-da02f57225b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIwfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60" alt="girl  laughing" className="w-48 h-48 rounded-lg" />
                        <img tabIndex={0} src="https://images.unsplash.com/photo-1542044801-30d3e45ae49a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60" alt="guy with glasses" className="w-20 h-20 rounded-lg ml-6 object-cover object-fit" />
                    </div>
                </div>
                <div className="mt-14 ml-6">
                    <div className="lg:flex ">
                        <div>
                            <img tabIndex={0} src="https://images.unsplash.com/photo-1486622923572-7a7e18acf192?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60" alt="group of friends" className="w-96 h-72 rounded-lg object-center object-fit" />
                        </div>
                        <div>
                            <div className="flex ml-6">
                                <img tabIndex={0} src="https://images.unsplash.com/photo-1518732836484-bd257665c9d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60" className="w-20 h-20 rounded-lg mt-14" alt="man" />
                                <img tabIndex={0} src="https://images.unsplash.com/photo-1528578577235-b963df6db908?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60......." className="w-20 h-24 rounded-lg ml-6" alt="woman" />
                            </div>
                            <img tabIndex={0} src="https://images.unsplash.com/photo-1517840545241-b491010a8af4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60" alt="boy with blonde hair" className="ml-6 mt-6 w-48 h-32 rounded-lg" />
                        </div>
                    </div>
                    <div className="mt-6 flex">
                        <img tabIndex={0} className="w-48 h-48 rounded-lg" src="https://images.unsplash.com/photo-1457972657980-4c9fddebec8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" alt="young girl with red hair" />
                        <img tabIndex={0} className="w-72 h-56 rounded-lg ml-6" src="https://images.unsplash.com/photo-1518732836484-bd257665c9d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60" alt="young girl with red hair" />
                    </div>
                </div>
            </div>
        </div>
        {/* ////////////////////////////// */}

        <div className="text-center mt-16">
      <h1 className="text-3xl text-gray-800 font-semibold">التصاميم المعروضة</h1>
      {/* <p className="mt-3 text-gray-500">
        المدونات التي يحبها المجتمع. يتم تحديثها كل ساعة.
      </p> */}
    </div>
<div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
<section
    id="Projects"
    className="w-fit mx-auto grid grid-cols-4 lg:grid-cols-4 md:grid-cols-3 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
  >
          {users?.map((post) => {
                    return (
                      
    <div  key={post.id} className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
      
      {/* <Link to={`/Product/${post.id}`}key={post.id}> */}

        <img
          src={post.photo}
          alt="Product"
          className="h-80 w-72 object-cover rounded-t-xl"
        />
        <div className="px-4 py-3 w-72">
          <p className="text-lg font-bold text-black truncate block capitalize">
          {post.name}
          </p>
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
    
                                <div className="py-3 px-10 mt-32 sm:mt-0 flex gap-4">
                    <Button  className="mb-10  bg-fuchsia-800  text-white shadow hover:bg-fuchsia-200 hover:text-fuchsia-800   "
         variant="text" onClick={()=>handleOpen(post.id)}>تعديل </Button>
         <Editproduct productId={productId} open={open} close={handleClose}/>
               
         <Button  className="mb-10  bg-[#dc2626]  text-white shadow hover:bg-[#991b1b] hover:text-black   "
         variant="text"   onClick={() => handleDelete(post.id)}>حذف </Button>
   </div>
                
            
    </div>
        );
      })}
      </section>
        </div>
        
  <main className="py-14 bg-fuchsia-100 ">
  <div className="text-center mt-10">
      <h1 className="text-3xl text-gray-800 font-semibold mb-10">                             لاضافة منتج املئ النموذج التالي
</h1>
      {/* <p className="mt-3 text-gray-500">
        المدونات التي يحبها المجتمع. يتم تحديثها كل ساعة.
      </p> */}
    </div>
            <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
                <div className="max-w-lg mx-auto gap-12 justify-between lg:flex lg:max-w-none">
                    <div className="max-w-lg space-y-3">
                    
                        {/* <p className="text-gray-800 text-3xl pb-5 font-semibold sm:text-4xl">
                            لاضافة منتج املئ النموذج التالي
                        </p> */}
                        {/* <p>
                            We’re here to help and answer any question you might have, We look forward to hearing from you! Please fill out the form, or us the contact information bellow .
                        </p> */}
                                 <img
      className="rounded-t-lg w-full mt-10"
      src={img2}
      alt=""
    />
                    
                    </div>
                    <div className="flex-1 mt-12 sm:max-w-lg lg:max-w-md">
                        <form 
                            onSubmit={handleSubmit}
                            className="space-y-5 bg-white p-5 rounded-t-lg"
                        >
                            <div>
                                <label className="font-medium">
                                    اسم المنتج
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e)=>setname(e.target.value)}
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border-2 border-gray-300 p-2  focus:border-[#E8AA42] shadow-sm rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="font-medium">
                                    السعر
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={price}
                                    onChange={(e)=>setprice(e.target.value)}
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border-2 border-gray-300 p-2  focus:border-[#E8AA42] shadow-sm rounded-lg"
                                />
                            </div>
                            
                            <div>
                                <label className="font-medium">
                                الوصف
                                </label>
                                <textarea   
                                  value={description}
                                  onChange={(e) => setdescription(e.target.value)}
                                   required className="w-full mt-2 h-36 px-3 py-2 border-2 border-gray-300 p-2 rounded-lg  resize-none appearance-none bg-transparent outline-none  focus:border-[#E8AA42] shadow-sm "></textarea>
                            </div>
                            <div>
                  <label className="font-medium">صورة عن المنتج</label>

                  <input
                    className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                    type="file"
                    placeholder="Table Image"
                    name="guest_num"
                    onChange={(e) => {
                      onChange(e);
                    }}
                    accept="image/*"
                  />
                </div>
                  
      
                            <button type="submit"
                                className="w-full px-4 py-2 text-white font-medium bg-fuchsia-800 hover:bg-[#7C9070] active:bg-[#7C9070] rounded-lg duration-150"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
  
      </main>
      
    </>
  );
}

export default ProfileProviderr;
