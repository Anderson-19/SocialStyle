//const URI = 'https://social-style.herokuapp.com';
const URI = 'http://localhost:8000';

const fetchRegister = async (data) => {
    let formData = new FormData();
    formData.append('name', data.name);
    formData.append('username', data.username);
    formData.append('lastname', data.lastname);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('location', data.location);
    formData.append('date', data.date);
    formData.append('avatar', data.avatar);
    
    let request = await fetch(`${URI}/users/register`, {
        method: 'POST',
        body: formData,
        headers: {
            "Accept": "application/json"
        }
    })
    return await request.json();
}

const fetchLogin = async (data) => {
    let formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);

    let request = await fetch(`${URI}/users/login`, {
        method: 'POST',
        body: formData,
        headers: {
            "Accept": "application/json"
        }
    })
    return await request.json();
}

const getUserProfile = async (sessionToken, user_id) =>{
    let request = await fetch(`${URI}/users/profile/${user_id}`, {
        method: 'GET',
        headers: {
            'authToken': sessionToken,
            "Accept": "application/json"
        }
    })
    return await request.json();
}


const userFollow = async (sessionToken, followingUser_id) =>{
    let formData = new FormData();
    formData.append('sessionToken', sessionToken);
    formData.append('following', followingUser_id);

    let request = await fetch(`${URI}/users/follow`, {
        method: 'POST',
        body: formData,
        headers: {
            "Accept": "application/json"
        }
    })
    return await request.json();
}

const getUsersFollowing = async (sessionToken) =>{
    let request = await fetch(`${URI}/users/followers/`, {
        method: 'GET',
        headers: {
            'authToken': sessionToken,
            "Accept": "application/json"
        }
    })
    return await request.json();

}

const userUnFollow = async (sessionToken) =>{
    let request = await fetch(`${URI}/users/unfollow`, {
        method: 'DELETE',
        headers: {
            'authToken': sessionToken
        }
    })
    return await request.json();
}


const updateUserProfile = async (data, sessionToken) => {

    let xdata = {
        token: sessionToken,
        name: data.name,
        username: data.username,
        lastname: data.lastname,
        location: data.location,
        date: data.date,
        avatar: data.avatar,
        bio: data.bio
    }
    
    let request = await fetch(`${URI}/users/editProfile`, {
        method: 'PUT',
        body: JSON.stringify(xdata),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return await request.json();
}

module.exports = { 
    fetchRegister, 
    fetchLogin, 
    getUserProfile, 
    getUsersFollowing, 
    userFollow, 
    userUnFollow ,
    updateUserProfile
}