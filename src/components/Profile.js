import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import '../style.css'
const Profile = ({user, getMe, posts}) => {
  async function getMeHelper(){
    const results = await getMe()
    return results
  }
  useEffect(() => {
    getMeHelper();
  }, [])
    const messages = user.messages;
    const userID = user._id;
   
  
    if(messages){
      return (
        <div>
          <div className="posts">
          <h1>Your Posts!</h1>
          {
                posts.map((post) => {
                    const {description, location, price, title, isAuthor, willDeliver, _id} = post;
                    return (
                      <div className="messages-from-you">
                      { isAuthor ? (
                    <div className="messages-from-you" >
                        <h3>{title}</h3>
                        <p>Description: {description}</p>
                        <p>Location: {location}</p>
                        <p>Price: {price}</p>
                        <p>Will Deliver: {[willDeliver].toString()}</p>
                        <Link to={`/posts/edit-post/${_id}`}>Edit</Link>
                        <Link to={`/posts/${_id}`}>View</Link>
                      </div> 
                      ) : (null)
                      }
                      </div>
                    )
                })
            }
            </div>
          <div className="posts">
            <h1>Messages from other users!</h1>
            {
               messages.map(message => {
                const fromUserID = message.fromUser._id;
                const {username} = message.fromUser;
                const {title} = message.post;
                
                if (userID !== fromUserID) {
                  return (
                    <div className="messages-from-you" key={message._id}>
                      <p>From User: {username} </p>
                      <p>Message: {message.content}</p>
                      <p>Post Reference: {title}</p>
                    </div>
                  )
                }
              })    
            }
          </div>
          <div className="posts">
            <h1>Messages from You!</h1>
            {
             messages.map(message => {
                const fromUserID = message.fromUser._id;
                
                if (userID === fromUserID) {
                  return (
                    <div className="messages-from-you" >
                      <p>
                      {message.content}
                      </p>
                      </div>
                  )
                }
              })    
            }
          </div>
        </div>
      )
    } else {
      return (
        <div>Loading your messages....</div>
      )
    }
}

export default Profile