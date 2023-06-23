import { useState,useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Pricing from './Pricing';
import ContactUs from './ContactUs'
import Product from './Product';
import Stitched from './Stitched'
import Profile from './ProfileProviderr';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Prodectdetails from './Prodectdetails';
import ProductCollection from './ProductCollection';
import Checkout from './Checkout';
import Benficiry from './benficiry';
import EditProfile from './Editprofile';
import ProfileUser from './ProfileUser';
import Resorts from './Test';
// Initialization for ES Users
import {
  Collapse,
  Ripple,
  initTE,
} from "tw-elements";
import About from './About';
import Nav from './Nav';
import Footer from './Footer';

function App() {
  initTE({ Collapse, Ripple });

  const [userId ,setUserId] = useState()
  const fetchProtectedData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.get("http://localhost:5000/checkToken", {
          headers: {
            Authorization: token,
          },
        });
        setUserId(response.data.user.id)
      }
    } catch (error) {
      console.error(error);
      localStorage.removeItem("token");
      window.location.href = "http://localhost:3000/Login";
    } finally {
      console.log(false);

    }
  };


useEffect(()=>{
  if(localStorage.token != null){   
    fetchProtectedData()
  }
},[])






  return (
  

 
<>
<BrowserRouter>
<Nav/>
<Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/productcollection' element={<ProductCollection/>}/>
  <Route path='/product' element={<Product/>}/>
  <Route path='/Login' element={<Login/>}/>
  <Route path='/Signup' element={<Signup/>}/>
  <Route path='/Pricing' element={<Pricing/>}/>
  <Route path='/ContactUs' element={<ContactUs/>}/>
  <Route path='/About' element={<About/>}/>
  <Route path='/stisched' element={<Stitched/>}/>
  <Route path='/Profile' element={<Profile/>}/>
  <Route path='/productdetails' element={<Prodectdetails/>}/>
  <Route path='/checkout' element={<Checkout/>}/>
  <Route path='/ben' element={<Benficiry/>}/>
  <Route path='/Editprofile' element={<EditProfile/>}/>
  <Route path='/ProfileUser' element={<ProfileUser userIdapp={userId}/>}/>

</Routes>
<Footer/>
</BrowserRouter>
</>

  );
}

export default App;
