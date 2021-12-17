//const URI = 'https://social-style.herokuapp.com';
const URI = 'http://localhost:8000';


const giveLike = async (sessionToken, post_id) =>{
    let formData = new FormData();
    formData.append('sessionToken', sessionToken);
    formData.append('post_id', post_id);

    let request = await fetch(`${URI}/action/like`, {
        method: 'POST',
        body: formData,
        headers: {
            "Accept": "application/json"
        }
    })
    return await request.json();
}

const getLikes = async (sessionToken) =>{
    let request = await fetch(`${URI}/action/likes`, {
        method: 'GET',
        headers: {
            'authToken': sessionToken,
            "Accept": "application/json"
        }
    })
    return await request.json();

}

const giveDislike = async (sessionToken, like_id) =>{

    let request = await fetch(`${URI}/action/dislike/${like_id}`, {
        method: 'DELETE',
        headers: {
            'authToken': sessionToken
        }
    })
    return await request.json();
}

module.exports = { 
    getLikes, 
    giveLike, 
    giveDislike 
}