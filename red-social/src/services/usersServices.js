const fetchRegister = async (data) => {
    let formData = new FormData();
    formData.append('name', data.name);
    formData.append('username', data.username);
    formData.append('lastname', data.lastname);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('location', data.location);
    formData.append('date', data.date);
    /* if (data.avatar) {
        formData.append('avatar', {
            type: 'image/' + data.type,
            name: 'avatar.' + data.type,
            uri: data.avatar
        });
    } */
    let request = await fetch('http://localhost:8000/users/register', {
        method: 'POST',
        body: formData,
        headers: {
            "Accept": "application/json"
        }
    })
    return await request.json();
}

module.exports = { fetchRegister}