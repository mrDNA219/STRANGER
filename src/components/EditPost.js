import {React, useState} from "react";
import { useParams } from "react-router-dom";
import {updatePost, deletePosts} from "../api"
import "../style.css"


const EditPost = ({ posts, token, navigate, retrievePosts}) => {
    
    const { postID } = useParams();

    const [currentPost] = posts.filter(post => post._id === postID);
    const {title, description, location, price, willDeliver} = currentPost;
   
    const [newTitle, setNewTitle] = useState(title)
    const [newDescription, setNewDescription] = useState(description)
    const [newLocation, setNewLocation] = useState(location)
    const [newPrice, setNewPrice] = useState(price)
    const [newWillDeliver, setNewWillDeliver] = useState(willDeliver)
    
    async function editPost() {
            const updatedPost = {
               token: token,
               title: newTitle,
               description: newDescription,
               location: newLocation,
               price: newPrice,
               willDeliver: newWillDeliver,
               _id: postID
            }
            await updatePost(updatedPost)
            retrievePosts();
            navigate('./posts')
        }
    return (
            <form onSubmit={(e) => {
                e.preventDefault();
                editPost();
            }}>
                <input className="inputs" type="text" placeholder={title} onChange={(e) => setNewTitle(e.target.value)}></input>
                <input className="inputs" type="text" placeholder={description} onChange={(e) => setNewDescription(e.target.value)}></input>
                <input className="inputs" type="text" placeholder={location} onChange={(e) => setNewLocation(e.target.value)}></input>
                <input className="inputs" type="text" placeholder={price} onChange={(e) => setNewPrice(e.target.value)}></input>
                <div className="checkbox-wrapper">
                <label>
                <input type="checkbox" placeholder={willDeliver} onChange={(e) => setNewWillDeliver(e.target.checked)}></input>
                <span>check box if you can deliver item(s)</span>
                </label>
                </div>
                <button type='submit'>Edit Post</button>
                <button onClick={() => deletePosts(token, postID)}>Delete Post</button>
                
    
            </form>
        )

}
export default EditPost