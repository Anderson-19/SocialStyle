const initialState = {
    sessionToken: '',
    name: '',
    email: '',
    avatar: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_SESSION_TOKEN': {
            return {
                ...state,
                sessionToken: action.sessionToken
            }
        }
        case 'SAVE_USER_NAME': {
            return {
                ...state,
                name: action.name
            }
        }
        case 'SAVE_USER_EMAIL': {
            return {
                ...state,
                email: action.email
            }
        }
        case 'SAVE_USER_AVATAR': {
            return {
                ...state,
                avatar: action.avatar
            }
        }
        default: {
            return state;
        }
    }
};