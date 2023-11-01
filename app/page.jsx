"use client"

import React, { useState, useEffect } from "react"
import { Image } from "cloudinary-react"
import UploadScreen from "./components/UploadScreen"
import LoadingScreen from "./components/LoadingScreen"
import HomeScreen from "./components/HomeScreen"
import RegisterScreen from "./components/RegisterScreen"
import LoginScreen from "./components/LoginScreen"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ViewImage from "./components/ViewImage"


export default function Home() {
  const [imageUrl, setImageUrl] = useState('')
  const [before, setBefore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [home, setHome] = useState(true);
  const [hasUploaded, setHasUploaded] = useState(false)
  const [register, setRegister] = useState(false)
  const [login, setLogin] = useState(false)
  const [view, setView] = useState(false)
  const [viewImageId, setViewImageId] = useState('')
  
  const [loginCredentials, setLoginCredentials] =
    useState({
      username: '',
      password: ''
    })

  const handleLogout = () => {
    setLoginCredentials({
      username: '',
      password: ''
    })
  }

  const redirectButtons = (state) => {
    setBefore(false);
    setLoading(false);
    setHome(false);
    setHasUploaded(false);
    setRegister(false);
    setLogin(false);
    setView(false)
    switch (state) {
      case 'before':
        setBefore(true);
        break;
      case 'loading':
        setLoading(true);
        break;
      case 'home':
        setHome(true);
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
      case 'view':
        setView(true)
      default:
        break;
    }
  }

  return (
    <main className="flex min-h-screen flex-col 
    items-center 
    bg-cover" >
      <div className="flex w-full justify-between gap-2 bg-zinc-700 py-3 shadow-xl">
        <div className="flex gap-2" >
          <img className="w-16 h-16 ml-4 hover:cursor-pointer" src="camera-flat.png" alt="logo" onClick={() => { redirectButtons('home') }} />
          <div className="flex self-center text-2xl font-semibold text-stone-50 dark:text-white hover:cursor-pointer " onClick={() => { redirectButtons('home') }}> Mongo Museum</div>
          <button className="bg-green-600 rounded-xl p-4 text-white cursor-pointer hover:text-emerald-300" onClick={() => { redirectButtons('before') }}>New Post</button>
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
            ) : (null)
          }
          
          {
            loginCredentials.username != '' ? (
              <div className="flex self-center gap-2 mr-8 ">
                <button className="bg-green-600 rounded-xl p-4 text-white cursor-pointer hover:text-emerald-300" onClick={() => { handleLogout() }}>Logout</button>
              </div>
            ) : (
              <div className="flex self-center gap-2 ">
                <button className="bg-green-600 rounded-xl p-4 text-white cursor-pointer hover:text-emerald-300" onClick={() => { redirectButtons('login') }}>Login</button>
                <button className="bg-green-600 rounded-xl p-4 text-white cursor-pointer hover:text-emerald-300" onClick={() => { redirectButtons('register') }}>Register</button>
              </div>
            )

          }

        </div>

      </div>


      {home && <HomeScreen imageUrl={imageUrl} setBefore={setBefore} setHome={setHome} hasUploaded={hasUploaded} setHasUploaded={setHasUploaded}
        register={register} setRegister={setRegister} setLogin={setLogin} loginCredentials={loginCredentials} setView={setView} setViewImageId={setViewImageId} />}
      {view && <ViewImage viewImageId={viewImageId} loginCredentials={loginCredentials} setHome={setHome} setView={setView}/>}
      {}
      {before && <UploadScreen setImageUrl={setImageUrl} setBefore={setBefore} setLoading={setLoading}
        setHome={setHome} setHasUploaded={setHasUploaded} loginCredentials={loginCredentials} />}

      {loading && <LoadingScreen />}

      {register && <RegisterScreen setRegister={setRegister} setHome={setHome} />}
      {login && <LoginScreen setLogin={setLogin} setHome={setHome} setLoginCredentials={setLoginCredentials} />}
      
    </main>
  )
}