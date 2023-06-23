import * as React from 'react';
import Box from '@mui/material/Box';
import { Button } from "@material-tailwind/react";
import Modal from '@mui/material/Modal';
import { Input } from '@mui/material';
import axios from 'axios';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: ' solid #f2f2f2',
    boxShadow: 3,
    p: 4,
  }; 


function EditProfile() {
  const navigate=useNavigate()
const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
    /////////////////////
    const [userId ,setUserId] = useState()
    const [userData ,setUserData] = useState({})
    const [name, setName] = useState("");
  const [email, setEmail] = useState("");
    
    const fetchProtectedData = async () => {
      try {
        const token = localStorage.getItem("auth");
        if (token) {
          const response = await axios.get("http://localhost:5000/protected", {
            headers: {
              Authorization: token,
            },
          });
          setUserId(response.data.user.id)
          console.log(response.data.user.email)
          let id=response.data.user.id
          try {
            const response = await axios.get(`http://localhost:5000/api/users/${id}`);
            console.log(response.data)
            console.log("tttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt")
            setUserData(response.data[0])
            setName(response.data[0].firstName)
            setEmail(response.data[0].email)

          } catch (error) {
            console.error("Error retrieving data:", error);
          }
        }
      } catch (error) {
        console.error(error);
        localStorage.removeItem("auth");
        window.location.href = "http://localhost:3000/Login";
      } finally {
        console.log(false);
      }
    };
  
  
  useEffect(()=>{
    if(localStorage.auth != null){   
      fetchProtectedData()
    }
  },[])
    
  const handleSubmit = async (e) => {
    e.preventDefault();
console.log(name,email,userId )
    axios
      .put(`http://localhost:5000/api/users/${userId}`, {
        firstName: name,
        email: email,
      })
      .then(function (response) {
        console.log(response);
        // navigate("/ProfilePage")
        window.location.href = 'http://localhost:3000/ProfilePage';

      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const [img, setImg] = useState("");

const onChange = (e) => {
  const files = e.target.files;
  const file = files[0];
  getBase64(file);
  console.log(img);
};
const onLoad = (fileString) => {
  setImg(fileString);
};
const getBase64 = (file) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    onLoad(reader.result);
  };
};
  return (
    <div>
    <Button  className="mb-10  bg-fuchsia-800  text-white shadow hover:bg-fuchsia-200 hover:text-fuchsia-800   "
         variant="text" onClick={handleOpen}>تعديل </Button>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className='flex flex-col'>
        <Input onChange={(e)=>setName(e.target.value)} id="name" value={name}
 type='text' placeholder='اسم المخيطة' variant="h6" component="h2" className='m-5'>
          Text in a modal
        </Input> <br></br>
        <Input placeholder='رقم الهاتف' id="email" type='text'onChange={(e)=>setEmail(e.target.value)}  value={email} variant="h6" component="h2" className='m-5'>
          Text in a modal
        </Input> <br></br>
        <Input onChange={(e)=>setName(e.target.value)} id="name" value={name}
 type='text' placeholder='الوصف/الموقع' variant="h6" component="h2" className='m-5'>
          Text in a modal
        </Input> <br></br>
      
        
        <Input onChange={(e)=>setName(e.target.value)} id="name" value={name}
 type='file' placeholder='اسم المخيطة' variant="h6" component="h2" className='m-5'>
          Text in a modal
        </Input> <br></br>
      

        <Button
        onClick={handleSubmit}
                className=" m-5 border-solid  bg-fuchsia-800  text-white shadow hover:bg-fuchsia-200 hover:text-fuchsia-800 "
                variant="text"
              >
                حفظ
              </Button> 
              <Button
                className="m-5 border-solid  bg-fuchsia-200  text-fuchsia-800 shadow hover:bg-fuchsia-800 hover:text-fuchsia-200 "
                variant="text" onClick={handleClose}
              >
                الغاء
              </Button>
              </div>
      </Box>
    </Modal>
  </div>
  )
};

export default EditProfile