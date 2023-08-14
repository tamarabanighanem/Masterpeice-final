import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import Pagenation from '../forAll/Pagenation';
const ProductCollection = ({ userIdapp ,product }) => {
  
  const { itemId } = useParams();
  const [description, setdescription] = useState('');
  const[chestCircumference,setChestCircumference]=useState('')
  const[waistline,setWaistline]=useState('')
  const[hipHircumference,setHipcircumference]=useState('')
  const [phone, setphone] = useState('');
  const [loading, setLoading] = useState(true);
  const [image, setImg] = useState('');
  const [delproduct, setdelproduct] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Number of items to display per page

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
      chestcircumference:chestCircumference,
      waistline:waistline,
      hiphircumference:hipHircumference,
      photo: image,
};
    try {
      const request = await axios.post('http://localhost:5000/request', data);
      Swal.fire({
        title: 'submitted form successful',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      console.log(request.data);
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'please enter a valid donation amount',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      console.error(error.message);

    }
    setdescription('')
    setphone('')
    setImg("")
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
        setProducts(response.data); // Assuming there is only one user with the given ID
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setProducts(0);
        console.log(error.message);
      });
      axios
    .get(`http://localhost:5000/productdeletedOfMakhiata/${itemId}`)
    .then((response) => {
      setdelproduct(response.data);
    
      // Assuming there is only one user with the given ID
    })
    .catch((error) => console.log(error.message));

  }, []);

  // Calculate the current items to be displayed based on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate the total number of pages
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Event handler for "Previous" button click
  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Event handler for page number click
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Event handler for "Next" button click
  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

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

                {products !== 0 ? (
                  <section
                    id="Projects"
                    className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
                  >
                    {currentItems.map((post) => {
                      return (
                        <div
                          key={post.id}
                          className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
                        >

                          <Link to={`/Product/${post.id}/${itemId}`} key={post.id}>
                          {post.offers?(<div className="bg-gradient-to-r from-white to-red-600 p-2  flex items-center">
                          <div className="w-1/2  h-full rounded-l-md flex justify-center items-center">
                            <p className="text-white font-semibold">عرض</p>
                          </div>
                          <div className="w-1/2 h-full rounded-r-md flex justify-center items-center">
                            {/* Placeholder for the other half of the div */}
                          </div>
                        </div>):( <></>
                          
    )}

                            <img
                              src={post.photo}
                              alt="Product"
                              className="h-72 w-72 object-cover rounded-t-xl"
                            />

                            <div className="px-4 py-3 w-72">
                              <p className="text-lg font-bold text-black truncate block capitalize">
                                {post.name}:    <span className="text-xs  text-neutral-600 dark:text-neutral-200">
                              {post.description}
                          </span>
                              </p>
                            
                          
                          <p className="text-sm font-semibold text-white  text-center bg-yellow-500 cursor-auto ">
                                  {post.price} دينار
                                </p>
                              {/* <div className="flex items-center">
                              
                                <del>
                                  <p className="text-sm text-gray-600 cursor-auto ml-2">$199</p>
                                </del>
                              </div> */}
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                  </section>
                ) : (
                  <>
                    <section>
                      <div className="text-4xl  w-full py-48 justify-center flex items-center  text-gray-500  dark:text-neutral-50">
                        لا توجد تصاميم للعرض 😢{' '}
                      </div>
                    </section>
                  </>
                )}
              </div>
            </section>
          </div>
        </>
      )}

      {/* ////////////////////pagination */}
      <div className="flex items-center justify-center py-10 lg:px-0 sm:px-6 px-4">
        <div className="lg:w-3/5 w-full flex items-center justify-between border-t border-gray-200">
          <div
            className="flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer"
            onClick={handlePreviousClick}
          >
        
            <svg
              width={14}
              height={8}
              viewBox="0 0 14 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.1665 4H12.8332"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.5 7.33333L12.8333 4"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.5 0.666687L12.8333 4.00002"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-sm ml-3 font-medium leading-none ">السابق</p>
          </div>
          <div className="sm:flex hidden">
            {/* Render page numbers */}
            {Array.from({ length: totalPages }, (_, index) => (
              <p
                key={index}
                className={`text-sm font-medium leading-none cursor-pointer text-gray-600 ${
                  currentPage === index + 1 ? 'text-indigo-700' : 'hover:text-indigo-700'
                } border-t border-transparent ${
                  currentPage === index + 1 ? 'border-indigo-400' : 'hover:border-indigo-400'
                } pt-3 mr-4 px-2`}
                onClick={() => handlePageClick(index + 1)}
              >
                {index + 1}
              </p>
            ))}
          </div>
          <div
            className="flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer"
            onClick={handleNextClick}
          >
            <p className="text-sm font-medium leading-none mr-3">التالي</p>
            <svg
              width={14}
              height={8}
              viewBox="0 0 14 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.1665 4H12.8332"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1.1665 4L4.49984 7.33333"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1.1665 4.00002L4.49984 0.666687"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="text-center mt-10 p-10">
    <h1 className="font-bold text-3xl bg-gray-200 p-5 w-full rounded-xl  mb-4">جزء من اعمال المخيطة
</h1>

  </div>
  <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        {delproduct.length === 0 ?(<>
    
    <div className="text-2xl  w-full py-48 justify-center flex items-center  text-neutral-800  dark:text-neutral-50">
    لا توجد طلبات مباعة للعرض  😢   </div></>):(
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {delproduct?.map((product) => (
            <a key={product.id} href={product.href} className="group">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img 
                  src={product.photo}
                  alt="Product"
                  className="h-96 w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              {/* <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3> */}
              {/* <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p> */}
            </a>
          ))}
        </div>
  )}  </div>
    </div>
{/* <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
{delproduct.length === 0 ?(<>
    
    <div className="text-2xl  w-full py-48 justify-center flex items-center  text-neutral-800  dark:text-neutral-50">
    لا توجد طلبات مباعة للعرض  😢   </div></>):(
<section
    id="Projects"
    className="w-full mx-auto flex flex-wrap gap-5 mt-10 mb-5 justify-center"
  >
          {delproduct?.map((del) => {
                    return (
                      
    <div  key={del.id} className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
      

        <img
          src={del.photo}
          alt="Product"
          className="h-80 w-72 object-cover rounded-t-xl"
        />
        <div className="px-4 py-3 w-72">
        
          <p className="text-lg font-semibold text-black cursor-auto my-3">
            الاسم :  {del.name}
            </p>
            <p className="text-lg font-semibold text-black cursor-auto my-3">
            الوصف :  {del.description}            </p>
    
        </div>
    
         
    </div>
        );
      })}
      </section>
    )}</div> */}
  
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
      onChange={(e)=>setWaistline(e.target.value)}
      className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border-2 border-gray-300 p-2 focus:border-[#E8AA42] shadow-sm rounded-lg"
    />
  </div>
  <div className='p-2'>
    <label className="font-medium">محيط الورك</label>
    <input
      type="text"
      required
      value={hipHircumference}
      onChange={(e)=>setHipcircumference(e.target.value)}
      className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border-2 border-gray-300 p-2 focus:border-[#E8AA42] shadow-sm rounded-lg"
    />
  </div>
  
</div>
<div>
              <label className="font-medium">رقم الهاتف</label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setphone(e.target.value)}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border-2 border-gray-300 p-2 focus:border-[#E8AA42] shadow-sm rounded-lg"
              />
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
