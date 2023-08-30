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
  


function EditProfile({userIdapp,refreshh,setRefreshh}) {

  


  const navigate=useNavigate()
const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
    /////////////////////
    const [userId ,setUserId] = useState(userIdapp)
    // const [userData ,setUserData] = useState({})
    const [username, setuserName] = useState("");
    const [email, setemail] = useState("");
    const [domain, setdomain] = useState("");
  const[about,setabout]=useState("")

    





const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await axios.put(`http://localhost:5000/editprofileuser/${userIdapp}`, {
      username: username,
      email: email,
      domain: domain,
      about:about
    }
    
    );       
    //  window.location.reload();


    // Update the state with new values
    setUser((prevUser) => ({
      ...prevUser,
      username: username,
      email: email,
      domain: domain,
      about:about
    })
    );

    handleClose();
    setRefreshh(!refreshh)
    // Close the modal
  } catch (error) {
    console.log(error);
  }
};






  const [user, setUser] = useState({});
  console.log(userIdapp)


  



  useEffect(() => {
  
      axios
        .get(`http://localhost:5000/profileProvider/${userIdapp}`)
        .then((response) => {
          setUser(response.data[0]);
        })
        .catch((error) => console.log(error.message));
  }, [userId]);
  




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
        <Input onChange={(e)=>setuserName(e.target.value)} id="name" value={username} 
 type='text' placeholder={user.username ||""} variant="h6" component="h2" className='m-5'>
          Text in a modal
        </Input> <br></br>
      
        <Input placeholder=  {user.address ||""} id="email" type='text'onChange={(e)=>setemail(e.target.value)}  value={email} variant="h6" component="h2" className='m-5'>
          Text in a modal
        </Input> <br></br>
  
    
        <Input onChange={(e)=>setdomain(e.target.value)} id="name" value={domain}
 type='text' placeholder={user.domain ||""} variant="h6" component="h2" className='m-5'>
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