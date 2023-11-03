'use client'
import React, { useState } from "react"
import Axios from 'axios'
import Link from 'next/link'


export default function Page() {
    
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("formData: ", formData)
        try {
            const response = await Axios.post("http://localhost:8000/api/register", formData);
            if (response.status === 200) {
              // Successful register
              console.log("response.data: ", response.data)
              window.location = '/'
              //handleBack()
            } else {
              // Handle login error
              window.alert("Invalid username or password")
              console.log('Login failed:', response.data.error);
            }
          } catch (error) {
            window.alert("Invalid username, password, or account already exists")
            console.log('Error:', error);
          }
    };

   return (
    <main className="flex min-h-screen flex-col 
    items-center 
    bg-cover" >
      <div className="flex w-full justify-between gap-2 bg-zinc-700 py-3 shadow-xl">
        <a href = "/" className="flex gap-2" >
          <img className="w-16 h-16 ml-4 hover:cursor-pointer" src="camera-flat.png" alt="logo" />
          <div className="flex self-center text-2xl font-semibold text-stone-50 dark:text-white hover:cursor-pointer " > Mongo Museum</div>
          {/* <button className="bg-green-600 rounded-xl p-4 text-white cursor-pointer hover:text-emerald-300" onClick={() => { redirectButtons('before') }}>New Post</button> */}
        </a>

      

      </div>
      <div>
            <section className="bg-gray-50 dark:bg-gray-900 mt-4 shadow-xl">
            <button className = "text-2xl font-semibold text-gray-900 p-2" onClick = {() => window.location = '/'}>Back</button>

                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 mt-8 lg:py-0">
                    <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-8 h-8 mr-2" src="camera-flat.png" alt="logo" />
                        Mongo Museum
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 mb-4">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create an account
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit = {handleSubmit}>
                                <div>
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                                </div>
                                <div>
                                    <label for="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                    <input type="username" name="username" id="username" value={formData.username} onChange={handleChange} placeholder="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>
                                <div>
                                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label for="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                                    </div>
                                </div>
                                <button type="submit" className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    </main>
  )
}