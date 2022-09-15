import  {React, Fragment, useEffect, useState} from "react";
import { Link, useParams} from "react-router-dom";
import "../style.css"
const Posts = ({posts, token, retrievePosts}) => {
    useEffect(() => {
        retrievePosts()
    }, [token])
    const [searchTerm, setSearchTerm] = useState('')
    function postMatches (post, text) {
        const {title, description, willDeliver} = post
        if(title.toLowerCase().includes(text.toLowerCase()) 
        || description.toLowerCase().includes(text.toLowerCase()) 
        || [willDeliver].toString().toLowerCase().includes(text.toLowerCase()))

        {
            return post
        }
    }
    const filteredPosts = posts.filter(post => postMatches(post, searchTerm));
    const postsToDisplay = searchTerm.length ? filteredPosts : posts;

    return (
        <div>
            <form onSubmit={(e) => e.preventDefault()}>
                <input type="text" placeholder="Enter Search Criteria" className="inputs" onChange={(e) => setSearchTerm(e.target.value)}></input>
            </form>
            {
                postsToDisplay.map((post) => {
                    const {description, location, price, title, isAuthor, willDeliver, _id} = post;
                    return (
                    <div key={_id} className="posts">
                        <h3>{title}</h3>
                        <p>Description: {description}</p>
                        <p>Location: {location}</p>
                        <p>Price: {price}</p>
                        <p>Will Deliver: {[willDeliver].toString()}</p>
                        { 
                        isAuthor ? (
                            <Fragment>
                            <Link to={`/posts/edit-post/${_id}`}>Edit</Link>
                            <Link to={`/posts/${_id}`}>View</Link>
                            </Fragment>
                        ) : (
                            <Link to={`/posts/${_id}`}>View</Link>
                        )
                        
                        }
                    </div>
                    )
                })
            }
        </div>
    )
}

export default Posts