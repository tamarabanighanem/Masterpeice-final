import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import { UserContext } from '../../UserContext';
import AOS from "aos";
import "aos/dist/aos.css";
const ProductCollection = ({ userIdapp, product }) => {
  const { pagination, setItem, currentItems } = useContext(UserContext)

  const { itemId } = useParams();
  const [description, setdescription] = useState('');
  const [chestCircumference, setChestCircumference] = useState('')
  const [waistline, setWaistline] = useState('')
  const [hipHircumference, setHipcircumference] = useState('')
  const [phone, setphone] = useState('');
  const [loading, setLoading] = useState(true);
  const [image, setImg] = useState('');
  const [delproduct, setdelproduct] = useState([]);
  const [allRequest, setAllrequest] = useState([]);
  const [phoneError, setPhoneError] = useState(""); // Add phoneError state
  const phoneRegex = /^(\+?\d{1,4}[\s-]?)?\d{10}$/; // You can modify the regex for your specific phone number format


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

  // const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!phoneRegex.test(phone)) {
      setPhoneError("الرجاء ادخال رقم صحيح");
      return;
    } else {
      setPhoneError("");
    } // Prevent the default behavior of the event
    const data = {
      user_id: userIdapp,
      description: description,
      mkhiata_id: itemId,
      phone: phone,
      chestcircumference: chestCircumference,
      waistline: waistline,
      hiphircumference: hipHircumference,
      photo: image,
    };
    try {
      const request = await axios.post('http://localhost:5000/request', data);
      Swal.fire({
        title: `تم ارسال الطلب `,
        icon: "success",
        confirmButtonText: "حسنا",
    });
    
      console.log(request.data);
    } catch (error) {
      Swal.fire({
        title: 'خطأ',
        text: 'الرجاء إدخال البيانات بشكل صحيح',
        icon: 'error',
        confirmButtonText: 'موافق',
      });
      
      console.error(error.message);

    }
    setdescription('')
    setphone('')
    setImg('')
    setChestCircumference('')
    setWaistline('')
    setHipcircumference('')
  };
  const [products, setProducts] = useState([]);
  console.log(itemId)
  console.log(products)
  useEffect(() => {
    axios
      .get(`http://localhost:5000/productCollection/${itemId}`)
      .then((response) => {
        setProducts(response.data);
        setItem(response.data)
        // setcurrentItem(products) // Assuming there is only one user with the given ID
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        // setProducts(0);
        console.log(error.message);
      });
    axios
      .get(`http://localhost:5000/productdeletedOfMakhiata/${itemId}`)
      .then((response) => {
        setdelproduct(response.data);

        // Assuming there is only one user with the given ID
      })
      .catch((error) => console.log(error.message));
 axios.get(`http://localhost:5000/allrequestforEachMakhiata/${itemId}`)
 .then((response)=>{
  setAllrequest(response.data)
console.log(allRequest)
 }).catch((error)=>console.log(error.message))
  }, []);
  console.log(allRequest)
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);



  return (
    <>
      {loading ? (
        <div className="relative pt-48 flex justify-center items-center my-5">
          <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500" />
          <img
            src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"
            className="rounded-full h-28 w-28"
            alt="loading"
          />
        </div>
      ) : (
        <>
          <div>
            <section>
              <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
                <div className="text-center mt-10 p-10">
                  <h1 className="font-bold text-3xl bg-gray-200 p-5 w-full rounded-xl mb-4">
                    توفر مخيطتنا العديد من التصاميم المناسبة للجميع اليك بعضها
                  </h1>
                </div>

                <section
  id="Projects"
  data-aos="flip-up"
  className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
>
  {products.length > 0 ? (
    // Render products when there are products
    currentItems.map((post) => (
      <div
        key={post.id}
        data-aos="flip-right"
        className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
      >
        <Link to={`/Product/${post.id}/${itemId}`} key={post.id}>
          {post.offers ? (
            <div className="border rounded-t-lg rounded-md border-red-500">
              <div className="bg-gradient-to-r from-white to-red-600 p-2 rounded-t-lg  flex items-center">
                <div className="w-1/2  h-full rounded-l-md flex justify-center items-center">
                  <p className="text-white font-semibold">
                    عرض خاص {post.discountedprice}
                  </p>
                </div>
              </div>
              <img
                src={post.photo}
                alt="Product"
                className="h-72 w-72 object-cover"
              />
              <div className="px-4 py-3 w-72">
                <p className="text-lg font-bold text-black truncate block capitalize">
                  {post.name}:{' '}
                  <span className="text-xs text-neutral-600 dark:text-neutral-200">
                    {post.description}
                  </span>
                </p>
                <del className="text-sm font-semibold text-red-600 cursor-auto">
                  {post.price}
                </del>
              </div>
            </div>
          ) : (
            <>
              <img
                src={post.photo}
                alt="Product"
                className="h-72 w-72 object-cover"
              />
              <div className="px-4 py-3 w-72">
                <p className="text-lg font-bold text-black truncate block capitalize">
                  {post.name}:{' '}
                  <span className="text-xs text-neutral-600 dark:text-neutral-200">
                    {post.description}
                  </span>
                </p>
                <p className="text-sm font-semibold text-black cursor-auto">
                  {post.price}
                </p>
              </div>
            </>
          )}
        </Link>
      </div>
    ))
  ) : (
    <>
    <div></div>
    <div className="text-2xl w-full py-48 justify-center flex items-center text-gray-500 dark:text-neutral-50">
    لا توجد تصاميم للعرض 😢
  </div></>
    
  )}
</section>

              </div>
            </section>
          </div>
        </>
      )}
      {products.length>3&&pagination}

      <div className="text-center mt-10 p-10">
        <h1 className="font-bold text-3xl bg-gray-200 p-5 w-full rounded-xl  mb-4">جزء من اعمال المخيطة
        </h1>

      </div>
      <div className="bg-white">
  <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <h2 className="sr-only">Products</h2>
    {delproduct.length === 0 && allRequest.length === 0 ? (
      <div className="text-2xl w-full py-48 justify-center flex items-center text-neutral-800 dark:text-neutral-50">
  لا توجد اعملال للمخيطة😢
      </div>
    ) : (
      <div className="grid grid-cols-1 gap-x-6 p-5  gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
        {delproduct?.map((product) => (
          <a key={product.id} href={product.href} className="group ">
            <div
              data-aos="flip-up"
              className="  overflow-hidden  rounded-lg bg-gray-200 "
            >
              <img
                src={product.photo}
                alt="Product"
                className="h-96 w-full object-cover object-center group-hover:opacity-75"
              />
            </div>
          </a>
        ))}
        {allRequest?.map((req) => (
          <a key={req.id} href={req.href} className="group">
            <div
              data-aos="flip-up"
              className=" w-full overflow-hidden rounded-lg bg-gray-200 "
            >
              <img
                src={req.photo}
                alt="Product"
                className="h-96 w-full object-cover object-center group-hover:opacity-75"
              />
            </div>
          </a>
        ))}
      </div>

    )}
              

  </div>
</div>



      <main className=" ">
        <div className="container mx-auto flex justify-center items-center">
          <div className="w-full">
            <div className="relative flex items-center justify-center">
              <img
                src="https://plus.unsplash.com/premium_photo-1683122013962-8139ef39837c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt="dining"
                className="w-full h-full absolute z-0 xl:block"
              />

              <div className="bg-black bg-opacity-60 w-full lg:py-36 py-24 md:px-10 px-5 sm:px-2 flex flex-col items-center justify-center relative">
                <div className="heading text-center font-bold text-2xl lg:text-4xl pb-14 lg:pb-28 text-white">
                  لطلب تصميم حسب رغبتك..يرجى تعبئة النموذج التالي{' '}
                </div>
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5 w-full lg:w-1/3 md:w-2/3 rounded-2xl bg-white p-5"
                >
                  <div>
                    <label className="font-medium">الوصف</label>
                    <textarea
                      required
                      placeholder="يرجى تحديد قياساتك"
                      value={description}
                      onChange={(e) => setdescription(e.target.value)}
                      className="w-full mt-2 h-28 md:h-36 px-3 py-2 border-2 border-gray-300 p-2 rounded-lg resize-none appearance-none bg-transparent outline-none focus:border-[#E8AA42] shadow-sm"
                    ></textarea>
                  </div>

                  <div className="flex">
                    <div className='p-2'>
                      <label className="font-medium">محيط الصدر</label>
                      <input
                        type="text"
                        required
                        value={chestCircumference}
                        onChange={(e) => setChestCircumference(e.target.value)}
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border-2 border-gray-300 p-2 focus:border-[#E8AA42] shadow-sm rounded-lg"
                      />
                    </div>
                    <div className='p-2'>
                      <label className="font-medium">محيط الخصر</label>
                      <input
                        type="text"
                        required
                        value={waistline}
                        onChange={(e) => setWaistline(e.target.value)}
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border-2 border-gray-300 p-2 focus:border-[#E8AA42] shadow-sm rounded-lg"
                      />
                    </div>
                    <div className='p-2'>
                      <label className="font-medium">محيط الورك</label>
                      <input
                        type="text"
                        required
                        value={hipHircumference}
                        onChange={(e) => setHipcircumference(e.target.value)}
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border-2 border-gray-300 p-2 focus:border-[#E8AA42] shadow-sm rounded-lg"
                      />
                    </div>

                  </div>
                  <div>
  <label className="font-medium">رقم الهاتف</label>
  <input
    type="text"
    name="phone"
    value={phone}
    onChange={(e) => setphone(e.target.value)}
    required
    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-fuchsia-600 shadow-sm rounded-lg"
  />
  {phoneError && <p className="text-red-600 text-xs">{phoneError}</p>}
</div>

                  <div>
                    <label className="font-medium">صورة التصميم المطلوب</label>
                    <input
                      className="shadow mb-2 md:mb-4 appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
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
                    ارسال{' '}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>


    </>
  );
};

export default ProductCollection;
