import React, { useState, useEffect } from "react"
import { Image } from "cloudinary-react"
import Axios from "axios"
import { useRouter } from "next/router"

export default function HomeScreen({ imageUrl, setHome, hasUploaded, loginCredentials, setView, setViewImageId }) {
    const [allImages, setAllImages] = useState([])
    const [searchValue, setSearchValue] = useState('')

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
            const filtered = await allImages.filter((item) => (
                item.label === searchValue || item.label.toLowerCase().startsWith(searchValue.toLowerCase())
            ))
            if (filtered.length == 0) {
                window.alert("No images with that label")
            } else {
                setAllImages(filtered)
            }
        }

    }

    const redirectView = (imageLink) => {
        window.location.href =  `/view/?id=${imageLink}`
        // console.log(imageLink)
        // setViewImageId(imageLink)
        // setHome(false)
        // setView(true)
    }

    const checkLoginCreds = async () => {
        console.log('loginCredentials', loginCredentials)
    }

    useEffect(() => {
        getImages()
    }, [])

    return (
        <div className="flex flex-col items-center p-6 rounded-lg max-w-6xl">
            {hasUploaded ? (
                <div className="flex flex-col items-center">
                    <div className="flex w-full justify-between">
                        <img src="green_check2.png" className="mr-auto w-16" alt = "noImage.svg"/>
                    </div>

                    <h1 className="font-semibold font-poppins text-stone-900 text-2xl my-4">Uploaded Successfully!</h1>
                    <Image cloudName="dnyt3b1h3" publicId={imageUrl} className="rounded-xl my-4" alt = "noImage.svg"/>
                    <div className="flex justify-between bg-gray-200 rounded-xl px-2 py-1 border-2 border-gray-300 space-x-12">
                        <input className="bg-inherit w-96 text-ellipsis border focus:border-transparent focus:outline-none" type="text" value={imageUrl} id="myInput" readOnly />
                        <button className="bg-blue-500 rounded-2xl p-4 text-white cursor-pointer" onClick={() => copyInput()}>Copy Link</button>
                    </div>
                </div>

            ) : (null)
            }

            <div>
                <input type="text" id="search" className="outline-blue-200 outline px-1 mr-2" placeholder="Search..." onChange={(e) => setSearchValue(e.target.value)} />
                <button className="bg-blue-500 rounded-2xl p-4 text-white cursor-pointer my-4 hover:text-cyan-200" onClick={() => handleSearch()}>Search</button>
            </div>

            <div className="grid gap-2 mb-8 md:grid-cols-2 xl:grid-cols-8">
                {allImages.map((item, index) => (
                    <div className="relative m-auto shadow-xl" key={index}>
                        <Image cloudName="dnyt3b1h3" publicId={item.imageLink.replace('/upload', '/upload/w_300')} key={index} className="w-full h-full object-fit-contain" alt = "noImage.svg"/>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 bg-black bg-opacity-50 cursor-pointer hover:opacity-100" onClick={() => redirectView(item._id)}>
                            <span className="text-white">{item.label}</span>
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
