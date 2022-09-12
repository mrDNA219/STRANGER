import {React, useState, Fragment} from "react";
import { createPost } from "../api";
import "../style.css"
const CreatePost = ({token, retrievePosts, navigate}) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [location, setLocation] = useState('')
    const [willDeliver, setWillDeliver] = useState(false)
    const newPost = {
        title,
        description,
        price,
        location,
        willDeliver
    }
    async function addPost() {
        await createPost(token, newPost);
        retrievePosts();
        navigate('./posts')
        
        
    }
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            addPost();
        }}>
            <input type="text" className="inputs" placeholder="Enter Title" onChange={(event) => setTitle(event.target.value)}></input>
            <input type="text" className="inputs" placeholder="Enter Description" onChange={(event) => setDescription(event.target.value)}></input>
            <input type="text" className="inputs" placeholder="Enter Price in USD" onChange={(event) => setPrice(event.target.value)}></input>
            <input type="text" className="inputs" placeholder="Enter Location" onChange={(event) => setLocation(event.target.value)}></input>
            <div className="checkbox-wrapper">
                <label>
                <input type="checkbox" placeholder="true" className="checkbox" onChange={(event) => setWillDeliver(event.target.checked)}></input>
                <span>check box if you can deliver item(s)</span>
                </label>
                </div>
            <button type='submit' name="create-post" >Create New Post</button>
            
        </form>
    )
}
export default CreatePost