"use client"

import React, {useState, useEffect} from "react"
import { Image } from "cloudinary-react"
import UploadScreen from "./components/UploadScreen"
import LoadingScreen from "./components/LoadingScreen"
import FinalScreen from "./components/FinalScreen"
import RegisterScreen from "./components/RegisterScreen"

export default function Home() {
  const [imageUrl, setImageUrl] = useState('')
  const [before, setBefore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [after, setAfter] = useState(true);
  const [hasUploaded, setHasUploaded] = useState(false)
  const [register, setRegister] = useState(false)
  
  return (
    <main className="flex min-h-screen flex-col 
    items-center py-4
    bg-gray-200">

      {before && <UploadScreen imageUrl = {imageUrl} setImageUrl = {setImageUrl} setBefore={setBefore} setLoading={setLoading} setAfter ={setAfter} setHasUploaded = {setHasUploaded}/>}
      
      {loading && <LoadingScreen />}

      {after && <FinalScreen imageUrl = {imageUrl} setBefore = {setBefore} setAfter = {setAfter} hasUploaded = {hasUploaded} setHasUploaded = {setHasUploaded} 
       register = {register} setRegister = {setRegister}/>}

      {register && <RegisterScreen setRegister = {setRegister} setAfter = {setAfter}/>}

      <footer className = "font-semibold font-poppins text-gray-500 text-1xl mt-4">Created by <a href = "https://github.com/gabrielyap">Gabriel Yap</a></footer>
    </main>
      

  )
}
