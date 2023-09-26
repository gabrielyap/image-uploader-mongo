import React, {useState, useEffect} from "react"
import { Image } from "cloudinary-react"
import Axios from "axios"

export default function FinalScreen({imageUrl}){
    const [allImages, setAllImages] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [editMode, setEditMode] = useState(false)
    const [editedLabel, setEditedLabel] = useState('')
    const copyInput = () => {
        const copyText = document.getElementById("myInput");
        copyText.select()
        navigator.clipboard.writeText(copyText.value)
    }

    const getImages = () => {
        //console.log("Sending GET request to /getImages")
        Axios.get("http://localhost:8000/api/getImages")
        .then((re) => {
            // console.log('Got re from server: ', re)
            // console.log('re.data: ', re.data)
            setAllImages(re.data)
        })
        .catch((err) => {
            window.alert(`Error: ${err}`)
        })
    }

    const handleSearch = () => {
        if (searchValue === ''){
            getImages()
        } else {
            const filtered = allImages.filter((item) => item.label === searchValue)
            setAllImages(filtered)
        }
        
    }

    const handleDelete = async (id) => {
        await Axios.delete(`http://localhost:8000/api/delete/${id}`)
        .then((re) => {
            getImages()
        })
        .catch((err) => {
            window.alert(`Error: ${err}`)
        })
    }

    const handleEdit = async (id, newLabel) => {
        setEditMode(false)
        setEditedLabel('')
        await Axios.put(`http://localhost:8000/api/update/${id}`, {label: newLabel})
        .then((re) => {
            getImages()
        })
        .catch((err) => {
            window.alert(`Error: ${err}`)
        })
    }

    const exitImage = () =>{
        setEditMode(false)
        setEditedLabel('')
    }

    useEffect(() => {
        getImages()
    },[allImages])

    return(
        <div className = "flex flex-col items-center bg-zinc-50 p-6 rounded-lg shadow-lg max-w-2xl">
            <img src = "green_check2.png" className = "w-16" />
            <h1 className = "font-semibold font-poppins text-stone-900 text-2xl my-4">Uploaded Successfully!</h1>
            <Image cloudName = "dnyt3b1h3" publicId = {imageUrl} className = "rounded-xl my-4"/>
            <div className = "flex justify-between bg-gray-200 rounded-xl px-2 py-1 border-2 border-gray-300 space-x-12">
                <input className = "bg-inherit w-96 text-ellipsis border focus:border-transparent focus:outline-none" type = "text" value = {imageUrl} id = "myInput" readOnly/>
                <button className = "bg-blue-500 rounded-2xl p-4 text-white cursor-pointer" onClick = {() => copyInput()}>Copy Link</button>
            </div>
            <div>
                <input type = "text" id = "search" className = "outline-blue-200 outline px-1 mr-2" placeholder = "Search..." onChange = {(e) => setSearchValue(e.target.value)}/>
                <button className = "bg-blue-500 rounded-2xl p-4 text-white cursor-pointer my-4" onClick = {() => handleSearch()}>Search</button>
            </div>

            <div className = "grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                {allImages.map((item, index) => (
                    <div className = "relative m-auto" key = {index}>
                        <img src = {item.imageLink} key = {index} className = "" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 bg-black bg-opacity-50 cursor-pointer hover:opacity-100" onMouseEnter = {() => setEditedLabel(item.label)} onMouseLeave={() => exitImage()}>
                            { editMode ? (
                                    <input
                                    className = "w-24"
                                    type="text"
                                    value={editedLabel}
                                    onChange={(e) => setEditedLabel(e.target.value)}
                                    onKeyDown = {(e) => {
                                        if (e.key === 'Enter'){
                                            handleEdit(item._id, editedLabel)
                                        }
                                    }}
                                    />
                                ): (
                                    <span className="text-white" onClick={() => {
                                        setEditMode(true) 
                                        setEditedLabel(item.label)}
                                        }>{item.label}</span>
                                )

                            }
                            
                            <button className="absolute top-0 right-0 px-1 text-white bg-red-500" onClick = {() => handleDelete(item._id)}>X</button>
                            <button className="absolute top-0 left-0 px-1 text-white bg-blue-500" onClick = {() => setEditMode(true)}>EDIT</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        
    );
}