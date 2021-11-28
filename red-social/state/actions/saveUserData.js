export const saveUserName = (name) => ({
    type: 'SAVE_USER_NAME',
    name: name
});

export const saveUserEmail = (email) => ({
    type: 'SAVE_USER_EMAIL',
    email: email 
});

export const saveUserAvatar = (avatar) => ({
    type: 'SAVE_USER_AVATAR',
    avatar: avatar 
});