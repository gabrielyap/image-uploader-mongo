import React, {useState} from "react"
import { Image } from "cloudinary-react"

export default function FinalScreen({imageUrl}){
    const copyInput = () => {
        const copyText = document.getElementById("myInput");
        copyText.select()
        navigator.clipboard.writeText(copyText.value)
    }
    return(
        <div className = "flex flex-col items-center bg-zinc-50 p-6 rounded-lg shadow-lg max-w-2xl">
            <img src = "green_check2.png" className = "w-16" />
            <h1 className = "font-semibold font-poppins text-stone-900 text-2xl my-4">Uploaded Successfully!</h1>
            <Image cloudName = "dnyt3b1h3" publicId = {imageUrl} className = "rounded-xl my-4"/>
            <div className = "flex justify-between bg-gray-200 rounded-xl px-2 py-1 border-2 border-gray-300 space-x-12">
                <input className = "bg-inherit w-96 text-ellipsis border focus:border-transparent focus:outline-none" type = "text" value = {imageUrl} id = "myInput" readOnly/>
                <button className = "bg-blue-500 rounded-2xl p-4 text-white cursor-pointer" onClick = {() => copyInput()}>Copy Link</button>
            </div>
        </div>
        
    );
}