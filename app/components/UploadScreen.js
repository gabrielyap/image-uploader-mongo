//"use client"

import React, {useState} from "react"
import Axios from 'axios'
import { Image } from "cloudinary-react"
export default function UploadScreen({imageUrl, setImageUrl, setBefore, setLoading, setAfter}) {
  const [inputValue, setInputValue] = useState('');
  
  const uploadImage = async(files) => {
    setBefore(false)
    setLoading(true)
    const formData = new FormData()
    formData.append("file", files[0])
    formData.append("upload_preset", "yismpedw")
    let url = ''
    await Axios.post("https://api.cloudinary.com/v1_1/dnyt3b1h3/image/upload", formData) // POST to axios to get image url first
    .then((re) => {
      setLoading(false)
      setAfter(true)
      setImageUrl(re.data.url)
      url = re.data.url
    })
    .catch((err) => {
      window.alert("Error: " + err)
    })

    await Axios.post("http://localhost:8000/api",  //POST to server to store url and label
    {
      imageLink: url,
      label: inputValue,
    })
    .then((re) => {
      //console.log(`Got response ${re}`) //[object Object]
    })
    .catch((err) => {
      window.alert("Error: " + err)
    })
  }

  const handleButtonClick = () => {
    document.getElementById('selectedFile').click()
  }

  const dropHandler = (e) => {
    console.log("File(s) dropped");
    // Prevent default behavior (Prevent file from being opened)
    e.preventDefault();
    console.log("e.dataTransfer.files:" + e.dataTransfer.files)
    uploadImage(e.dataTransfer.files)
  }

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  function dragOverHandler(e) {
    console.log("File(s) in drop zone");
    // Prevent default behavior (Prevent file from being opened)
    e.preventDefault();
  }

    return(
      <div className = "flex flex-col items-center bg-zinc-50 p-6 rounded-lg shadow-lg ">
      <h1 className = "font-semibold font-poppins text-stone-900 text-2xl mt-4">Upload your image </h1>
      <h3 className = "font-poppins text-stone-500 text-1xl my-4">File should be Jpeg, Png...</h3>
      <input type = "text" id = "labelName" className = "outline-blue-200 outline px-1" placeholder = "Label Name (optional)" onChange = {(e) => handleChange(e)}/>
      <div className = "flex flex-col bg-gray-100 outline-dashed outline-2 outline-offset-2 outline-blue-400 rounded-lg mx-6 my-4 px-24 py-16 items-center gap-y-8"
        id="drop_zone"
        onDrop= {(event) => {dropHandler(event)}}
        onDragOver={(event) => {dragOverHandler(event)}}>
        <img src = "image.svg" className = "h-full " alt = ' '/>
        <p className = "font-semibold font-poppins text-gray-400">Drag & Drop your image here</p>
      </div>

        <div id = "uploadButton" className = "flex flex-col items-center py-4 ">
          <input type = "file" id = "selectedFile" className = "hidden"
            onChange = {(event) => uploadImage(event.target.files)}
          />
          <h3 className = "font-poppins text-stone-500 text-1xl my-4"> Or </h3>
          <input type = "button" value = "Choose a file" 
            className = "bg-blue-500 rounded-full my-4 p-4 text-white cursor-pointer" onClick = {() => handleButtonClick()}></input>
        </div> 
        
    </div>
    );
}