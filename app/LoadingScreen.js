import React, {useState} from "react"
import { Image } from "cloudinary-react"

export default function LoadingScreen(){
    return(
      <div className = "flex flex-col px-8 py-6 bg-zinc-50 p-6 rounded-lg shadow-lg w-2/5 ">
        <h1 className = "font-medium font-poppins text-stone-900 text-2xl my-4" >Uploading...</h1>
        <div className="relative top-0 left-0 h-4 w-full bg-gray-300 rounded my-4">
        <div className="h-full bg-blue-500 rounded animate-loading"></div>
        </div>
      </div>
      
    );
}