  import React from 'react'
  import { useState } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import axios from 'axios'


  function ForgotPassword() {
      const [email, setEmail] = useState()
      const navigate = useNavigate()

      // axios.defaults.withCredentials = true;
      const handleSubmit = (e) => {
          e.preventDefault()
          axios.post('http://localhost:5000/forgotpassword', {email})
          .then(res => {
              if(res.data.Status === "Success") {
                  navigate('/Login')
                
              }
          }).catch(err => console.log(err))
      }

      return(
          <div className="flex h-screen  justify-center items-center"  style={{ backgroundImage: ' linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1613555793439-c50b6274176a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80")', backgroundRepeat: 'no-repeat',backgroundSize:'cover' ,backgroundPosition:'bottom'}}>
        <div className="pt-36  flex justify-center text-center rounded">
          <div className='border-1 mb-20 p-5 bg-gray-100 bg-opacity-40 rounded-lg flex flex-col items-center justify-center'>
          <h4 className='pb-20'>هل نسيت كلمة السر ؟</h4>
          <form   onSubmit={handleSubmit}>
            <div className="mb-3 ">
              <label className='pl-2' htmlFor="email">
                <strong>البريد الالكتروني</strong>
              </label>
              <input 
              required
                type="email"
                placeholder="ادخل بريدك الالكتروني"
                autoComplete="off"
                name="email"
                className="form-control p-2 rounded-0"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button type="submit" className="btn bg-fuchsia-600 mb-16 text-white p-3 mt-20 btn-success w-100 rounded-lg">
              ارسال
            </button>
            </form>
            </div>
        </div>
      </div>
      )
  }

  export default ForgotPassword;
