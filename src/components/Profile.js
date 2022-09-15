import React, {useEffect} from "react";
import '../style.css'
const Profile = ({user, getMe}) => {
  useEffect(() => {
    getMe()
  }, [user])
    const messages = user.messages;
    const userID = user._id;
    if(messages){
      return (
        <div>
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
                    <div className="messages-from-you" key={message._id}>
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