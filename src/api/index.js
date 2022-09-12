
const baseURL = 'https://strangers-things.herokuapp.com/api/2206-FTB-ET-WEB-PT'

export const getPosts = async (token) => {
    try{
        const response = await fetch(`${baseURL}/posts`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }) ;
        const results =  await response.json();
        return(results)
    } catch(er){
        console.error(er)
    }
}

export const registerUser = async (username, password) => {
    try{
        const response = await fetch(`${baseURL}/users/register`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              user: {
                username: username,
                password: password
              }
            })
          });
        const results = await response.json();
        return(results)
    } catch(er){
        console.error(er)
    }
}
export const loginUser = async (username, password) => {
  try{
    const response = await fetch(`${baseURL}/users/login`,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password
        }
      })
    });
    const results = await response.json();
    return results;
  } catch(er) {
    console.error(er)
  }
}
export const getUserDetails = async (token) => {
  try{
    const response = await fetch(`${baseURL}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${token}`
      }
    })
    const results = await response.json()
    return results
  } catch(er) {
    console.error(er)
  }
}
export const createPost = async (token, {title, description, price, location, willDeliver}) => {
  try{
    const response = await fetch(`${baseURL}/posts`,  {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${token}`
      }, 
      body: JSON.stringify({
        post: {
          title,
          description,
          price,
          location,
          willDeliver
        }
      })
    })
    const results = await response.json()
    return results
  } catch(er) {
    console.error('error creating new post')
  }
}
export const updatePost = async ({token, title, description, price, location, willDeliver, _id}) => {
  try{
    const response = await fetch(`${baseURL}/posts/${[_id]}`,  {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${token}`
      }, 
      body: JSON.stringify({
        post: {
          title,
          description,
          price,
          location,
          willDeliver
        }
      })
    })
    const results = await response.json()
    return results
  } catch(er) {
    console.log('error updating the post')
  }
}
export const createMessage = async ({postID, token, message}) => {
  try {
    const response = await fetch(`${baseURL}/posts/${postID}/messages`, {
     method: 'POST',
     headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
     },
     body: JSON.stringify({
      message
     })
    })
  } catch(ex) {
    console.log('error creating message')
  }
}
export const deletePosts = async (token, postID) => {
  try{
    const response = await fetch(`${baseURL}/posts/${postID}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    const result = await response.json();
    console.log(result)
    
  } catch(er){
    console.log('error deleting post')
  }
}