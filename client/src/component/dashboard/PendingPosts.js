import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { UserContext } from '../../UserContext';

const PendingPosts = () => {
  const [pendingpost,setpendingpost] = useState([]);
  const {pagination,setItem,currentItems}=useContext(UserContext)

  useEffect(() => {
    async function getResorts() {
      try {
        const response = await axios.get("http://localhost:5000/pending-product");
        setpendingpost(response.data.data.resorts);
        setItem(response.data.data.resorts)
        console.log(response.data.data.resorts);
      } catch (error) {
        console.log(error);
      }
    }

    getResorts();
  }, []);

  const alert = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Added Successfully",
      showConfirmButton: false,
      timer: 1800,
    });
  };

  const handleReject = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/resorts/${id}`);
      setpendingpost(response.data.data.resorts);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccept = async (id) => {
    try {
      const response = await axios.post(`http://localhost:5000/resorts/${id}`);
      setpendingpost(response.data.data.resorts);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-fuchsia-100 p-10">
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center pb-4">الطلبات المعلقة</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {currentItems.map((element) => (
          <div key={element.id} className="bg-white rounded-xl shadow-md p-4">
            <img
              src={element.photo}
              alt="Product"
              className="w-full h-48 object-cover rounded-md"
            />
            <div className="mt-4">
              <p className="text-lg font-semibold text-black">
                الاسم: {element.name}
              </p>
              <p className="text-lg font-semibold text-black">
                الوصف: {element.description}
              </p>
            </div>
            <div className="mt-4 flex  justify-center space-x-2">
              <button
                className="p-2 bg-fuchsia-800 ml-2 text-white rounded hover:bg-fuchsia-200 hover:text-fuchsia-800"
                onClick={() => {
                  alert();
                  handleAccept(element.id);
                }}
              >
                قبول
              </button>
              <button
                className="p-2 bg-[#dc2626] text-white rounded hover:bg-[#991b1b] hover:text-black"
                onClick={() => {
                  handleReject(element.id);
                }}
              >
                حذف
              </button>
            </div>
          </div>

        ))
      }
      </div>
      {pagination}

    </div>
  </div>
  );
};

export default PendingPosts;
