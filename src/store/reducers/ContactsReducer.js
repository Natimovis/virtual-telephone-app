import axios from 'axios';

const initialState = {
    contact_id: '',
    user_email: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    contacts: [],
    contact: {},
    clickedDelete: false
}

const GET_ONE = 'GET_ONE'
const ADD_EMAIL = 'ADD_EMAIL'
const HANDLE_CHANGE = 'HANDLE_CHANGE'
const HANDLE_SUBMIT = 'HANDLE_SUBMIT'
const HANDLE_EDIT = 'HANDLE_EDIT'
const GET_ALL = 'GET_ALL';
const RENDER_DELETE = 'RENDER_DELETE'
const HANDLE_DELETE = 'HANDLE_DELETE'
const CANCEL_DELETE = 'CANCEL_DELETE'

export const getAll = (user_email) => {
    return {
        type: GET_ALL,
        payload: axios.get(`/contacts/${user_email}`)
    }
}

export const renderDelete = () => {
    return {
        type: RENDER_DELETE
    }
}

export const cancelDelete = () => {
    return {
        type: CANCEL_DELETE
    }
}

export const handleDelete = (user_email, contact_id) => {
    return {
        type: HANDLE_DELETE,
        payload: axios.delete(`/contact/${user_email}/${contact_id}`)
    }
}

export const addEmail = (email) => {
    return {
        type: ADD_EMAIL,
        payload: email
    }
}

export const getOne = (contact_id) => {
    return {
        type: GET_ONE,
        payload: axios.get(`/contact/${contact_id}`, contact_id)
    }
}

export const handleChange = e => {
    return {
        type: HANDLE_CHANGE,
        payload: e
    }
}

export const handleSubmit = (userInfo) => {
    return {
        type: HANDLE_SUBMIT,
        payload: axios.post('/auth/contacts/new', userInfo)
    }
}

export const handleEdit = (contact_id, user_email, first_name, last_name, phone_number) => {
    return {
        type: HANDLE_EDIT,
        payload: axios.put(`/contact/${contact_id}/${user_email}`, first_name, last_name, phone_number)
    }
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    
    switch (type) {
        case HANDLE_CHANGE:
            return { ...state, ...payload 
            }
            case RENDER_DELETE:
                return {...state,
                    clickedDelete:true
                }
                case CANCEL_DELETE:
                    return {...state,
                        clickedDelete:false
            }
        case `${GET_ALL}_FULFILLED`:
            return {
                ...state, contacts: payload.data
            }
        case `${HANDLE_DELETE}_FULFILLED`:
            return {
                contacts: payload.data
            }
        case `${GET_ONE}_FULFILLED`:
            return {
                ...state,
                contact_id: payload.data.contact_id,
                user_email: payload.data.user_email,
                first_name: payload.data.first_name,
                last_name: payload.data.last_name,
                phone_number: payload.data.phone_number
            }
        case `${HANDLE_SUBMIT}_FULFILLED`:
            return {
                ...state,
                contacts: payload.data
            }
        case `${ADD_EMAIL}_FULFILLED`:
            return {
                ...state,
                user_email: payload
            }
        case `${HANDLE_EDIT}_FULFILLED`:
            return {
                ...state,
                first_name: payload.data.first_name,
                last_name: payload.data.last_name,
                phone_number: payload.data.phone_number,
                contact_id: payload.data.contact_id,
                user_email: payload.data.user_email,
            }
        default:
            return state;
    }
}