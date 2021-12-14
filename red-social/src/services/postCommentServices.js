//const URI = 'https://social-style.herokuapp.com';
const URI = 'http://localhost:8000';

const createComment = async (data) => {
    let formData = new FormData();
    formData.append('token', data.sessionToken);
    formData.append('description', data.comment);
    formData.append('id', data.id);
    
    let request = await fetch(`${URI}/postComment/create`, {
        method: 'POST',
        body: formData,
        headers: {
            "Accept": "application/json"
        }
    })
    return await request.json();
}

const getComments = async (sessionToken) => {

    let request = await fetch(`${URI}/postComment/show`, {
        method: 'GET',
        headers: {
            'authToken': sessionToken,
            "Accept": "application/json"
        }
    })
    return await request.json();
}

const deleteComment = async (post_id, sessionToken) => {
    
    let request = await fetch(`${URI}/postComment/delete/${post_id}`, {
        method: 'DELETE',
        headers: {
            'authToken': sessionToken
        }
    })
    return await request.json();
}

module.exports ={
    createComment,
    getComments,
    deleteComment
}