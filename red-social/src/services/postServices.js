//const URI = 'https://social-style.herokuapp.com';
const URI = 'http://localhost:8000';

const createPost = async (data) => {
    let formData = new FormData();
    formData.append('token', data.sessionToken);
    formData.append('description', data.comment);
    
    let request = await fetch(`${URI}/post/create`, {
        method: 'POST',
        body: formData,
        headers: {
            "Accept": "application/json"
        }
    })
    return await request.json();
}

const getPosts = async (sessionToken) => {

    let request = await fetch(`${URI}/post/show`, {
        method: 'GET',
        headers: {
            'authToken': sessionToken,
            "Accept": "application/json"
        }
    })
    return await request.json();
}

const getPost = async (id, sessionToken) => {
    let request = await fetch(`${URI}/post/${id}`, {
        method: 'GET',
        headers: {
            'authToken': sessionToken,
            "Accept": "application/json"
        }
    })
    return await request.json();
}

const getSearchPosts = async (xdata) =>{
    let formData = new FormData();
    formData.append('token', xdata.sessionToken);
    formData.append('postSearch', xdata.postSearch);
    let request = await fetch(`${URI}/post/search`, {
        method: 'POST',
        body: formData,
        headers: {
            "Accept": "application/json"
        }
    })
    return await request.json();
}

const updatePost = async (data, sessionToken) => {
    let xdata = {
        post_id: data.post_id,
        description: data.description
    }
    
    let request = await fetch(`${URI}/post/update`, {
        method: 'PUT',
        body: JSON.stringify(xdata),
        headers: {
            'Content-Type': 'application/json',
            'authToken': sessionToken
        }
    })
    return await request.json();
}

const deletePost = async (post_id, sessionToken) => {
    
    let request = await fetch(`${URI}/post/delete/${post_id}`, {
        method: 'DELETE',
        headers: {
            'authToken': sessionToken
        }
    })
    return await request.json();
}

module.exports ={
    createPost,
    getPosts,
    getSearchPosts,
    updatePost,
    getPost,
    deletePost
}