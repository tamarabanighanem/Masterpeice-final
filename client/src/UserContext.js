import React from "react";
import { useEffect, createContext, useState } from "react";
import axios from 'axios'

export const UserContext = createContext();
export default function UserProvider ( {children} ) {
  
  // const [test, setTest] = useState([]);


  // const updateTest = (newValue) => {
  //   setTest(newValue);
  // };

const[item,setItem]=useState([])

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3; // Number of items to display per page
      // Calculate the current items to be displayed based on the current page
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = item.slice(indexOfFirstItem, indexOfLastItem);
    
      // Calculate the total number of pages
      const totalPages = Math.ceil(item.length / itemsPerPage);
    
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
      
  const pagination=(<div>
  
  
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
</div>)
  

  return (
        <>
            <UserContext.Provider
                value={{
                pagination,setItem,currentItems
                }}
            >
                {children}
            </UserContext.Provider>
        </>
    )
};
  // UserProvider;




