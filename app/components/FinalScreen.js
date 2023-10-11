import React, { useState, useEffect } from "react"
import { Image } from "cloudinary-react"
import Axios from "axios"

export default function FinalScreen({ imageUrl, setBefore, setAfter, hasUploaded, setHasUploaded, setRegister, setLogin, loginCredentials }) {
    const [allImages, setAllImages] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [editMode, setEditMode] = useState(false)
    const [editedLabel, setEditedLabel] = useState('')

    const copyInput = () => {
        const copyText = document.getElementById("myInput");
        copyText.select()
        navigator.clipboard.writeText(copyText.value)
    }

    const getImages = async () => {
        //console.log("Sending GET request to api")
        await Axios.get("http://localhost:8000/api")
            .then((re) => {
                //console.log('Got re from server: ', re)
                // console.log('re.data: ', re.data)
                setAllImages(re.data)
            })
            .catch((err) => {
                window.alert(`Error: ${err}`)
            })
    }

    const handleSearch = async () => {
        await getImages()
        if (searchValue !== '') {
            const filtered = await allImages.filter((item) => item.label === searchValue)
            if (filtered.length == 0) {
                window.alert("No images with that label")
            } else {
                setAllImages(filtered)
            }
        }

    }

    const handleDelete = async (id) => {
        await Axios.delete(`http://localhost:8000/api/${id}`)
            .then((re) => {
                //console.log(re)
                getImages()
            })
            .catch((err) => {
                window.alert(`Error: ${err}`)
            })
    }

    const handleEdit = async (id, newLabel) => {
        setEditMode(false)
        setEditedLabel('')
        await Axios.put(`http://localhost:8000/api/${id}`, { label: newLabel })
            .then((re) => {
                getImages()
            })
            .catch((err) => {
                window.alert(`Error: ${err}`)
            })
    }

    const exitImage = () => {
        setEditMode(false)
        setEditedLabel('')
    }

    const copyLink = async (id) => {
        await Axios.get(`http://localhost:8000/api/${id}`)
            .then((re) => {
                navigator.clipboard.writeText(re.data.imageLink)
                window.alert("Link copied!")
            }).catch((err) => {
                window.alert(err)
            })
    }

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


    const checkLoginCreds = async () => {
        console.log('loginCredentials', loginCredentials)
    }

    useEffect(() => {
        getImages()
    }, [])

    return (
        <div className="flex flex-col items-center bg-zinc-50 p-6 rounded-lg shadow-lg max-w-2xl">
            {
                loginCredentials.username != '' ? (
                    <h1 className="flex flex-row-reverse w-full my-2">Welcome back, {loginCredentials.username} </h1>
                ) : (
                    <div></div>
                )

            }
            {hasUploaded ? (
                <div className="flex flex-col items-center">
                    <div className="flex w-full justify-between">
                        <img src="green_check2.png" className="mr-auto w-16" />
                        <div className="flex w-full justify-end gap-2">
                            {/* <button onClick = {() => checkLoginCreds()}>Check login creds</button> */}
                            <button className="bg-green-600 rounded-2xl p-4 text-white cursor-pointer" onClick={() => { redirectLogin() }}>Login</button>
                            <button className="bg-green-600 rounded-2xl p-4 text-white cursor-pointer" onClick={() => { redirectRegister() }}>Register</button>
                            <button className="bg-green-600 rounded-2xl p-4 text-white cursor-pointer " onClick={() => { redirectUpload() }}>Upload</button>
                        </div>
                    </div>

                    <h1 className="font-semibold font-poppins text-stone-900 text-2xl my-4">Uploaded Successfully!</h1>
                    <Image cloudName="dnyt3b1h3" publicId={imageUrl} className="rounded-xl my-4" />
                    <div className="flex justify-between bg-gray-200 rounded-xl px-2 py-1 border-2 border-gray-300 space-x-12">
                        <input className="bg-inherit w-96 text-ellipsis border focus:border-transparent focus:outline-none" type="text" value={imageUrl} id="myInput" readOnly />
                        <button className="bg-blue-500 rounded-2xl p-4 text-white cursor-pointer" onClick={() => copyInput()}>Copy Link</button>
                    </div>
                </div>

            ) : (
                <div className="flex w-full justify-end gap-2">
                    {/* <button onClick = {() => checkLoginCreds()}>Check login creds</button> */}
                    <button className="bg-green-600 rounded-2xl p-4 text-white cursor-pointer" onClick={() => { redirectLogin() }}>Login</button>
                    <button className="bg-green-600 rounded-2xl p-4 text-white cursor-pointer" onClick={() => { redirectRegister() }}>Register</button>
                    <button className="bg-green-600 rounded-2xl p-4 text-white cursor-pointer " onClick={() => { redirectUpload() }}>Upload</button>
                </div>

            )

            }


            <div>
                <input type="text" id="search" className="outline-blue-200 outline px-1 mr-2" placeholder="Search..." onChange={(e) => setSearchValue(e.target.value)} />
                <button className="bg-blue-500 rounded-2xl p-4 text-white cursor-pointer my-4" onClick={() => handleSearch()}>Search</button>
            </div>

            <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                {allImages.map((item, index) => (
                    <div className="relative m-auto" key={index}>
                        <Image cloudName="dnyt3b1h3" publicId={item.imageLink} key={index} className="" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 bg-black bg-opacity-50 cursor-pointer hover:opacity-100" onMouseEnter={() => setEditedLabel(item.label)} onMouseLeave={() => exitImage()}>
                            {editMode ? (
                                <input
                                    className="w-24"
                                    type="text"
                                    value={editedLabel}
                                    onChange={(e) => setEditedLabel(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleEdit(item._id, editedLabel)
                                        }
                                    }}
                                />
                            ) : (
                                <span className="text-white" onClick={() => {
                                    setEditMode(true)
                                    setEditedLabel(item.label)
                                }
                                }>{item.label}</span>
                            )

                            }

                            <button className="absolute top-0 right-0 px-1 text-white bg-red-500" onClick={() => handleDelete(item._id)}>X</button>
                            <button className="absolute top-0 left-0 px-1 text-white bg-blue-500" onClick={() => setEditMode(true)}>EDIT</button>
                            <button className="absolute bottom-0 left-0 px-1 text-white bg-blue-500" onClick={() => copyLink(item._id)}>COPY</button>
                            <div className="absolute bottom-0 right-0 text-white text-xs">
                                {(item.author != '' && item.author != null) ? (
                                    <div> author: {item.author} </div>
                                ) : (null)
                                }
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
}