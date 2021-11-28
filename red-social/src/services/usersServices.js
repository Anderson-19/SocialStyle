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
    
    let request = await fetch('http://localhost:8000/users/register', {
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

    let request = await fetch('http://localhost:8000/users/login', {
        method: 'POST',
        body: formData,
        headers: {
            "Accept": "application/json"
        }
    })
    return await request.json();
}

module.exports = { fetchRegister, fetchLogin }