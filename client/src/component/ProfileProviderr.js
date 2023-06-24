// import EditProfileBeneficiary from "./EditProfileBeneficiary";
import { useState, useEffect } from "react";
import * as React from "react";
import axios from "axios";
import {Link} from 'react-router-dom';

// import Cards from "./CardsBeneficiary";
import EditProfile from "./Editprofile";


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
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default behavior of the event
    const data = {
      name:name,
      description: description,
      price:price,
      photo: image,
      product_id:userIdapp,

    };
    console.log(data)
    console.log(userIdapp)
    try {
      const request = await axios.post("http://localhost:5000/product",data);
    
      console.log(request.data);
    } catch (error) {
    
      console.error(error.message);
    }
  };

  const [user, setUser] = useState({});
  console.log(userIdapp)



  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      axios
        .get(`http://localhost:5000/profileProvider/${userIdapp}`)
        .then((response) => {
          setUser(response.data[0]);
          localStorage.setItem("user", JSON.stringify(response.data[0]));
          console.log(response.data);
          console.log(userIdapp);
        })
        .catch((error) => console.log(error.message));
    }
  }, [userIdapp]);
  
  console.log(user)

  // const [cards, setCards] = useState([]);
  // const [userId, setUserId] = useState();
  // const [userData, setUserData] = useState({});



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
                {/* )} */}

                {/* Donations cards  */}
                {/* <Cards /> */}
                {/* Donations cards  */}
                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full justify-center lg:w-9/12 px-4">
                    {/* <Link to={"/"}>  <img
              src={img1}
              width={200}
              height="100%"
              alt="Float UI logo"
            /></Link> */}
                      <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                      "الخياطة هي فن يجمع بين الإبداع والدقة، حيث تتحول الأقمشة العادية إلى قطع فريدة من الملابس التي تعكس ذوقًا وشخصية المرتدي. بين خيوط الإبرة وصانعة الملابس تنبض قصصٌ لا تُروى، وتنسج أحلام وأفكار تتجسد في تصاميم مبتكرة. دعنا نستكشف معًا عالم الخياطة والتصميم، حيث يلتقي الفن والموضة وتتحقق الأحلام والأفكار في أجمل الأزياء المصممة والمعدلة بمهارة وحب."

{user.description ||""}



                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4  lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
<EditProfile/>                 
   </div>
                  </div>
              </div>
            </div>
          </div>
          
        
        </section>
      
  <main className="py-14">
            <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
                <div className="max-w-lg mx-auto gap-12 justify-between lg:flex lg:max-w-none">
                    <div className="max-w-lg space-y-3">
                    
                        <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                            لاضافة منتج املئ النموذج التالي
                        </p>
                        <p>
                            We’re here to help and answer any question you might have, We look forward to hearing from you! Please fill out the form, or us the contact information bellow .
                        </p>
                        
                        {/* <div>
                            <ul className="mt-6 flex flex-wrap gap-x-10 gap-y-6 items-center">
                                {
                                    contactMethods.map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-x-3">
                                            <div className="flex-none text-gray-400">
                                                {item.icon}
                                            </div>
                                            <p>{item.contact}</p>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div> */}
                    </div>
                    <div className="flex-1 mt-12 sm:max-w-lg lg:max-w-md">
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
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
                                className="w-full px-4 py-2 text-white font-medium bg-[#E8AA42] hover:bg-[#7C9070] active:bg-[#7C9070] rounded-lg duration-150"
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
