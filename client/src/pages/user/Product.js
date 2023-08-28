import React, { useState, useEffect ,useContext} from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { UserContext } from '../../UserContext';

const Product = ({ userIdapp }) => {
  const { id, itemId } = useParams();
  const [user, setUser] = useState({});
  const [product, setProduct] = useState({});
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState('');
  const [phone, setPhone] = useState('');
  const [body, setBody] = useState('');
  const [product1, setProduct1] = useState({});
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [reportReason, setReportReason] = useState('');
  const {pagination,setItem,currentItems}=useContext(UserContext)

  useEffect(() => {
    // Fetch product details
    fetchProduct();
  
    // Fetch user details
    try {
      axios
        .get(`http://localhost:5000/dataUser/${userIdapp}`)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    } catch (error) {
      console.log(error.message);
    }
  
    // Fetch comments
    fetchComments();
  }, [id, userIdapp]);
  console.log(user.username)
  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/eachproduct/${id}`);
      setProduct(response.data[0]);
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/commentEachProduct/${id}`);
      setComments(response.data);
      setItem(response.data)
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const newComment = {
      user_id: userIdapp,
      product_id: id,
      name: user.username,
      body: commentContent,
    };
    
    try {
      await axios.post(`http://localhost:5000/comment`, newComment);
      setCommentContent('');

      Swal.fire({
        icon: 'success',
        title: 'تمت اضافة التعليق بنجاح',
        
      });

      fetchComments();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to submit the comment.',
      });

      console.error(error.message);
    }
  };

  const handleReportComment = (commentId) => {
    setSelectedCommentId(commentId);
    setShowReportModal(true);
  };

  const handleReportSubmit = async () => {
    try {
      await axios.put(`http://localhost:5000/reportComment/${selectedCommentId}`, {
        reason: reportReason,
      });

      Swal.fire({
        icon: 'success',
        title: 'تم الإبلاغ!',
        text: 'تم الإبلاغ عن التعليق.',
    });
    

      setShowReportModal(false);
      fetchComments();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to report the comment.',
      });

      console.error(error.message);
    }
  };
const handleSubmit = async (event) => {
  event.preventDefault(); // Prevent the default behavior of the event
  const product={
    phone:phone,
    description:body,
    mkhiata_id:itemId,
    user_id:userIdapp,
    photo:product1.photo,
    
  }

  try {
    const response = await axios.post(`http://localhost:5000/requistProduct`, product);

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

  useEffect(() => {
    fetchProduct();
    fetchComments();
  }, [id]);

  return (
    <div>
      <section className="mx-auto max-w-screen-xl pt-28 px-4 py-8">
        {/* Product details section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="grid grid-cols-2 gap-4 sticky top-40">
            <img
              alt="Product"
              src={product.photo}
              className=" h-full w-full rounded-xl object-cover"
            />
            <div className="">
              {/* Product info */}
              <div className="mt-8 flex justify-between">
                <div className="max-w-[35ch] space-y-2">
                  <h1 className="text-xl font-bold sm:text-2xl">{product.name}</h1>
                </div>
              </div>
              <div className="mt-4 prose max-w-none">
                <p>{product.description}</p>
                <p className="text-lg font-bold"> {product.price}دينار</p>
              </div>
              <Link
                to={`/checkout/${id}/${itemId}`}
                className="inline-block mt-2 rounded bg-fuchsia-800 hover:bg-fuchsia-400 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-fuchsia-300 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                data-te-ripple-init=""
                data-te-ripple-color="light"
              >
                الشراء الان
              </Link>
            </div>
          </div>

          {/* Comments section */}
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="col-span-1 md:col-span-2">
                <form onSubmit={handleCommentSubmit} className="bg-white rounded-lg px-4 pt-2">
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-full px-3 mb-2 mt-2">
                      <textarea
                      required
                        className="bg-gray-100 rounded border border-gray-400 w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                        name="body"
                        placeholder="اكتب تعليق"
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                      />
                    </div>
                    <div className="w-full flex items-start md:w-full px-3">
                      <div className="-mr-1">
                        <input
                          type="submit"
                          className="bg-fuchsia-800 text-sm  text-white font-medium py-2 px-4 border border-fuchsia-400 rounded tracking-wide mr-1 hover:bg-fuchsia-400"
                          value="ارسال"
                        />
                      </div>
                    </div>
                  </div>
                </form>
                <div>
   {/* Display pagination if there are 3 or more comments */}
  {currentItems.map((comment) => (
    <div key={comment.id} className="bg-gray-200 m-5 p-2 px-8 rounded-xl  flex">
      <div className="flex-grow">
        <h4 className="font-bold ">{comment.name}</h4>
        <hr className="text-black" />
        <p className="text-sm ">{comment.body}</p>
      </div>
      <button
        onClick={() => handleReportComment(comment.id)}
        className="mt-2  text-blue-500 text-sm self-start"
      >
        ابلاغ
      </button>
    </div>
    
  ))}
  {comments.length >= 3 && pagination}
  {/* {comments.length >= 3 && pagination} Display pagination again at the end */}
</div>
{/* In this code, the pagination component is only displayed if the comments array has 3 or more items. It appears both before the comment list and after it. You can adjust the placement of the pagination component according to your design requirements. */}






              </div>
            </div>
          </div>
        </div>
      </section>


      <div className="pt-20 bg-purple-100">
  <div className="mx-auto max-w-screen-md p-8">
    <h4 className="pb-5 text-center">إذا كنت ترغب بتفصيل نفس القطة مع اختلاف بعض المواصفات املأ النموذج التالي</h4>
    <form className="p-4 md:p-8" onSubmit={handleSubmit}>
      <div className="bg-white border rounded border-gray-300 p-4 shadow-lg max-w-xl mx-auto">
        <input
          className="bg-gray-100 border rounded border-gray-300 p-2 mb-4 outline-none w-full"
          spellCheck="false"
          placeholder="رقم الهاتف"
          type="text"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
        <textarea
          className="bg-gray-100 rounded sec p-3 h-40 md:h-60 border border-gray-300 outline-none w-full"
          spellCheck="false"
          placeholder="اكتب الوصف الذي ترغب فيه"
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
        />
        <div className="buttons pt-5 flex justify-center md:justify-end">
          <button
            type="submit"
            className="btn border rounded bg-fuchsia-800 hover:bg-fuchsia-400 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 "
          >
            إرسال
          </button>
        </div>
      </div>
    </form>
  </div>
</div>


      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-opacity-75 bg-gray-900">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">
              سبب الابلاغ :
            </h2>
            <select
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="">اختر السبب</option>
              <option value="Inappropriate content">محتوى غير لائق</option>
              <option value="Spam">رسائل إلكترونية مزعجة</option>
              <option value="Offensive language">لغة بذيئة</option>
              <option value="Other">اخرى</option>
            </select>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleReportSubmit}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                ابلاغ
              </button>
              <button
                onClick={() => setShowReportModal(false)}
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
الغاء              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
