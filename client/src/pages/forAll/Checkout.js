import React, { useState,useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";


function PaymentPage({userIdapp}) {
  const { id,itemId } = useParams(); // Access the ID from the URL parameters

  const [cardnumber, setCardNumber] = useState("");
  const [expirationdate, setDateCard] = useState("");
  const [cvv, setCvc] = useState("");
  const [cardholder, setcardholder] = useState("");
/////itemId=providerid=المخيطة id
/////userIdapp رقم المستخدمid
  console.log(id)
  console.log(itemId)
  // const { currentPrice,ProviderId,PostId,userId } = useParams();

  // console.log(currentPrice,ProviderId,PostId,userId)

  // const [usersId, setUsersId] = useState([]);
  // const [currentDonation, setCurrentDonation] = useState([]);
  // const [AllBeneficiarId,setAllBeneficiarId]= useState([])

  console.log(userIdapp)


  const navigate = useNavigate();

  // const handleShowUser = async () => {
  //   try {
  //     const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
  //     console.log(response.data) 
  //     // setAllBeneficiarId(response.data[0].providersId)
  //   } catch (error) {
  //     console.error("Error retrieving data:", error);
  //   }
    
  // };

//   const handleShowBeneficiarys = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/beneficiarys/${PostId}`);
//       console.log(response.data) 
//       setUsersId(response.data[0].usersId)
//       setCurrentDonation(response.data[0].currentDonation)
//     } catch (error) {
//       console.error("Error retrieving data:", error);
//     }
    
//   };
//   useEffect(()=>{
//     if(userId != 0 ){
//       handleShowUser()
//     }
//     handleShowBeneficiarys()
//   },[])


// console.log(usersId)


// const UpdateBeneficiaryId = async (price,currentDonation,usersId,PostId ) => {
   
//   let newUsersId = usersId
//   newUsersId.push(userId)
//   try {
//     const updatedBeneficiary = {
//       // Update the properties of the user as needed
//       usersId: newUsersId,
//       currentDonation:Number(price)+currentDonation ,
//     };

//     await axios.put(`http://localhost:5000/api/beneficiarys/${PostId}`, updatedBeneficiary);
//     // allBeneficiarys();
//   } catch (error) {
//     console.error("Error updating user:", error);
//   }
// };

// const UpdateUserId = async (PostId ) => {
   
//   let newProvidersId = AllBeneficiarId
//   newProvidersId.push(PostId)
//   console.log(newProvidersId)
//   try {
//     const updatedUser = {
//       // Update the properties of the user as needed
//       providersId: newProvidersId,
//     };

//     await axios.put(`http://localhost:5000/api/users/${userId}`, updatedUser);
//     // allBeneficiarys();
//   } catch (error) {
//     console.error("Error updating user:", error);
//   }
// };

  const handlePayment = () => {


    const cardNumber = document.getElementById("card-no").value;
    const cardRegex = /^(4\d{15}|5\d{15})$/;

    if (!cardnumber || !cvv || !expirationdate || !cardholder) {
      showAlert("Please enter all card details");
      return;
    }
    if (!cardRegex.test(cardNumber)) {
      showAlert("Invalid card number");
      return;
    }

    const cvcRegex = /^\d{3}$/;

    if (!cvcRegex.test(cvv)) {
      showAlert("Invalid CVC");
      return;
    }
    submitPayment();
  };

  const submitPayment = async () => {
    console.log("clicked");
    const data={
      card_number:cardnumber,
      cvv:cvv,
      expiration_date:expirationdate,
      cardholder:cardholder,
      product_id:id,
      user_id:userIdapp,
      provider_id:itemId

    }
    console.log(data)
    try {
      const request = await axios.post("http://localhost:5000/payment",data);
      console.log(request.data);
    } catch (error) {
      console.error(error.message);
    }

    showSuccessAlert("تم الدفع بنجاح")
    try {
      const request = await axios.put(`http://localhost:5000/prouctAvailable/${id}`);
      console.log(request.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const showSuccessAlert = (message,currentPrice) => {
    Swal.fire({
      title: `Thank you for Donating ${currentPrice}$`,
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      navigate("/")
    });
  };

  const showAlert = (message) => {
    Swal.fire({
      title: "Error",
      text: message,
      icon: "error",
      confirmButtonText: "OK",
    });
  };
  console.log(id)
  console.log(id)
  console.log(id)
  console.log(id)
  return (
    <>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="flex-1 text-center hidden lg:flex">
            <img
              src="https://images.unsplash.com/photo-1557817017-2ce200058acd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60"
              alt="Donation payment"
              className="rounded-tl-md rounded-bl-md"
            />
          </div>
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 sm:w-10/12">
            <div>
              <div className="mt-12 flex flex-col items-center">
                <h1
                  className="text-2xl xl:text-3xl text-fuchsia-800 font-extrabold"
                  // style={{ color: "#eab308" }}
                >
بيانات الدفع                </h1>
                <div className="w-full flex-1 mt-8">
                  <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
                    {/* <p className="text-xl font-medium">Payment Details</p> */}
                    <p className="text-gray-400">
                    املىء نموذج الدفع
                    </p>
                    <div className="justify-center">
                      <label
                        htmlFor="email"
                        className="mt-4 mb-2 block text-sm font-medium"
                      >
                        البريد الالكتروني
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="email"
                          name="email"
                          className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                          // placeholder="your.email@gmail.com"
                        />
                        <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                            />
                          </svg>
                        </div>
                      </div>
                      <label
                        htmlFor="card-holder"
                        className="mt-4 mb-2 block text-sm font-medium"
                      >
                      اسم حامل البطاقة
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="card-holder"
                          name="card-holder"
                          className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                          // placeholder="Your full name here"
                          value={cardholder}
                          onChange={(e) => setcardholder(e.target.value)}
                        />
                        <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                            />
                          </svg>
                        </div>
                      </div>
                      <label
                        htmlFor="card-no"
                        className="mt-4 mb-2 block text-sm font-medium"
                      >
                        معلومات البطاقة
                      </label>
                      <div className="flex">
                        <div className="relative w-7/12 flex-shrink-0">
                          <input
                            type="text"
                            id="card-no"
                            name="card-no"
                            className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                            placeholder="xxxx-xxxx-xxxx-xxxx"
                            value={cardnumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                          />
                          <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                            <svg
                              className="h-4 w-4 text-gray-400"
                              xmlns="http://www.w3.org/2000/svg"
                              width={16}
                              height={16}
                              fill="currentColor"
                              viewBox="0 0 16 16"
                            >
                              <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                              <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
                            </svg>
                          </div>
                        </div>
                        <input
                          type="text"
                          name="credit-expiry"
                          className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                          placeholder="MM/YY"
                          value={expirationdate}
                          onChange={(e) => setDateCard(e.target.value)}
                        />
                        <input
                          type="text"
                          name="credit-cvc"
                          className="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                          placeholder="CVC"
                          value={cvv}
                          onChange={(e) => setCvc(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-b py-2">
                    <div className="mt-6 flex justify-between">
                      <Link
                        to={`/product/${id}`}
                        className="text-sm text-fuchsia-800"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-1 inline-block text-sm"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      العودة 
                      </Link>
                      <button
                        className="inline-block bg-fuchsia-800 text-white  hover:bg-fuchsia-200 hover:text-fuchsia-800 focus:outline-none text-sm px-4 py-2 leading-none border rounded-lg mt-4 lg:mt-0"
                        // style={{ backgroundColor: "#eab308", color: "white" }}
                        onClick={handlePayment}
                        type="submit"
                      >
                        ادفع الان
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentPage;
