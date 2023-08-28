import React from 'react'
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios'


function ResetPassword() {
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const {id, token} = useParams()

    // axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:5000/reset-password/${id}/${token}`, {password})
        .then(res => {
    
          console.log(id)
          console.log(token)
          console.log(id)
          console.log(token)
            if(res.data.Status === "Success") {
                navigate('/Login')
               
            }
            
        }).catch(err => console.log(err))
    }

    return(
      <div className="flex h-screen  justify-center items-center"  style={{ backgroundImage: ' linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1613555793439-c50b6274176a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80")', backgroundRepeat: 'no-repeat',backgroundSize:'cover' ,backgroundPosition:'bottom'}}>
      <div className="pt-36  flex justify-center text-center rounded">
        <div className='border-1 mb-20 p-5 bg-gray-100 bg-opacity-40 rounded-lg flex flex-col items-center justify-center'>
        <h4 className='pb-20'>اعادة تعيين كلمة المرور</h4>
        <form onSubmit={handleSubmit}>
        <div className="mb-3 ">
              <label className='pl-2' htmlFor="email">
              <strong>كلمة المرور جديدة</strong>
            </label>
            <input
              type="password"
              placeholder="ادخل كلمة المرور"
              autoComplete="off"
              name="password"
              className="form-control p-2 rounded-0"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn bg-fuchsia-600 mb-16 text-white p-3 mt-20 btn-success w-100 rounded-lg">
            تعديل
            </button>
          </form>
        </div>
      </div>
    </div>
    )
}

export default ResetPassword;