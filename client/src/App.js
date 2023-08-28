import { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './pages/forAll/Home';
import Login from './pages/forAll/Login';
import Signup from './pages/forAll/Signup';
import ContactUs from './pages/forAll/ContactUs'
import Product from './pages/user/Product';
import Stitched from './pages/user/Stitched'
import ProductCollection from './pages/user/ProductCollection';
import Checkout from './pages/forAll/Checkout';
import ProfileUser from './pages/user/ProfileUser';

import RequestProduct from './pages/provider/RequestProduct';

import { gapi } from 'gapi-script'

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
import ForgotPassword from './pages/forAll/ForgotPassword ';
import ResetPassword from './pages/forAll/ResetPassword';

// -----------------------Dashboard routes----------------//

import Sidebar from "./pages/dashboard/Sidebar";
import MainDashboard from "./pages/dashboard/MainDashboard";
import UserInfo from "./component/dashboard/UserInfo";
import PendingPosts from './component/dashboard/PendingPosts';
import PaymentsInfo from './component/dashboard/Payment'
import EditAboutUs from "./pages/dashboard/EditAboutUs";
import ApproveTable from './component/dashboard/ApproveTable';
import LiveChat from "./pages/dashboard/Chat"
import NotFound from './pages/forAll/NotFound';
const clientId = "1080533007960-knfl2ivujffsunprs5ncte491sac5hlb.apps.googleusercontent.com"

function App() {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ""
      })
    }
    // gapi.load('client:auth2',start)
  })
  initTE({ Collapse, Ripple });

  const [hideRouter1, setHideRouterUser] = useState(false);
  const [hideRouter2, setHideRouterAdmin] = useState(true);
  const [userId, setUserId] = useState("")
  const [username, setUsername] = useState("")
  const [role, setRole] = useState("")
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
        if (response.data.role === "مخيطة") {
          handelRout = [false, true]
        }
        else if (response.data.role === "مستخدم") {
          handelRout = [false, true]
        }
        else if (response.data.role === "admin") {
          handelRout = [true, false];

        }
        setRole(response.data.role)

        setHideRouterUser(handelRout[0]);
        setHideRouterAdmin(handelRout[1]);

      }


    } catch (error) {
      console.error(error);
    } finally {
      console.log(false);

    }
  };

const[refresh,setRefresh]=useState(false)
  useEffect(() => {
    fetchProtectedData()
  }
    , [reducer])

  console.log(userId)
  console.log(username)

  console.log("ffffffffffff", forceUpdate)

  // ----------------------user routes----------------- //

  const AppRouter1 = () => {
    const token = localStorage.getItem("token");
    return (
      <Router>
        <Nav
          username={username} forceUpdate={forceUpdate} set={setRefresh}
        />
        {!refresh? (
                <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/productcollection/:itemId' element={<ProductCollection userIdapp={userId} />} />
                <Route path='/product/:id/:itemId' element={<Product userIdapp={userId} />} />
                <Route path='/ContactUs' element={<ContactUs />} />
                <Route path='/About' element={<About />} />
                <Route path='/stisched' element={<Stitched />} />
                <Route path='/Profileprovider' element={<ProfileProviderr userIdapp={userId} />} />
                <Route path='/checkout/:id/:itemId' element={<Checkout userIdapp={userId} />} />
                <Route path='/ProfileUser' element={<ProfileUser userIdapp={userId} />} />
                <Route path='/requestProduct' element={<RequestProduct />} />
                <Route path='forgetpassword' element={<ForgotPassword />} />
                <Route path='*' element={<NotFound />} />
                <Route path="/reset_password/:id/:token" element={<ResetPassword />}></Route>
              </Routes>
        ):(
          <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Signup' element={<Signup set={setRefresh} />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/ContactUs' element={<ContactUs />} />
          <Route path='/About' element={<About />} />
          <Route path='forgetpassword' element={<ForgotPassword />} />
          <Route path='*' element={<NotFound />} />
          <Route path="/reset_password/:id/:token" element={<ResetPassword />}></Route>

        </Routes>
        )}
        <Footer />
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
            <Route index element={<MainDashboard />} />
            <Route path="ListUser" element={<UserInfo />} />
            <Route path='/PaymentsInfo' element={<PaymentsInfo />} />
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
            <Route path='Approve' element={<ApproveTable />} />
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




  );
}

export default App;
