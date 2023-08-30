import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Signup = ({ s }) => {
  const [isMokhitaChecked, setIsMokhitaChecked] = useState(false);
  const navigate = useNavigate();
  const [rolell, setrolell] = useState("");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [domain, setdomain] = useState("");
  const [address, setaddress] = useState("");
  const[about,setAbout]=useState('')

  // Validation patterns
  const usernameRegex = /^[\u0600-\u06FF0-9_]{3,20}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const phoneRegex = /^(\+?\d{1,4}[\s-]?)?\d{10}$/; // You can modify the regex for your specific phone number format

  // Error states for validation
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phoneError, setPhoneError] = useState(""); // Add phoneError state

  const handleRadioChange = (e) => {
    setIsMokhitaChecked(e.target.value === 'مخيطة');
    setrolell(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the inputs
    if (!usernameRegex.test(username)) {
      setUsernameError("Username must be between 3 and 20 characters and can only contain Arabic characters, numbers, and underscores.");
      return;
    } else {
      setUsernameError("");
    }

    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    } else {
      setEmailError("");
    }
    if (!phoneRegex.test(domain)) {
      setPhoneError("Please enter a valid phone number.");
      return;
    } else {
      setPhoneError("");
    }
    if (!passwordRegex.test(password)) {
      setPasswordError("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
      return;
    } else {
      setPasswordError("");
    }

    // If all validations pass, submit the data
    const data = {
      username: username,
      email: email,
      password: password,
      domain: domain,
      address: address,
      role: rolell
    };
    // Iyad123@T
    // reset   Tamara123@I
    axios
      .post('http://localhost:5000/Register', data)
      .then((res) => {
        const { token } = res.data;
        localStorage.setItem('token', token);
        console.log(res);
        if (isMokhitaChecked) {
          navigate('/Profileprovider');
        } else {
          navigate('/stisched');
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'للاسف',
          text: 'البريد الالكتروني مسجل مسبقا',
          // footer: '<a href="#">Why do I have this issue?</a>'
        })
      });

  };

  return (
    <>
      <main className="w-full h-full flex flex-col items-center justify-center  sm:px-4 " style={{ backgroundImage: ' linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1571175239128-98f16e790b65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80")', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'bottom' }}>
        <div className="w-full space-y-6 mt-[7rem] mb-[7rem] text-gray-600 sm:max-w-md">


          <div className="bg-fuchsia-50 shadow p-4 py-6 sm:p-6 sm:rounded-lg">
            <div className="text-center ">
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
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="font-medium">الإسم</label>
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => setusername(e.target.value)}
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-fuchsia-600 shadow-sm rounded-lg"
                />
                {usernameError && <p className="text-red-600 text-xs">{usernameError}</p>}
              </div>
              <div>
                <label className="font-medium">البريد الإلكتروني</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-fuchsia-600 shadow-sm rounded-lg"
                />
                {emailError && <p className="text-red-600 text-xs">{emailError}</p>}
              </div>
              <div>
  <label className="font-medium">رقم الهاتف</label>
  <input
    type="text"
    name="phone"
    onChange={(e) => setdomain(e.target.value)}
    required
    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-fuchsia-600 shadow-sm rounded-lg"
  />
  {phoneError && <p className="text-red-600 text-xs">{phoneError}</p>}
</div>

              <div>
                <label className="font-medium">كلمة السر</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-fuchsia-600 shadow-sm rounded-lg"
                />
                {passwordError && <p className="text-red-600 text-xs">{passwordError}</p>}
              </div>
              {isMokhitaChecked && (

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* <div>
                    <label className="font-medium">رقم الهاتف</label>
                    <input
                      type="text"
                      name="domain"
                      onChange={(e) => setdomain(e.target.value)}

                      required
                      className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-fuchsia-600 shadow-sm rounded-lg"
                    />
                  </div> */}
                  <div>
                    <label className="font-medium">العنوان</label>
                    <input
                      type="text"
                      name="address"
                      onChange={(e) => setaddress(e.target.value)}

                      required
                      className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-fuchsia-600 shadow-sm rounded-lg"
                    />
                  </div>
                
                    <div>
                    <label className="font-medium">عن المخيطة</label>
                    <textarea
                      required
                      placeholder="..."
                      onChange={(e) => setAbout(e.target.value)}
                      className="w-full mt-2 h-28 md:h-36 px-3 py-2 border-2 border-gray-300 p-2 rounded-lg resize-none appearance-none bg-transparent outline-none focus:border-fuchsia-600 shadow-sm"
                    ></textarea>
                  </div>
                </form>

              )}
              <button type='submit' className="w-full px-4 py-2 text-white font-medium bg-fuchsia-800 hover:bg-fuchsia-300 hover:text-fuchsia-800 active:bg-fuchsia-600 rounded-lg duration-150">
                إنشاء حساب
              </button>
            </form>
          </div>

        </div>
      </main>
    </>
  );
};

export default Signup;
