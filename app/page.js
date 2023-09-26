"use client"

import React, {useState, useEffect} from "react"
import { Image } from "cloudinary-react"
import UploadScreen from "./components/UploadScreen"
import LoadingScreen from "./components/LoadingScreen"
import FinalScreen from "./components/FinalScreen"

export default function Home() {
  const [imageUrl, setImageUrl] = useState('')
  const [before, setBefore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [after, setAfter] = useState(false);
  const [hasUploaded, setHasUploaded] = useState(false)
  
  return (
    <main className="flex min-h-screen flex-col 
    items-center  p-24
    bg-gray-200">
      {before && <UploadScreen imageUrl = {imageUrl} setImageUrl = {setImageUrl} setBefore={setBefore} setLoading={setLoading} setAfter ={setAfter} setHasUploaded = {setHasUploaded}/>}
      
      {loading && <LoadingScreen />}

      {after && <FinalScreen imageUrl = {imageUrl} setBefore = {setBefore} setAfter = {setAfter} hasUploaded = {hasUploaded} setHasUploaded = {setHasUploaded}/>}

      <footer className = "font-semibold font-poppins text-gray-500 text-1xl mt-4">Created by <a href = "https://github.com/gabrielyap">Gabriel Yap</a></footer>
    </main>
      

  )
}
