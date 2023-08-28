import React from 'react'
import GoogleLogin, { GoogleLogout } from 'react-google-login';

const Logoutwithgoogle = () => {
  const clientId="868843873472-44sieqa82g9hh89ukghga5fmeur8fo03.apps.googleusercontent.com"
const onSuccess=()=>{
  console.log("Log out successfull")
}
  return (
<div id='signOutButton'>
       <GoogleLogout
        clientId={clientId}
        buttonText="Logout with Google"
        onSuccessLogOut={onSuccess}
      />
    </div>
  )
}

export default Logoutwithgoogle
