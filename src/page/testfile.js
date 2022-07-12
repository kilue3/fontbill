import React, { useState } from "react";

import {
  Container,
  Card,
  CardBody,
  Row,
  Col,
  Button,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { Helmet } from "react-helmet";
import axios from "axios";
import API from './API/API'
import ImageUploading from "react-images-uploading";

const title = "เข้าสู่ระบบ";

const Testfile = () => {
  const [images, setImages] =  useState([]);
  const maxNumber = 69;
  const [bFile, setFile] = useState([]);

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
    const formData = new FormData(); 
     
    // Update the formData object 
   formData.append(
    "image", 
    imageList[0].file, 
    imageList[0].file.name
   )
   axios.post(API("Movefile"),formData).then((response) => {
    setFile(response.data);
  });
   
    console.log(formData);
  };
  return (
    <>
     
      <div className="App">
        <ImageUploading
          value={images}
          onChange={onChange}
          maxNumber={maxNumber}
          dataURLKey="data_url"
        >
           {({ imageList, onImageUpload }) => (
          // write your building UI
          <div className="imageuploader">
            <div className="mainBtns">
            <button className="btn btn-primary mr-1" onClick={onImageUpload}>Upload Image</button>
            
            </div>
            {imageList.map((image) => (
              <div className="imagecontainer" key={image.key}>
                <img src={image.data_url} />
                
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
       
            
      </div>

   
    </>
  );
};

export default Testfile;
