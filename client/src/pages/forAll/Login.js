import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  // const[role,setRole]=useState("")
  // const [password, setPassword] = useState('');
  // const [email, setEmail] = useState('');
  const [value,setvalue]=useState({email:"",password:"",role:""})
  const navigate = useNavigate();
  const handleInput = (event) => {
    setvalue((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };
  const fetchProtectedData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.get("http://localhost:5000/checkToken", {
          headers: {
            Authorization: token,
          },

        });
        console.log(token)
        if (response.data.role ==="مخيطة") {
          console.log("tttttttttttttttttttttttttttttttttttttttttttttttttttt")
          // navigate("/Profileprovider");
          window.location.href = 'http://localhost:3000/Profileprovider';
        } 
        else if  (response.data.role ==="مستخدم"){
          console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
        // navigate("/stisched");
        window.location.href = 'http://localhost:3000/stisched';

        }
        else{
          window.location.href = 'http://localhost:3000/';

        }
        console.log(response.data)
        


      }
    

    } catch (error) {
      console.error(error);
      // localStorage.removeItem("token");
      // window.location.href = "http://localhost:3000/Login";
    } finally {
      console.log(false);

    }
  };
  const handleSubmet = async (e) => {
    e.preventDefault();
    // console.log(email,password,role)
    // localStorage.setItem("value",JSON.stringify(value))
    axios
      .post(`http://localhost:5000/Login`, {
        // email: email,
        // password:password,
        // role:setRole
        email:value.email,
        password:value.password,
        role:value.role,
        
      })
      .then( (response)=> {
        const {token}=response.data
        console.log(response.data.token)

        console.log(value.email)
        
        
        localStorage.setItem("token",token)
        // navigate("/")
        // if (response.role !== 'مخيطة') {
          //   console.log(response.role);
          fetchProtectedData()
          console.log(token)


          
        // } else {
        //   Swal.fire({
        //     icon: 'error',
        //     title: 'Oops...',
        //     text: 'Something went wrong!',
        //     footer: '<a href="">Why do I have this issue?</a>',
        //   });
        //   console.log('not passed');
        // }
        
      
      })
      .catch(function (error) {});
  };

  return (
    <>
      {/* <Nav/> */}
      <main className="w-full h-screen flex flex-col items-center bg-white justify-center px-4 "  style={{ backgroundImage: ' linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1571175239128-98f16e790b65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80")', backgroundRepeat: 'no-repeat',backgroundSize:'cover' ,backgroundPosition:'bottom'}}>
        <div className="max-w-sm w-full text-gray-600">
        
          <div className="bg-white shadow p-4 py-6 sm:p-6 sm:rounded-lg">
          <div className="text-center">
            {/* <img src={img1} width={100} className="mx-auto" alt="Float UI logo" /> */}
            <div className="mt-5 space-y-2">
              <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">التسجيل</h3>
              <p className="">
                هل لديك حساب؟{' '}
                <p className="font-medium text-fuchsia-600 hover:text-fuchsia-500">تسجيل الدخول</p>
              </p>
            </div>
          </div>
            <form onSubmit={handleSubmet} className="mt-8 space-y-5">
              <div>
                {/* <label className="font-medium">البريد الإلكتروني</label>
                  <input
                    type="email"
                    required
                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-fuchsia-600 shadow-sm rounded-lg"
                  /> */}
                <label className="font-medium">البريد الإلكتروني</label>
                <input
                  type="email"
                  required
                  name='email'
                  // value={value.email}
                  onChange={ handleInput}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border bg-white focus:border-fuchsia-600 shadow-sm rounded-lg"
                />
              </div>
              <div>
                <label className="font-medium">كلمة السر</label>
                <input
                  type="password"
                  required
                  // value={value.password}
                  name='password'
                  onChange={handleInput}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border bg-white focus:border-fuchsia-600 shadow-sm rounded-lg"
                />
              </div>
              <button type='submit'
                className="w-full px-4 py-2 text-white font-medium bg-fuchsia-800 hover:bg-fuchsia-300 hover:text-fuchsia-800 active:bg-fuchsia-600 rounded-lg duration-150"
              >
              دخول
              </button>
            </form>
          </div>
          <button className="w-full flex items-center justify-center gap-x-3 py-2.5 mt-5 border rounded-lg text-sm font-medium bg-white hover:bg-gray-50 duration-150 active:bg-gray-100">
            <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_17_40)">
                <path
                  d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z"
                  fill="#4285F4"
                />
                <path
                  d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z"
                  fill="#34A853"
                />
                <path
                  d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z"
                  fill="#FBBC04"
                />
                <path
                  d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z"
                  fill="#EA4335"
                />
              </g>
              <defs>
                <clipPath id="clip0_17_40">
                  <rect width="48" height="48" fill="white" />
                </clipPath>
              </defs>
            </svg>
            المتابعة باستخدام Google
          </button>
        </div>
      </main>
    </>
  );
};

export default Login;
