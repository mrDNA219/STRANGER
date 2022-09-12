import {React, useState, useEffect} from "react";
import reactDom from "react-dom/client";
import { Route, Routes, BrowserRouter, useNavigate } from "react-router-dom";
import './style.css'
import {
    Navbar,
    Profile,
    Posts,
    Home,
    Header,
    Register,
    Login,
    CreatePost,
    SinglePostView,
    EditPost
} from './components'
import{
    getPosts, getUserDetails
} from './api'

const App = () => {
    const [posts, setPosts] = useState([])
    const [token, setToken] = useState('')
    const [user, setUser] = useState({})
    const navigate = useNavigate()
    const retrievePosts = async () => {
        const results = await getPosts(token);
        setPosts(results.data.posts)
    }
    async function getMe() {
        const storedToken = window.localStorage.getItem('token');
        if(!token){
            if(storedToken){
            setToken(storedToken);
            }
            return;
        }
        const results = await getUserDetails(token)
        if(results.success){
        setUser(results.data)
        } else {
            console.log(results.error.message)
        }
    }
    useEffect(() => {
        retrievePosts()
    }, [token])
    useEffect(() => {
        getMe()
    }, [token])
        
    return (
        <div>
            <Header />
            <Navbar setToken={setToken} token={token}/> 
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/posts' element={<Posts posts={posts} token={token} retrievePosts={retrievePosts} navigate={navigate}/>} />
                <Route path='/posts/createpost' element={<CreatePost token={token} navigate={navigate} retrievePosts={retrievePosts}/>} />
                <Route path='/profile' element={<Profile user={user} getMe={getMe}/>} />
                <Route path='/register' element={<Register setToken={setToken} navigate={navigate} />} />
                <Route path='/login' element={<Login setToken={setToken} navigate={navigate} />} />
                <Route path='/posts/:postID' element={<SinglePostView posts={ posts } retrievePosts={retrievePosts} token={token} navigate={navigate} />} />
                <Route path='/posts/edit-post/:postID' element={<EditPost posts={posts} token={token} navigate={navigate} retrievePosts={retrievePosts}/>} />
            </Routes>
            
            
        </div>
        
    )
}
 const app = document.querySelector('#app')
 const root = reactDom.createRoot(app)
 root.render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
 )