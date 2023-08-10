import { useState,useEffect ,useReducer} from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';

// import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './pages/forAll/Home';
import Login from './pages/forAll/Login';
import Signup from './pages/forAll/Signup';
import Pricing from './pages/forAll/Pricing';
import ContactUs from './pages/forAll/ContactUs'
import Product from './pages/user/Product';
import Stitched from './pages/user/Stitched'
import Prodectdetails from './pages/user/Prodectdetails';
import ProductCollection from './pages/user/ProductCollection';
import Checkout from './pages/forAll/Checkout';
import EditProfile from './component/Editprofile';
import ProfileUser from './pages/user/ProfileUser';
import Editproduct from './component/Editproduct';
import EditRequest from './component/EditRequest';
import Makhiata from './pages/forAll/Makhiata';
import RequestProduct from './pages/provider/RequestProduct';
import Pagenation from './pages/forAll/Pagenation';
// Initialization for ES Users
import {
  Collapse,
  Ripple,
  initTE,
} from "tw-elements";
import About from './pages/forAll/About';
import Nav from './component/Nav';
import Footer from './component/Footer';
import ProfileProviderr from './pages/provider/ProfileProviderr';



// -----------------------Dashboard routes----------------//

import Sidebar from "./pages/dashboard/Sidebar";
// import NavListMenuD from "../pages/dashboard/NavDashboard";
import Statistics from './pages/dashboard/Statistics';
import MainDashboard from "./pages/dashboard/MainDashboard";
import UserInfo from "./component/dashboard/UserInfo";
import PendingPosts from './component/dashboard/PendingPosts';
import  PaymentsInfo from './component/dashboard/Payment'
// import ProvidersList from "./components/dashboard/ProvidersList";
// import AdminInfo from './component/dashboard/AdminInfo';
import EditAboutUs from "./pages/dashboard/EditAboutUs";
// import PendingRecipes from "./dashboard/PendingRecipes";
// import Ingredients from  "../pages/dashboard/Ingredients"
// import AcceptPayment from "../components/dashboard/AcceptPayment";
// import AcceptIng from "./components/dashboard/AcceptIng";
import ApproveTable from './component/dashboard/ApproveTable';
import LiveChat from "./pages/dashboard/Chat"
function App() {
  initTE({ Collapse, Ripple });
  // const navigate = useNavigate();

  // const [isLog, updateIsLog] = useState(localStorage.getItem("token") ? true : false);
  const [hideRouter1, setHideRouterUser] = useState(false);
  const [hideRouter2, setHideRouterAdmin] = useState(true);
  // const [hideRouter3, setHideRouterProvider] = useState(true);

  const [userId ,setUserId] = useState("")
  const [username,setUsername]=useState("")
  const [role ,setRole] = useState("")

  const [reducer, forceUpdate] = useReducer((x) => x + 1, 0);

  const fetchProtectedData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.get("http://localhost:5000/checkToken", {
          headers: {
            Authorization: token,
          },
        });
        setUserId(response.data.id)
        setUsername(response.data.username)

        console.log(response)
        let handelRout
        console.log(token)
        if (response.data.role ==="مخيطة") {
          handelRout=[false,true]
          // 'http://localhost:3000/Profileprovider';
        } 
        else if  (response.data.role ==="مستخدم"){
          handelRout=[false,true]
                            // 'http://localhost:3000//stisched';
        }
        else if(response.data.role==="admin"){
          handelRout=[true,false];
          
        }
        console.log(handelRout)
        setRole(response.data.role)
        console.log(response.data)
        console.log(userId)
        console.log(userId)
        console.log(userId)
        setHideRouterUser(handelRout[0]);
        setHideRouterAdmin(handelRout[1]);
            
      }
      console.log(userId)
      console.log(role)

    } catch (error) {
      console.error(error);
      // localStorage.removeItem("token");
      // window.location.href = "http://localhost:3000/Login";
    } finally {
      console.log(false);

    }
  };


useEffect(()=>{
  // if(localStorage.token != null){   
    fetchProtectedData()
  }
,[reducer])

console.log(userId)
console.log(username)

console.log("ffffffffffff",forceUpdate)

  // ----------------------user routes----------------- //

  const AppRouter1 = () => {
    return (
      <Router>
       <Nav
      username = {username} forceUpdate={forceUpdate}
       />
    <Routes>
  <Route path='/editRequest/:requestId' element={<EditRequest/>}/>
  <Route path='/' element={<Home/>}/>
  <Route path='/productcollection/:itemId' element={<ProductCollection userIdapp={userId}/>}/>
  <Route path='/product/:id/:itemId' element={<Product userIdapp={userId}/>}/>
  <Route path='/Login' element={<Login />}/>
  <Route path='/Signup' element={<Signup />}/>
  <Route path='/Pricing' element={<Pricing/>}/>
  <Route path='/makhiata' element={<Makhiata/>}/>
  <Route path='/ContactUs' element={<ContactUs/>}/>
  <Route path='/About' element={<About/>}/>
  <Route path='/stisched' element={<Stitched/>}/>
  <Route path='/Profileprovider' element={<ProfileProviderr userIdapp={userId}/>}/>
  <Route path='/productdetails' element={<Prodectdetails/>}/>
  <Route path='/checkout/:id/:itemId' element={<Checkout userIdapp={userId}/>}/>
  <Route path='/Editprofile' element={<EditProfile userIdapp={userId}/>}/>
  <Route path='/Editproduct/:productId' element={<Editproduct/>}/>
  <Route path='/ProfileUser' element={<ProfileUser userIdapp={userId}/>}/>
  <Route path='/requestProduct' element={<RequestProduct/>}/>
  <Route path='pagenation' element={<Pagenation/>}/>

</Routes>
<Footer/>
</Router>
    );
  };

    // ----------------------dashboard routes----------------- //
    const AppRouter2 = () => {
      return (
        <Router>
          <Sidebar />
          <div style={{ width: "100%" }}>
            {/* <NavListMenuD userIdapp={userId} /> */}
            <Routes>
              <Route index element={<MainDashboard/>} />
              <Route path="ListUser" element={<UserInfo/>} />
              <Route path='/PaymentsInfo' element={<PaymentsInfo/>}/>
              {/* <Route path='/s' element={<Statistics/>}/> */}

              {/* <Route path="UserProfile" element={<UserProfile />} /> */}
              {/* <Route path="ListProviders" element={<ProvidersList />} /> */}
              {/* <Route path="ListAdmin" element={<AdminInfo />} /> */}
              <Route path="EditAboutContact" element={<EditAboutUs />} />
              <Route path="/AcceptTables" element={<PendingPosts />} />
              {/* <Route path="AcceptTables" element={<Ingredients />} /> */}
              {/* <Route path="AcceptPayment" element={<AcceptPayment />} /> */}
              {/* <Route path="AcceptIng" element={<AcceptIng />} /> */}
              <Route path="Chat" element={<LiveChat />} />
             <Route path='Approve' element={<ApproveTable/>}/>
            </Routes>
          </div>
        </Router>
      );
    };
  return (
  <>
{hideRouter1 ? null : (
        <>
          <AppRouter1 />
        </>
      )}


{hideRouter2 ? null : (
        <>
          <div className="flex">
            <AppRouter2 />
          </div>
        </>
      )}
 </>


// <>
// <Router>
// <Nav
// username = {username} forceUpdate={forceUpdate}
//  />
// <Routes>
//   <Route path='/editRequest/:requestId' element={<EditRequest/>}/>
//   <Route path='/' element={<Home/>}/>
//   <Route path='/productcollection/:itemId' element={<ProductCollection userIdapp={userId}/>}/>
//   <Route path='/product/:id/:itemId' element={<Product/>}/>
//   <Route path='/Login' element={<Login />}/>
//   <Route path='/Signup' element={<Signup />}/>
//   <Route path='/Pricing' element={<Pricing/>}/>
//   <Route path='/ContactUs' element={<ContactUs/>}/>
//   <Route path='/About' element={<About/>}/>
//   <Route path='/stisched' element={<Stitched/>}/>
//   <Route path='/Profileprovider' element={<ProfileProviderr userIdapp={userId}/>}/>
//   <Route path='/productdetails' element={<Prodectdetails/>}/>
//   <Route path='/checkout/:id/:itemId' element={<Checkout userIdapp={userId}/>}/>
//   <Route path='/ben' element={<Benficiry/>}/>
//   <Route path='/Editprofile' element={<EditProfile userIdapp={userId}/>}/>
//   <Route path='/Editproduct/:productId' element={<Editproduct/>}/>
//   <Route path='/ProfileUser' element={<ProfileUser userIdapp={userId}/>}/>

// </Routes>
// <Footer/>
// </Router>
// </>

  );
}

export default App;
