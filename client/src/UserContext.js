import React from "react";
import { useEffect, createContext, useState } from "react";
import axios from 'axios'

export const UserContext = createContext();
export default function UserProvider ( {children} ) {
  
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
  // UserProvider;




