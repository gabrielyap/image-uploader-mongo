'use client'
import React, { useEffect, useState } from "react"
import Axios from 'axios'
import { Image } from "cloudinary-react"
import CommentCard from "../components/CommentCard"
import Link from 'next/link'
import { useSearchParams } from 'next/navigation';


export default function Page() {
    const [viewUrl, setViewUrl] = useState("")
    const [viewLabel, setViewLabel] = useState("")
    const [viewAuthor, setViewAuthor] = useState("")
    const [viewComments, setViewComments] = useState([])
    const [showDropdown, setShowDropdown] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [newLabel, setNewLabel] = useState('');
    const [newComment, setNewComment] = useState('')
    const searchParams = useSearchParams()    
    const viewImageId = searchParams.get('id')
    // Need login credentials and image id
    const loginCredentials = {username: typeof window !== "undefined" ? localStorage.getItem('username') : '', 
                            password: typeof window !== "undefined" ? localStorage.getItem('password') : ''}
    const deconstructImage = async () => {
        await Axios.get(`http://localhost:8000/api/${viewImageId}`)
            .then((re) => {
                setViewLabel(re.data.label)
                setViewUrl(re.data.imageLink)
                setViewAuthor(re.data.author)
                setViewComments(re.data.comments)
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
        await Axios.post(`http://localhost:8000/api/${viewImageId}`, {username: localStorage.getItem('username'), password: localStorage.getItem('password')})
            .then((re) => {
                window.alert("Image Deleted!")
                window.location = '/'
            })
            .catch((err) => {
                window.alert(`Error: ${err}`)
            })
    }
    const handleEdit = async () => {
        await Axios.put(`http://localhost:8000/api/${viewImageId}`, { label: newLabel })
            .then((re) => {
                setViewLabel(newLabel)
                setShowEditForm(false)
            })
            .catch((err) => {
                window.alert(`Error: ${err}`)
            })
    }
    const handleComment = async () => {
        const date = new Date().toLocaleString()
        await Axios.put(`http://localhost:8000/api/comments/${viewImageId}`, { content: newComment, author: loginCredentials.username, time: date })
            .then((re) => {
                setNewComment('')
                deconstructImage(viewImageId)
            })
            .catch((err) => {
                window.alert(`Error: ${err}`)
            })
    }

    const handleDeleteComment = async (index) => {
        await Axios.patch(`http://localhost:8000/api/comments/${viewImageId}`, { commentIndex: index })
            .then((re) => {
                console.log("re:", re)
                deconstructImage(viewImageId)
            })
            .catch((err) => {
                window.alert(`Error: ${err}`)
            })
    }

    const openEditForm = () => {
        setShowEditForm(true);
        setShowDropdown(false);
    };
    useEffect(() => {
        console.log(viewImageId)
        deconstructImage(viewImageId)
    }, [])

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
            <div className="flex flex-col my-4">
                <h1 className="flex text-4xl">{viewLabel}</h1>
                <div className="flex justify-between">
                    {viewAuthor ? (
                        <h2 className="flex text-2xl">Author: {viewAuthor}</h2>
                    ) : (
                        <h2 className="flex text-2xl">No Author</h2>
                    )}
                    {showEditForm && (
                        <div className="flex gap-4">
                            <input
                                type="text"
                                value={newLabel}
                                onChange={(e) => setNewLabel(e.target.value)}
                                placeholder="Enter new label"
                            />
                            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => handleEdit()}>Submit</button>
                        </div>
                    )}
                    <div className="relative">
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                            onClick={toggleDropdown}
                        >
                            Options
                        </button>
                        {showDropdown && (
                            <div className="absolute top-10 right-0 bg-white border border-gray-300 p-2 shadow w-40">
                                {/* Dropdown options */}
                                <button className="block w-full text-left py-2 px-4 hover:bg-gray-100" onClick={() => copyLink()}>
                                    Copy Link
                                </button>
                                {(viewAuthor == loginCredentials.username || viewAuthor == null) ? (
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
                </div>

                <Image cloudName="dnyt3b1h3" publicId={viewUrl.replace('/upload', '/upload/w_600')} className="rounded-xl my-4" alt = "noImage.svg"/>
                <div className="flex flex-col mb-6 ">
                    <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                        <input className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Write a comment..."
                        />
                    </div>
                    <button onClick={() => handleComment()}
                        className="ml-auto py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                        Post comment
                    </button>
                </div>
                <div className="flex flex-col gap-2">
                    {viewComments.map((comment, index) => ( // Use parentheses to imply return this. If use {} need a return statement
                        <div key={index} className="relative">
                            {(comment.author == loginCredentials.username || comment.author == 'Anonymous') ? ( // Delete comment button shows to author of comment
                                <button className="absolute top-1 right-2 h-8 w-8 font-bold text-red-600" onClick={() => handleDeleteComment(index)}>X</button>
                            ) : (null)
                            }
                            <CommentCard comment={comment} viewImageId={viewImageId} index={index} loginCredentials={loginCredentials} />
                        </div>
                    ))}
                </div>


            </div>

        </main>
    )
}