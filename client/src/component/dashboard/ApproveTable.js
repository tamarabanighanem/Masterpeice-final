import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { UserContext } from '../../UserContext';
const ApproveTable = () => {
  const [allComment, setAllcomment] = useState([])
  const { pagination, setItem, currentItems } = useContext(UserContext)
  const [refresh, setrefresh] = useState([])

  const handleDelete = async (id) => {
    try {
      const confirmed = await Swal.fire({
        title: 'هل انت متأكد؟',
        text: 'You are about to delete the product. This action cannot be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'نعم اود حذفه!'
      });

      if (confirmed.isConfirmed) {
        await axios.put(`http://localhost:5000/deleteComment/${id}`);

      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/allcomment`)
      .then((response) => {
        setrefresh(allComment)
        setItem(allComment)
        setAllcomment(response.data);
      })
      .catch((error) => console.log(error.message));

  }, [refresh])
  return (

    <>
      <div className='bg-[#ffffff] mr-5 ml-5 p-10 rounded-2xl min-h-[calc(100vh)] '>


        <div className="relative flex items-center justify-between pt-4">
          <div className="text-xl font-bold text-navy-700 dark:text-white">
            التعليقات المسيئة    </div>
        </div>
        <div className="mt-8 overflow-x-scroll xl:overflow-hidden">

          <div className="">
            {currentItems?.map((comment) => (
              <div key={comment.id} className="bg-gray-200 m-5 p-2 px-8 rounded-xl  flex">
                <div className="flex-grow">
                  <h4 className="font-bold ">{comment.name}</h4>
                  <hr className="text-black" />
                  <p className="text-sm ">{comment.body}</p>
                </div>
                <button
                  onClick={() => handleDelete(comment.id)}
                  className="mt-2  text-red-500 text-sm self-start"
                >
                  حذف     
                   </button>
              </div>

            ))}
          </div>
        </div>
        {pagination}
      </div>
    </>
  )
}

export default ApproveTable