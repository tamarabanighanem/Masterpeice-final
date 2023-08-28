import Icon from '@mdi/react';
import { mdiAccountMultipleOutline } from '@mdi/js';
import { mdiInformationOutline } from '@mdi/js';
import React from "react";
import { mdiTableFurniture } from '@mdi/js';
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix  
  } from "@material-tailwind/react";
  import {
    PowerIcon,
  } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
  export default function Sidebar() {
function handleLogOut(){

    


  Swal.fire({
    title: ` هل تود الخروج `,
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonText: "نعم",
    cancelButtonText: "الغاء",
    icon: 'warning'
}
).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {

        Swal.fire(`  تم الخرزج `, '', 'success');
     
        // updateSignStatus("signUp")
        localStorage.setItem("SignStatus","signUp")
        localStorage.removeItem("token");
        localStorage.removeItem("roles");
        window.location.href = 'http://localhost:3000/';
      

    } else
        Swal.fire(' الغاء', '', 'error')

})

}


    return (
      <Card className=" min-h-[calc(100vh)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-white-900/5  bg-fuchsia-100 ">
        <div className="mb-2 p-4">
        <Typography className="text-[#E8AA42]" variant="h5" color="blue-gray">
        <Link to="/">
          </Link>
          </Typography>
        </div>
        <List>
           <Link to='/ListUser'>
           <ListItem className="hover:bg-fuchsia-400 hover:text-white border-b-2">
            <ListItemPrefix>
            <Icon path={mdiAccountMultipleOutline} size={1} />
            </ListItemPrefix>
            <a style={{color:'black'}}> قائمة المسجلين </a>
          </ListItem>
          </Link>

          <Link to='Approve'>
          <ListItem className="hover:bg-fuchsia-400 hover:text-white border-b-2">
            <ListItemPrefix>
            <Icon path={mdiInformationOutline} size={1} />
            </ListItemPrefix>
            <a style={{color:'black'}}> تعليقات المستخدمين </a>
          </ListItem>
          </Link>
        

          <Link to='/AcceptTables'>
          <ListItem className="hover:bg-fuchsia-400 hover:text-white border-b-2">
            <ListItemPrefix>
            <Icon path={mdiTableFurniture} size={1} />
            </ListItemPrefix>
            <a style={{color:'black'}}> الطلبات المعلقة </a>
          </ListItem>
          </Link>

           <button onClick={handleLogOut}>
           <ListItem className="hover:bg-fuchsia-400 hover:text-white border-b-2">
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            <a style={{color:'black'}}> تسجيل خروج</a>
          </ListItem>
          </button>
        </List>
      </Card>
    );
  }