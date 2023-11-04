'use client'
import React, { useState } from "react"
import Axios from 'axios'
import Link from 'next/link'


export default function Page() {
    const [formData, setFormData] = useState({
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
            const response = await Axios.post("http://localhost:8000/api/login", formData);
            if (response.status === 200) {
                // Successful login
                localStorage.setItem("username", formData.username)
                localStorage.setItem("password", formData.password)
                //setLoginCredentials(formData)
                console.log("response.data: ", response.data)
                window.location = '/'
                //handleBack()
            } else {
                // Handle login error
                window.alert("Invalid username or password")
                console.log('Login failed:', response.data.error);
            }
        } catch (error) {
            window.alert("Invalid username or password")
            console.log('Error:', error);
        }
    };
    // const authCheck = async () => {
    //     await Axios.post("http://localhost:8000/api/checkAuth")
    //     .then((re) => {
    //         console.log(re)
    //     }) .catch((err) => {
    //         window.alert(err)
    //     })
    //     //console.log(response)
    // }

    return (
        <main className="flex min-h-screen flex-col 
    items-center 
    bg-cover" >
            <div className="flex w-full justify-between gap-2 bg-zinc-700 py-3 shadow-xl">
                <a href="/" className="flex gap-2" >
                    <img className="w-16 h-16 ml-4 hover:cursor-pointer" src="camera-flat.png" alt="logo" />
                    <div className="flex self-center text-2xl font-semibold text-stone-50 dark:text-white hover:cursor-pointer " > Mongo Museum</div>
                    {/* <button className="bg-green-600 rounded-xl p-4 text-white cursor-pointer hover:text-emerald-300" onClick={() => { redirectButtons('before') }}>New Post</button> */}
                </a>
            </div>
            <section className="bg-gray-50 dark:bg-gray-900 mt-4 shadow-xl">
                <button className="text-2xl font-semibold text-gray-900 p-2" onClick={() => window.location = '/'}>Back</button>
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto mt-8 lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-8 h-8 mr-2" src="camera-flat.png" alt="logo" />
                        Mongo Museum
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 mb-4">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label for="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                                    <input type="username" name="username" id="username" value={formData.username} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" required="" />
                                </div>
                                <div>
                                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>

                                <button type="submit" className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    )
}