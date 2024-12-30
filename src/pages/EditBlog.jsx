import React, { useEffect, useState } from "react";
import { URL } from '../url'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const EditBlog = () => {
  const navigate = useNavigate()
  const { id: blogId } = useParams()
  const [post, setPost] = useState({
    title: "",
    heading:"",
    text:"",
    imageUrl: null,
  })
  const [file, setFile] = useState(null)
//   const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")


  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${URL}/api/posts/${blogId}`)
      setPost(res.data)
    } catch (error) {
      console.error("Failed to fetch blog posts:", error)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [blogId])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const editPost = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    setError("")

    const updatedPost = {
      title: post.title,
      heading: post.heading,
      text: post.text
    }

    try {
      const res = await axios.put(`${URL}/api/posts/${blogId}`, updatedPost, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (res.data) {
        navigate('/categorytable')
      }
    } catch (error) {
      console.error("failed to update category:", error)
      setError("Failed to update category. Please try again")
    } finally {
      setIsLoading(false)
    }
  }

  const updateImage = async () => {
    setIsLoading(true)
    setError("")

    const formData = new FormData()
    if (file) {
      formData.append('imageUrl', file)
    } else {
      setError("Please select an image to upload")
      setIsLoading(false)
      return
    }

    try {
      const res = await axios.put(`${URL}/api/posts/${blogId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (res.data) {
        setPost(prev => ({ ...prev, imageUrl: res.data.imageUrl }))
        setFile(null)
      }
    } catch (error) {
      console.error("failed to update image:", error)
      setError("Failed to update image. Please try again")
    } finally {
      setIsLoading(false)
    }
  }

  const removeImage = async () => {
    setIsLoading(true)
    setError("")

    try {
      const res = await axios.delete(`${URL}/api/posts/${blogId}`);
      if (res.data) {
        setPost(prev => ({ ...prev, imageUrl: null }))
      }
    } catch (error) {
      console.error("failed to remove image:", error)
      setError("Failed to remove image. Please try again")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full">
      <div className="items-center h-[100vh] gap-x-9 justify-center flex w-full">
        <form onSubmit={editPost}>
          <div className="flex flex-col gap-y-6">
            <p className="text-2xl text-center">Edit Blog Post</p>
            {error && <p className="text-red-500">{error}</p>}
            <input name="title" value={post.title} onChange={handleInputChange} className="border border-black px-2 py-1 w-full md:w-[500px] rounded-md" placeholder="title" />
            <textarea name="heading" value={post.heading} onChange={handleInputChange} className="border border-black px-2 py-1 w-full md:w-[500px] rounded-md" placeholder="heading" />
            <textarea name="text" value={post.text} onChange={handleInputChange} className="border border-black px-2 py-1 w-full md:w-[500px] rounded-md h-[200px]" placeholder="text" />
            <button type="submit" disabled={isLoading} className="bg-blue-500 text-white py-1">{isLoading ? "Updating ..." : "Update blog post"}</button>
          </div>
        </form>

        <div className="mt-8">
          <p className="text-xl mb-4">Update Image</p>
          {post.imageUrl && (
            <div>
              <p>Current image:</p>
              <img src={post.imageUrl} alt="post" className="w-32 h-32 object-cover mb-2" />
              {/* <button onClick={removeImage} className="bg-red-500 text-white px-3 py-1 rounded-md mb-4">Remove Image</button> */}
            </div>
          )}
          <input type="file" onChange={handleFileChange} className="mb-2" />
          <button onClick={updateImage} disabled={isLoading} className="bg-green-500 text-white px-3 py-1 rounded-md">
            {isLoading ? "Updating..." : "Update Image"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
