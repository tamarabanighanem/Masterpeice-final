import React from "react";
import { Children, createContext, useState } from "react";

export const UserContext = createContext();
const UserProvider = ( {children} ) => {
  
  const [test, setTest] = useState([]);


  const updateTest = (newValue) => {
    setTest(newValue);
  };



  

  return (
        <>
            <UserContext.Provider
                value={{
                 test,updateTest
                }}
            >
                {children}
            </UserContext.Provider>
        </>
    )
};
 export default UserProvider;




