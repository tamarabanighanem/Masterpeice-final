import React, { useState } from 'react';
import img1 from '../images/شعار_مخيطة-removebg-preview.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [isMokhitaChecked, setIsMokhitaChecked] = useState(false);
  const navigate = useNavigate();
  const [rolell, setrolell] = useState("")
  const [username, setusername] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [domain, setdomain] = useState("")
  const [address, setaddress] = useState("")

  

  const handleRadioChange = (e) => {

    setIsMokhitaChecked(e.target.value === 'مخيطة');
    setrolell(e.target.value)
  
  };


  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   // setValue((prevValue) => ({
  //   //   ...prevValue,
  //   //   [name]: value,
  //   // }));
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    // localStorage.setItem('value', JSON.stringify(value));
    const data={  
      username: username,
      email:email,
      password: password,
      domain:domain,
      address: address,
      role:rolell}
      console.log(data)
    axios
      .post('http://localhost:5000/Register', data)
      .then((res) => {
        const { token } = res.data;
        localStorage.setItem('token', token);
        console.log(res);
        

        if (isMokhitaChecked) {
          navigate('/home');
        } else {
          navigate('/stisched');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      <main className="w-full h-screen flex flex-col items-center justify-center  sm:px-4 mt-[7rem] mb-[7rem]">
        <div className="w-full space-y-6 text-gray-600 sm:max-w-md">
          <div className="text-center ">
            {/* <img src={img1} width={150} className="mx-auto" alt='' /> */}
            <div className="mt-5 space-y-2">
              <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">انشئ حساب</h3>
              <p className="">
                هل لديك حساب؟{' '}
                <Link to="/Login" className="font-medium text-fuchsia-800 hover:text-fuchsia-500">
                  تسجيل الدخول
                </Link>
              </p>
            </div>
          </div>
          <div className="flex gap-10">
            <div className="inline-flex items-center">
              <label
                className="relative flex cursor-pointer items-center rounded-full p-3"
                htmlFor="ripple-on"
                data-ripple-dark="true"
              >
                <input
                  id="ripple-on"
                  name="ripple"
                  type="radio"
                  className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-pink-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-pink-500 checked:before:bg-pink-500 hover:before:opacity-10"
                  defaultChecked=""
                  value="مستخدم"
                  onChange={handleRadioChange}
                />
                <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-pink-500 opacity-0 transition-opacity peer-checked:opacity-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                    <circle data-name="ellipse" cx={8} cy={8} r={8} />
                  </svg>
                </div>
              </label>
              <label className="mt-px cursor-pointer select-none font-light text-gray-700" htmlFor="ripple-on">
                مستخدم
              </label>
            </div>
            <div className="inline-flex items-center">
              <label
                className="relative flex cursor-pointer items-center rounded-full p-3"
                htmlFor="ripple-off"
              >
                <input
                  id="ripple-off"
                  name="ripple"
                  type="radio"
                  className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-pink-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-pink-500 checked:before:bg-pink-500 hover:before:opacity-10"
                  value="مخيطة"
                  onChange={handleRadioChange}
                />
                <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-pink-500 opacity-0 transition-opacity peer-checked:opacity-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                    <circle data-name="ellipse" cx={8} cy={8} r={8} />
                  </svg>
                </div>
              </label>
              <label className="mt-px cursor-pointer select-none font-light text-gray-700" htmlFor="ripple-off">
                مخيطة
              </label>
            </div>
          </div>

          <div className="bg-fuchsia-50 shadow p-4 py-6 sm:p-6 sm:rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="font-medium">الإسم</label>
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e)=>setusername(e.target.value)}
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-fuchsia-600 shadow-sm rounded-lg"
                />
              </div>
              <div>
                <label className="font-medium">البريد الإلكتروني</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e)=>setemail(e.target.value)}
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-fuchsia-600 shadow-sm rounded-lg"
                />
              </div>
              <div>
                <label className="font-medium">كلمة السر</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e)=>setpassword(e.target.value)}
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-fuchsia-600 shadow-sm rounded-lg"
                />
              </div>
              {isMokhitaChecked && (
                <div className="bg-white shadow p-4 py-6 sm:p-6 sm:rounded-lg">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="font-medium">المجال</label>
                      <input
                        type="text"
                        name="domain"
                        onChange={(e)=>setdomain(e.target.value)}

                        required
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-fuchsia-600 shadow-sm rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="font-medium">العنوان</label>
                      <input
                        type="text"
                        name="address"
                        onChange={(e)=>setaddress(e.target.value)}

                        required
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-fuchsia-600 shadow-sm rounded-lg"
                      />
                    </div>
                  </form>
                </div>
              )}
              <button type='submit' className="w-full px-4 py-2 text-white font-medium bg-fuchsia-800 hover:bg-fuchsia-300 hover:text-fuchsia-800 active:bg-fuchsia-600 rounded-lg duration-150">
                إنشاء حساب
              </button>
            </form>
          </div>
          <div className="mt-5">
            <button className="w-full flex items-center justify-center gap-x-3 py-2.5 mt-5 border rounded-lg text-sm font-medium hover:bg-gray-50 duration-150 active:bg-gray-100">
              <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_17_40)">
                  <path d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z" fill="#4285F4" />
                  <path d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z" fill="#34A853" />
                  <path d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z" fill="#FBBC04" />
                  <path d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z" fill="#EB4335" />
                </g>
                <defs>
                  <clipPath id="clip0_17_40">
                    <rect width="48" height="48" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <span>استمرار بواسطة جوجل</span>
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Signup;
