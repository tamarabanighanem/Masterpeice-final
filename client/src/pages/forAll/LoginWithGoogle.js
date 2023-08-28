import React from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';

const LoginWithGoogle = () => {
  const clientId = '868843873472-44sieqa82g9hh89ukghga5fmeur8fo03.apps.googleusercontent.com'; // Replace with your actual Google Client ID

  const handleGoogleLoginSuccess = (response) => {
    const idToken = response.tokenId; // Get the Google ID token
    console.log(response.tokenId);

    // Send the Google ID token to your server
    axios
      .post("http://localhost:5000/GoogleLogin", { idToken })
      .then((serverResponse) => {
        const { token } = serverResponse.data;
        localStorage.setItem("token", token);

        // Redirect or navigate to the desired page based on the user's role
        // You can implement this logic here
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleGoogleLoginFailure = (response) => {
    // Handle Google login failure
    console.error('Google login error', response);
  };

  return (
    // <div id='signInButton'>
    //   <GoogleLogin
    //     clientId={clientId}
    //     buttonText="Login with Google"
    //     onSuccess={handleGoogleLoginSuccess}
    //     onFailure={handleGoogleLoginFailure}
    //     cookiePolicy={'single_host_origin'}
    //     isSignedIn={true}
    //   />
    // </div>
    <>  </>
  );
};

export default LoginWithGoogle;

