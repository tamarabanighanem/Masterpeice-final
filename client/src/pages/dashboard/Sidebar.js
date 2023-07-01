// import "./sidebar.css"
import Icon from '@mdi/react';
import { mdiHandshakeOutline  } from '@mdi/js';
import { mdiAccountMultipleOutline } from '@mdi/js';
import { mdiInformationOutline,mdiShieldCrownOutline  } from '@mdi/js';
// import { UserContext } from '../../UserContext';
import React,{useState,useEffect,useContext} from "react";
import { mdiTableFurniture } from '@mdi/js';
import { mdiCashClock } from '@mdi/js';
// import logo from '../../Images/logooo.png'
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
  } from "@material-tailwind/react";
  import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
  } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'

  export default function Sidebar() {
    // const { SignStatus,updateSignStatus } = useContext(UserContext)

function handleLogOut(){

    


  Swal.fire({
    title: ` logout?  `,
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    icon: 'warning'
}
).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {

        Swal.fire(`  done `, '', 'success');
     
        // updateSignStatus("signUp")
        localStorage.setItem("SignStatus","signUp")
        localStorage.removeItem("token");
        localStorage.removeItem("roles");
        window.location.href = 'http://localhost:3000/';
      

    } else
        Swal.fire(' Cancelled', '', 'error')

})

}


    return (
      <Card className=" min-h-[calc(100vh)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-white-900/5 Sidebar bg-white sideBarDash">
        <div className="mb-2 p-4">
        <Typography className="text-[#E8AA42]" variant="h5" color="blue-gray">
        <Link to="/">
            {/* <img className="animate-pulse" src={logo} alt="logo" width={150} height={50} /> */}
            {/* <p className="text-black">Give Life</p> */}
          </Link>
          </Typography>
        </div>
        <List>
          <Link to='/'>
          <ListItem className="hover:bg-[#E8AA42]">
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            <a style={{color:'black'}}> Statistics </a>
          </ListItem>
          </Link>


          {/* <Link to='/ListAdmin'>
           <ListItem className="hover:bg-[#E8AA42]">
            <ListItemPrefix>
            <Icon path={mdiShieldCrownOutline } size={1} />
            </ListItemPrefix>
            <a style={{color:'black'}}> Admins list </a>
          </ListItem>
          </Link> */}

           <Link to='/ListUser'>
           <ListItem className="hover:bg-[#E8AA42]">
            <ListItemPrefix>
            <Icon path={mdiAccountMultipleOutline} size={1} />
            </ListItemPrefix>
            <a style={{color:'black'}}> Users list </a>
          </ListItem>
          </Link>

          <Link to='/ListRestaurant'>
          <ListItem className="hover:bg-[#E8AA42]">
            <ListItemPrefix>
            <Icon path={mdiHandshakeOutline } size={1} />
            </ListItemPrefix>
            <a style={{color:'black'}}> beneficiary List </a>
          </ListItem>
          </Link>

          <Link to='/EditAboutContact'>
          <ListItem className="hover:bg-[#E8AA42]">
            <ListItemPrefix>
            <Icon path={mdiInformationOutline} size={1} />
            </ListItemPrefix>
            <a style={{color:'black'}}> Edit About </a>
          </ListItem>
          </Link>

          <Link to='/AcceptTables'>
          <ListItem className="hover:bg-[#E8AA42]">
            <ListItemPrefix>
            <Icon path={mdiTableFurniture} size={1} />
            </ListItemPrefix>
            <a style={{color:'black'}}> Pending Posts </a>
          </ListItem>
          </Link>

          <Link to='/PaymentsInfo'>
          <ListItem className="hover:bg-[#E8AA42]">
            <ListItemPrefix>
            <Icon path={mdiCashClock} size={1} />
            </ListItemPrefix>
            <a style={{color:'black'}}> payments </a>
          </ListItem>
          </Link>

         <Link to='/Chat'>
         <ListItem className="hover:bg-[#E8AA42]">
            <ListItemPrefix>
              <InboxIcon className="h-5 w-5" />
            </ListItemPrefix>
            <a style={{color:'black'}}> Inbox </a>
            {/* <ListItemSuffix>
              <Chip value="14" size="sm" variant="white" color="blue-gray" className="rounded-full" />
            </ListItemSuffix> */}
          </ListItem>
          </Link>

{/* 
         <Link to="UserProfile">
          <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            <a style={{color:'white'}}> Profile </a>
          </ListItem>
          </Link> */}

          {/* <Link to="/">
          <ListItem>
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            Settings
          </ListItem>
            </Link> */}
           <button onClick={handleLogOut}>
           <ListItem className="hover:bg-amber-500">
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            <a style={{color:'black'}}> Log Out </a>
          </ListItem>
          </button>
        </List>
      </Card>
    );
  }