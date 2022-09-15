import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { createMessage } from '../api';
import "../style.css"
const SendMessage = ({ postID, token, navigate}) => {
  const [message, setMessage] = useState({content: ''});
  async function addMessage() {
    await createMessage({postID, message, token})
  }
  if(token){
    return (
      <form onSubmit={ (ev)=> {
        ev.preventDefault();
        addMessage();
        navigate('./profile')

      }}>
        <input
          type='text'
          placeholder='Enter Message'
          className="inputs"
          onChange={ (ev) => setMessage({content: ev.target.value}) }
        />
        <button type='submit'>Send Message</button>
      </form>
    )
  } 
}
const SinglePostView = ({ posts, retrievePosts, token, navigate}) => {
  useEffect(() =>{
    retrievePosts();
  }, [])
  const [activateMessage, setActivateMessage] = useState(false)
  const { postID } = useParams();
 
  
  if(posts.length){
    const [currentPost] = posts.filter(post => post._id === postID);
    const {title, description, location, price, willDeliver, isAuthor} = currentPost;
    return (
      <div>
        <div className='posts'>
        <h3>{title}</h3>
        <p>Description: {description}</p>
        <p>Price: {price}</p>
        <p>Location: {location}</p>
        <p>Will Deliver: {willDeliver.toString()}</p>
        </div>
        {!isAuthor ? (
      <button onClick={() => setActivateMessage(!activateMessage)}>Message this user</button>
        ) : (null)
        }
      {
        activateMessage && <SendMessage postID={postID} token={token} navigate={navigate}/>
      }
      </div>
    )
  } else {
    return (
      <h1>waiting for posts</h1>
    )
  }
  
  
  
  
 
}

export default SinglePostView;