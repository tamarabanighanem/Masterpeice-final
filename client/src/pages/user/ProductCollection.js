import React from 'react'
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useParams } from 'react-router-dom';
import Swal from "sweetalert2";
import img2 from '../../images/thomas-william-6Sls-TB27kM-unsplash.jpg'

const ProductCollection = ({ userIdapp }) => {
  const { itemId } = useParams();
  const [description, setdescription] = useState("");
  const [phone, setphone] = useState("");
  const [loading, setLoading] = useState(true)
  // console.log(userIdapp)
  const [image, setImg] = useState("");

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


  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default behavior of the event
    const data = {
      user_id: userIdapp,
      description: description,
      mkhiata_id: itemId,
      phone: phone,
      photo: image,
    };
    console.log(data)
    try {
      const request = await axios.post("http://localhost:5000/request", data);
      Swal.fire({
        title: `submitted form successful`,
        icon: "success",
        confirmButtonText: "OK",
      });
      console.log(request.data);
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "please enter valid donation amount",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error(error.message);
    }
  };
  const [users, setUsers] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/productCollection/${itemId}`)

      .then((response) => {
        setUsers(response.data); // Assuming there is only one user with the given ID
        setLoading(false)


      })
      .catch((error) => {
      setLoading(false)
      setUsers(0)
      console.log(error.message)
        }  );


  }, [])

  return (
    <>
      {loading ? (<div className="relative pt-48 flex justify-center items-center my-5">
        <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500" />
        <img
          src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"
          className="rounded-full h-28 w-28"
          alt='loading'
        />
      </div>
      ) : (
        <>
          <div>
            <section>
              <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">


                {/* <> */}
                  <div className="text-center mt-10 p-10">
                    <h1 className="font-bold text-3xl bg-gray-200 p-5 w-full rounded-xl  mb-4">        توفر مخيطتنا العديد من التصاميم المناسبة للجميع اليك بعضها
                    </h1>

                  </div>
              
              {    users !== 0  ?

                  <section
                    id="Projects"
                    className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
                  >
                    {
                      users?.map((post) => {
                        return (

                          <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">

                            <Link to={`/Product/${post.id}/${itemId}`} key={post.id}>
                              <img
                                src={post.photo}
                                alt="Product"
                                className="h-80 w-72 object-cover rounded-t-xl"
                              />
                              <div className="px-4 py-3 w-72">
                                {/* <span className="text-gray-400 mr-3 uppercase text-xs">Brand</span> */}
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
                                </div>
                              </div>
                            </Link>
                          </div>
                        );
                      })
                      
                    }


                  </section>
                  :
                  (
                    <>
                    <section>
                        
                    <div className="text-4xl  w-full py-48 justify-center flex items-center  text-gray-500  dark:text-neutral-50">
                      لا توجد تصاميم للعرض  😢   </div>
                      </section>
            
                      </>
                  )
}

              

              </div>
            </section>
          </div>
          
        </>
      )
    }
          <main className=" ">

            <div className="container mx-auto  flex justify-center items-center ">
              <div className="  w-full">
                <div className=" relative flex items-center justify-center">
                  <img
                    src="https://plus.unsplash.com/premium_photo-1683122013962-8139ef39837c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                    alt="dining"
                    className="w-full h-full absolute  z-0 xl:block"
                  />

                  <div className="bg-black bg-opacity-60 w-full lg:py-36 py-60 md:px-20 px-10 sm:px-4 flex flex-col items-center justify-center relative ">
                    <div className="heading text-center  font-bold text-4xl  pb-28 text-white">
                      لطلب تصميم حسب رغبتك..يرجى تعبئة النموذج التالي  </div>
                    <form onSubmit={handleSubmit} className="space-y-5 w-1/3 rounded-2xl  bg-white p-5">

                      <div>
                        <label className="font-medium">الوصف</label>
                        <textarea
                          required
                          placeholder='يرجى تحديد قياساتك'
                          value={description}
                          onChange={(e) => setdescription(e.target.value)}
                          className="w-full mt-2 h-36 px-3 py-2 border-2 border-gray-300 p-2 rounded-lg  resize-none appearance-none bg-transparent outline-none  focus:border-[#E8AA42] shadow-sm "
                        ></textarea>
                      </div>
                      <div>
                        <label className="font-medium">
                          رقم الهاتف
                        </label>
                        <input
                          type="text"
                          required
                          value={phone}
                          onChange={(e) => setphone(e.target.value)}
                          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border-2 border-gray-300 p-2  focus:border-[#E8AA42] shadow-sm rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="font-medium">صورة عن التصميم المطلوب</label>

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


                      <button
                        type="submit"
                        className="w-full px-4 py-2 text-white font-medium bg-fuchsia-800 hover:bg-fuchsia-300 active:bg-fuchsia-300 rounded-lg duration-150"
                      >
                        ارسال  </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </main>
    </>
  )
}

export default ProductCollection