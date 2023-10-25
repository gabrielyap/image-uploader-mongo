import React, { useEffect, useState } from "react"
import Axios from 'axios'
import { Image } from "cloudinary-react"
import OptionModal from "./OptionModal"

export default function ViewImage({ viewImageId, loginCredentials, setHome, setView }) {
    const [viewUrl, setViewUrl] = useState("")
    const [viewLabel, setViewLabel] = useState("")
    const [viewAuthor, setViewAuthor] = useState("")
    const [showDropdown, setShowDropdown] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [newLabel, setNewLabel] = useState('');
    const deconstructImage = async () => {
        await Axios.get(`http://localhost:8000/api/${viewImageId}`)
            .then((re) => {
                setViewLabel(re.data.label)
                setViewUrl(re.data.imageLink)
                setViewAuthor(re.data.author)
            })
            .catch((err) => {
                window.alert(`Error: ${err}`)
            })
    }
    const toggleDropdown = () => {
        setShowDropdown(prevState => !prevState);
    };
    const copyLink = async () => {
        navigator.clipboard.writeText(viewUrl)
        window.alert("Link copied!")
    }
    const handleDelete = async () => {
        await Axios.delete(`http://localhost:8000/api/${viewImageId}`)
            .then((re) => {
                window.alert("Image Deleted!")
                setView(false)
                setHome(true)
            })
            .catch((err) => {
                window.alert(`Error: ${err}`)
            })
    }
    const openOptions = () => {
        setShowModal(true)
    }
    const openEditForm = () => {
        setShowEditForm(true);
        setShowDropdown(false);
    };
    useEffect(() => {
        deconstructImage(viewImageId)
    }, [])
    return (
        <div className="flex flex-col my-4">
            <h1 className="flex text-4xl">{viewLabel}</h1>
            <div className="flex justify-between"> {viewAuthor ? (
                <h2 className="flex text-2xl">Author: {viewAuthor}</h2>
            ) : (
                <h2 className="flex text-2xl">No Author</h2>
            )}
                <div className="relative">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={toggleDropdown}
                    >
                        Toggle Dropdown
                    </button>
                    {showDropdown && (
                        <div className="absolute top-10 right-0 bg-white border border-gray-300 p-2 shadow">
                            {/* Dropdown options */}
                            <button className="block w-full text-left py-2 px-4 hover:bg-gray-100" onClick={() => copyLink()}>
                                Copy Link
                            </button>
                            {(viewAuthor == loginCredentials.username || viewAuthor == '') ? (
                                <div>
                                    <button className="block w-full text-left py-2 px-4 hover:bg-gray-100" onClick={() => openEditForm()}>
                                        Edit
                                    </button>
                                    <button className="block w-full text-left py-2 px-4 hover:bg-gray-100 hover:text-red-600 " onClick={() => handleDelete()}>
                                        Delete
                                    </button>
                                </div>
                            ) : (null)
                            }

                        </div>
                    )}
                </div>
                {showEditForm && (
                    <form onSubmit={console.log('s')}>
                        <input
                            type="text"
                            value={newLabel}
                            onChange={(e) => setNewLabel(e.target.value)}
                            placeholder="Enter new label"
                        />
                        <button type="submit">Submit</button>
                    </form>
                )}
            </div>
          
            <Image cloudName="dnyt3b1h3" publicId={viewUrl.replace('/upload', '/upload/w_600')} className="rounded-xl my-4" />
        </div>

    )

}

