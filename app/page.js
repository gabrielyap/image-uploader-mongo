"use client"

import React, { useState, useEffect } from "react"
import { Image } from "cloudinary-react"
import UploadScreen from "./components/UploadScreen"
import LoadingScreen from "./components/LoadingScreen"
import FinalScreen from "./components/FinalScreen"
import RegisterScreen from "./components/RegisterScreen"
import LoginScreen from "./components/LoginScreen"

export default function Home() {
  const [imageUrl, setImageUrl] = useState('')
  const [before, setBefore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [after, setAfter] = useState(true);
  const [hasUploaded, setHasUploaded] = useState(false)
  const [register, setRegister] = useState(false)
  const [login, setLogin] = useState(false)
  const [loginCredentials, setLoginCredentials] =
    useState({
      username: '',
      password: ''
    })

  const redirectUpload = () => {
    setHasUploaded(false)
    setAfter(false)
    setBefore(true)
  }

  const redirectRegister = () => {
    setAfter(false)
    setRegister(true)
  }
  const redirectLogin = () => {
    setAfter(false)
    setLogin(true)
  }

  const handleLogout = () => {
    setLoginCredentials({
      username: '',
      password: ''
    })
  }

  const redirectButtons = (state) => {
    setBefore(false);
    setLoading(false);
    setAfter(false);
    setHasUploaded(false);
    setRegister(false);
    setLogin(false);

    switch (state) {
      case 'before':
        setBefore(true);
        break;
      case 'loading':
        setLoading(true);
        break;
      case 'after':
        setAfter(true);
        break;
      case 'hasUploaded':
        setHasUploaded(true);
        break;
      case 'register':
        setRegister(true);
        break;
      case 'login':
        setLogin(true);
        break;
      default:
        break;
    }
  }

  return (
    <main className="flex min-h-screen flex-col 
    items-center 
    bg-cover" >
      <div className="flex w-full justify-between gap-2 bg-zinc-700 py-3">
        <div className="flex gap-2" >
          <img className="w-16 h-16 ml-8 hover:cursor-pointer" src="camera-flat.png" alt="logo" onClick={() => { redirectButtons('after') }} />
          <div className="flex self-center text-2xl font-semibold text-stone-50 dark:text-white hover:cursor-pointer " onClick={() => { redirectButtons('after') }}> Mongo Museum</div>
          <button className="bg-green-600 rounded-xl p-4 text-white cursor-pointer " onClick={() => { redirectButtons('before') }}>New Post</button>
        </div>

        <div className="flex self-center gap-2 mr-8 ">
          {/* <h1 className="flex flex-row-reverse my-2 text-sky-400 mr-2">
            About
          </h1>
          <h1 className="flex flex-row-reverse my-2 text-sky-400 mr-2 ">
            Contact Us
          </h1> */}
          {
            loginCredentials.username != '' ? (
              <h1 className="flex flex-row-reverse my-2 text-stone-50 mr-2">Hi, {loginCredentials.username} </h1>
            ) : (
              <div></div>
            )

          }

          {
            loginCredentials.username != '' ? (
              <div className = "flex self-center gap-2 mr-8 ">
                <button className="bg-green-600 rounded-xl p-4 text-white cursor-pointer" onClick={() => { handleLogout() }}>Logout</button>
              </div>
            ) : (
              <div className = "flex self-center gap-2 mr-8 ">
                <button className="bg-green-600 rounded-xl p-4 text-white cursor-pointer" onClick={() => { redirectButtons('login') }}>Login</button>
                <button className="bg-green-600 rounded-xl p-4 text-white cursor-pointer" onClick={() => { redirectButtons('register') }}>Register</button>
              </div>
            )

          }

        </div>

      </div>
      {before && <UploadScreen imageUrl={imageUrl} setImageUrl={setImageUrl} setBefore={setBefore} setLoading={setLoading}
        setAfter={setAfter} setHasUploaded={setHasUploaded} loginCredentials={loginCredentials} />}

      {loading && <LoadingScreen />}

      {after && <FinalScreen imageUrl={imageUrl} setBefore={setBefore} setAfter={setAfter} hasUploaded={hasUploaded} setHasUploaded={setHasUploaded}
        register={register} setRegister={setRegister} setLogin={setLogin} loginCredentials={loginCredentials} />}

      {register && <RegisterScreen setRegister={setRegister} setAfter={setAfter} />}
      {login && <LoginScreen setLogin={setLogin} setAfter={setAfter} setLoginCredentials={setLoginCredentials} />}
      {/* <div className = "border-2 border-red-500 w-full mt-auto">
        <footer className="font-semibold font-poppins text-gray-500 text-1xl mt-4">Created by <a href="https://github.com/gabrielyap">Gabriel Yap</a></footer>
      </div> */}
    </main>


  )
}
