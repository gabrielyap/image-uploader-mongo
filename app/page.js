"use client"

import React, {useState, useEffect} from "react"
import Axios from 'axios'
import { Image } from "cloudinary-react"
import UploadScreen from "./components/UploadScreen"
import LoadingScreen from "./components/LoadingScreen"
import FinalScreen from "./components/FinalScreen"

export default function Home() {
  const [imageUrl, setImageUrl] = useState('')
  const [before, setBefore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [after, setAfter] = useState(false);
  useEffect(() => {
    Axios.get("http://localhost:8000/api/home")
    .then((re) => {
      console.log('successfully got: +', re)
      }
    )
    .catch((e) => {
      console.log('error: ' + e)
    })
  }, [])
  return (
    <main className="flex min-h-screen flex-col 
    items-center justify-center p-24
    bg-gray-200">

      {before && <UploadScreen imageUrl = {imageUrl} setImageUrl = {setImageUrl} setBefore={setBefore} setLoading={setLoading} setAfter ={setAfter}/>}
      
      {loading && <LoadingScreen />}

      {after && <FinalScreen imageUrl = {imageUrl}/>}

      <footer className = "font-semibold font-poppins text-gray-500 text-1xl mt-4">Created by <a href = "https://github.com/gabrielyap">Gabriel Yap</a></footer>
    </main>
      

  )
}
