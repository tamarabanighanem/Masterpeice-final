import React, { useEffect, useState } from 'react';
import img1 from '../images/شعار_مخيطة-removebg-preview.png'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserContext';
import  { useContext } from 'react';

const Nav = ({username ,forceUpdate}) => {
  const [state, setState] = useState(false);
  const { SignStatus,updateSignStatus } = useContext(UserContext)

  // Replace javascript:void(0) paths with your paths
  const navigation = [
    { title: "عن أبرة وخيط", path: "/About" },
    { title: "تواصل معنا", path: "/ContactUs" },
    // { title: "خدماتنا", path: "/" },
    // { title: "الرئيسية", path: "/"}
  ];
  const [refresh,setRefresh]=useState([])

  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  // const toggleMenu = () => {
  //   setIsMenuOpen(!isMenuOpen);
  // };

  function handleLogout() {
    localStorage.clear();
    window.location.href = 'http://localhost:3000/';
    // forceUpdate();
  }
  useEffect(() => {
    document.onclick = (e) => {
      const target = e.target;
      if (!target.closest(".menu-btn")) {
      setState(false);
    setRefresh(state)}
    };
  }, [refresh]);
console.log("nav",username)



const [role ,setRole ]= useState("")

const fetchProtectedData = async () => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await axios.get("http://localhost:5000/checkToken", {
        headers: {
          Authorization: token,
        },
      });
      
      if (response.data.role ==="مخيطة") {
        setRefresh(role)
      } 
      else if  (response.data.role !=="مخيطة"){
        setRefresh(role)

      }
      setRole(response.data.role)
      setRefresh(role)

    


    }
  

  } catch (error) {
    console.error(error);
  
  } finally {
    console.log(false);

  }
};


useEffect(()=>{
// if(localStorage.token != null){   
  fetchProtectedData()
},[refresh])


console.log(role)




  return (
    <nav className={`bg-fuchsia-200 p-5 fixed z-50 w-full md:text-sm ${state ? "rtl:text-right shadow-lg text-black rounded-xl border mx-2 mt-2 md:shadow-none md:border-none md:mx-2 md:mt-0" : ""}`}>
      <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
        <div className="flex items-center justify-between py-1 md:block logoimg">
          
          <Link to={"/"}>  
  
                      <p className='namenav'>ابرة وخيط</p>

            </Link>
          <div className="md:hidden">
            <button className="menu-btn text-gray-500 hover:text-gray-800" onClick={() => setState(!state)}>
              {state ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div className={`flex-1 items-center mt-8 md:mt-0 md:flex ${state ? 'block' : 'hidden'}`}>
          <ul className="justify-center items-center space-y-6 md:flex md:space-x-6 md:space-x-reverse md:space-y-0">
            {navigation.map((item, idx) => (
              <li key={idx} className="text-black hover:text-gray-900 text-xl">
                <Link to={item.path} className="block">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          
                            <div className="rtl:text-right flex-1 gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0">

{username? (
              <>
                <div className="relative">
                  <button
                    id="dropdownInformationButton"
                    data-dropdown-toggle="dropdownInformation"
                    className="text-white bg-fuchsia-800 hover:bg-fuchsia-400 focus:ring-4 focus:outline-none focus:ring-fuchsia-300 font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center"
                    type="button"
                    onClick={toggleDropdown}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>{" "}
                    <svg
                      className="w-4 h-4 ml-2"
                      aria-hidden="true"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {/* Dropdown menu */}
                  {showDropdown && (
                    <div
                      id="dropdownInformation"
                      className="z-10 w-auto bg-white divide-y divide-gray-100 rounded-lg shadow  dark:bg-gray-700 dark:divide-gray-600 absolute top-10 left-0"
                    >
                      <div className="px-4 py-3 text-sm text-gray-900 text-center dark:text-white">
                        <div>{username}</div>
                        {/* <div className="font-medium truncate">
                          {userEmail}
                        </div> */}
                      </div>
                      <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownInformationButton"
                      >
                        <li>
                          {role === "مستخدم" ? 
                          <>
                          
                                          <Link
                            to="/ProfileUser"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-center dark:hover:text-white"
                          >
                          الملف الشخصي
                          </Link>
                          
                          
                          </>
                          


                          :
                          <>
                          
                          <Link
                            to="/Profileprovider"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-center dark:hover:text-white"
                          >
                            الملف الشخصي
                          </Link>
                          
                          
                          </>
                          
                          
                          }
          
                        </li>
                      </ul>
                      <div className="py-2" onClick={handleLogout}>
                        <Link
                          to="/"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 text-center dark:hover:text-white"
                        >
                          الخروج
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
        
              <Link to="/Signup" className="flex items-center justify-center gap-x-1 text-xl py-2 px-4 text-white font-medium bg-fuchsia-800 hover:bg-white hover:text-fuchsia-800 active:bg-gray-900 rounded-full md:inline-flex">
  تسجيل
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
  </svg>
</Link>
            )}
</div>
        
        </div>
      </div>
    </nav>
  );
}

export default Nav;
