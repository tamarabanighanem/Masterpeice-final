// import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Button } from "@material-tailwind/react";
import Modal from '@mui/material/Modal';
import { Input } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'solid #f2f2f2',
  boxShadow: 3,
  p: 4,
};

function Editproduct({ productId, open, close, setrefreshReq, refreshReq }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [isOffer, setIsOffer] = useState(false); // Changed from isDiscounted
  const [discountedPrice, setDiscountedPrice] = useState("");

  const handleOnClick = () => {
    handleSubmit();
    close();
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:5000/editproduct/${productId}`, {
        name: name,
        description: description,
        price: price,
        discountedprice: discountedPrice, // Changed from discountedprice
        photo: image,
      });
      setrefreshReq(!refreshReq);
      console.log("Product updated successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    getBase64(file)
      .then((base64) => setImage(base64))
      .catch((error) => console.log(error));
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/productDetails/${productId}`);
      const product = response.data;
      setName(product.name || "");
      setDescription(product.description || "");
      setPrice(product.price || "");
      setIsOffer(product.offers); // Changed from isDiscounted
      setDiscountedPrice(product.discountedPrice || "");
      setImage(product.photo || "")
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/offersOfMakhiata/${id}`
      );

      // Check if 'offers' is true in the response data
      const updatedProduct = response.data;
      if (updatedProduct.offers) {
        setIsOffer(true); // Changed from setShowDiscount
      } else {
        setIsOffer(false); // Changed from setShowDiscount
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  return (
    <div>
      <Modal
        open={open}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className='flex flex-col '>
            <Input
              onChange={(e) => setName(e.target.value)}
              id="name"
              value={name}
              type='text'
              placeholder="Product Name"
              variant="h6"
              component="h2"
              className='m-5'
            />
            <br></br>
            <Input
              onChange={(e) => setDescription(e.target.value)}
              id="description"
              value={description}
              type='text'
              placeholder="Product Description"
              variant="h6"
              component="h2"
              className='m-5'
            />
            <br></br>
            <Input
              onChange={(e) => setPrice(e.target.value)}
              id="price"
              value={price}
              type='text'
              placeholder="Product Price"
              variant="h6"
              component="h2"
              className='m-5'
            />
            <br></br>
            <Input
              className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              type="file"
              placeholder="Product Image"
              name="image"
              onChange={(e) => handleImageChange(e)}
              accept="image/*"
            />
            <Button
              onClick={(event) => {
                handleReject(productId);
              }} className="m-5 border-solid bg-fuchsia-800 text-white shadow hover:bg-fuchsia-200 hover:text-fuchsia-800"
              variant="text"
            >
              ضمن العروض
            </Button>
            {isOffer && ( // Only display the discounted price field if isOffer is true
              <Input
                onChange={(e) => setDiscountedPrice(e.target.value)}
                id="discountedPrice"
                value={discountedPrice}
                type='text'
                placeholder="السعر بعد الخصم"
                variant="h6"
                component="h2"
                className='m-5'
              />
            )}
            <Button
              onClick={handleOnClick}
              className="m-5 border-solid bg-fuchsia-800 text-white shadow hover:bg-fuchsia-200 hover:text-fuchsia-800"
              variant="text"
            >
              حفظ
            </Button>
            <Button
              className="m-5 border-solid bg-fuchsia-200 text-fuchsia-800 shadow hover:bg-fuchsia-800 hover:text-fuchsia-200"
              variant="text"
              onClick={close}
            >
              الغاء
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default Editproduct;
